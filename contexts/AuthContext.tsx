import { Session } from '@supabase/supabase-js';
import { useRouter } from 'expo-router';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { supabase } from '../services/supabase';

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
  const router = useRouter();
  
  useEffect(() => {
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      handleSessionRedirect(session);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      handleSessionRedirect(session);
    });

    getInitialSession();

    return () => subscription.unsubscribe();
  }, []);

  const handleSessionRedirect = async (session: Session | null) => {
    if (!session || !session.user) {
      router.replace('/login');
      return;
    }

    const userId = session.user.id;

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error && error.code === 'PGRST116') {
      // User doesn't have a profile yet
      router.replace('/onboarding/WelcomeScreen');
      return;
    }

    if (!profile || !profile.name) {
      router.replace('/onboarding/WelcomeScreen');
      return;
    }

    router.replace('/home');
  };

  const signInWithGoogle = async () => {
    const redirectTo = 'byebuyapp://'; // Must match your app.json scheme

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
      },
    });

    if (error) {
      console.error('OAuth error:', error.message);
    } else {
      console.log('Redirecting to:', data?.url);
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