import { Session } from '@supabase/supabase-js';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../services/supabase';

WebBrowser.maybeCompleteAuthSession();

type AuthContextType = {
    session: Session | null;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
    session: null,
    signInWithGoogle: async () => { },
    signOut: async () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null);

    const discovery = {
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
        tokenEndpoint: 'https://oauth2.googleapis.com/token',
    };

    const redirectUri = makeRedirectUri({
        native: 'com.yourapp:/callback',
    });

    const nonce = uuidv4();

    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: Constants.expoConfig?.extra?.googleClientId!,
            redirectUri,
            scopes: ['openid', 'profile', 'email'],
            responseType: 'id_token',
            extraParams: {
                nonce,
            },
        },
        discovery
    );

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);


    const signInWithGoogle = async () => {
        const result = await promptAsync();
        console.log("Google Auth Result:", result);

        if (result.type === 'success') {
            const { code } = result.params;
            console.log("Authorization Code:", code);
            await supabase.auth.exchangeCodeForSession(code);
        } else {
            console.error("Google auth failed:", result);
        }
    };


    const signOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider value={{ session, signInWithGoogle, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);