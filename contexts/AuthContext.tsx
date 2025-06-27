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

  // useEffect(() => {
  //   const getInitialSession = async () => {
  //     const {
  //       data: { session },
  //     } = await supabase.auth.getSession();

  //     setSession(session);

  //     // if (session) {
  //     //   router.replace('/home'); // ← change if your main app screen differs
  //     // }
  //     if (session) {
  //       const { data: userProfile } = await supabase
  //         .from('profiles')
  //         .select('*')
  //         .eq('id', session.user.id)
  //         .single();

  //       if (!userProfile || !userProfile.name) {
  //         router.replace('/onboarding/welcome');
  //       } else {
  //         router.replace('/(tabs)');
  //       }
  //     } else {
  //       router.replace('/login');
  //     }
  //   };

  //   getInitialSession();

  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);

  //     if (session) {
  //       router.replace('/home');
  //     } else {
  //       router.replace('/login');
  //     }
  //   });

  //   return () => subscription.unsubscribe();
  // }, []);
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
    if (!session) {
      router.replace('/login');
      return;
    }

    const userId = session.user.id;

    let { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (!profile) {
      const { error: insertError } = await supabase
        .from('profiles')
        .insert({ id: session.user.id });

      if (insertError) {
        console.error('Failed to create profile:', insertError.message);
      }

      router.replace('/onboarding/WelcomeScreen');
    } else if (!profile.name) {
      router.replace('/onboarding/WelcomeScreen'); // or any other onboarding screen
    } else {
      router.replace('/ome'); // or /home
    }
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

// import { Session } from '@supabase/supabase-js';
// import { useRouter } from 'expo-router';
// import React, {
//   createContext,
//   ReactNode,
//   useContext,
//   useEffect,
//   useState,
// } from 'react';
// import LoadingScreen from '../components/LoadingScreen';
// import { supabase } from '../services/supabase';

// type AuthContextType = {
//   session: Session | null;
//   signInWithGoogle: () => Promise<void>;
//   signOut: () => Promise<void>;
// };

// const AuthContext = createContext<AuthContextType>({
//   session: null,
//   signInWithGoogle: async () => { },
//   signOut: async () => { },
// });

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [session, setSession] = useState<Session | null>(null);
//   const router = useRouter();
//   const [checkingProfile, setCheckingProfile] = useState(true);

//   const checkProfileAndRedirect = async (session: Session | null) => {
//     if (!session) {
//       router.replace('/login');
//       return;
//     }

//     const userId = session.user.id;
//     const { data, error } = await supabase
//       .from('profiles')
//       .select('id')
//       .eq('id', userId)
//       .single();

//     if (!data || error) {
//       // 👇 force user into onboarding flow
//       router.replace('/onboarding/welcome');
//     } else {
//       router.replace('/home');
//     }

//     setCheckingProfile(false);
//   };

//   useEffect(() => {
//     const getInitialSession = async () => {
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();
//       setSession(session);
//       checkProfileAndRedirect(session);
//     };

//     getInitialSession();

//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//       checkProfileAndRedirect(session);
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   const signInWithGoogle = async () => {
//     const redirectTo = 'byebuyapp://'; // Must match your app.json scheme

//     const { data, error } = await supabase.auth.signInWithOAuth({
//       provider: 'google',
//       options: {
//         redirectTo,
//       },
//     });

//     if (error) {
//       console.error('OAuth error:', error.message);
//     } else {
//       console.log('Redirecting to:', data?.url);
//     }
//   };

//   const signOut = async () => {
//     await supabase.auth.signOut();
//   };

//   return (
//     // <AuthContext.Provider value={{ session, signInWithGoogle, signOut }}>
//     //   {!checkingProfile && children}
//     // </AuthContext.Provider>
//     <AuthContext.Provider value={{ session, signInWithGoogle, signOut }}>
//       {!checkingProfile ? children : <LoadingScreen />} {/* Replace with your loader */}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

/*import { Session } from '@supabase/supabase-js';
import { useRouter } from 'expo-router';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import LoadingScreen from '../components/LoadingScreen';
import { supabase } from '../services/supabase';

type AuthContextType = {
  session: Session | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  signInWithGoogle: async () => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [checkingProfile, setCheckingProfile] = useState(true);
  const router = useRouter();

  const checkProfileAndRedirect = async (session: Session | null) => {
    if (!session?.user?.id) {
      router.replace('/login');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', session.user.id)
        .maybeSingle();

      if (error || !data) {
        // User logged in but hasn't created profile yet
        router.replace('/onboarding/welcome');
      } else {
        // Profile exists
        router.replace('/home');
      }
    } catch (err) {
      console.error('Error checking profile:', err);
      router.replace('/login');
    } finally {
      setCheckingProfile(false);
    }
  };

  useEffect(() => {
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      if (session?.user?.id) {
        await checkProfileAndRedirect(session);
      } else {
        router.replace('/login');
        setCheckingProfile(false);
      }
    };

    getInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user?.id) {
        checkProfileAndRedirect(session);
      } else {
        router.replace('/login');
        setCheckingProfile(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const redirectTo = 'byebuyapp://';
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo },
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
      {!checkingProfile ? children : <LoadingScreen />}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);*/

// import { Session } from '@supabase/supabase-js';
// import { useRouter } from 'expo-router';
// import React, {
//   createContext,
//   ReactNode,
//   useContext,
//   useEffect,
//   useState,
// } from 'react';
// import LoadingScreen from '../components/LoadingScreen';
// import { supabase } from '../services/supabase';

// type AuthContextType = {
//   session: Session | null;
//   signInWithGoogle: () => Promise<void>;
//   signOut: () => Promise<void>;
// };

// const AuthContext = createContext<AuthContextType>({
//   session: null,
//   signInWithGoogle: async () => {},
//   signOut: async () => {},
// });

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [session, setSession] = useState<Session | null>(null);
//   const [checkingProfile, setCheckingProfile] = useState(true);
//   const router = useRouter();

//   const checkProfileAndRedirect = async (session: Session | null) => {
//     if (!session?.user?.id) {
//       console.log('❌ No user session found — redirecting to login');
//       router.replace('/login');
//       return;
//     }

//     try {
//       const { data, error } = await supabase
//         .from('profiles')
//         .select('id')
//         .eq('id', session.user.id)
//         .maybeSingle();

//       console.log('✅ Profile check result:', { data, error });

//       if (error || !data) {
//         console.log('🟡 No profile — redirecting to onboarding');
//         router.replace('/onboarding/welcome');
//       } else {
//         console.log('🟢 Profile exists — redirecting to home');
//         router.replace('/home');
//       }
//     } catch (err) {
//       console.error('🚨 Error checking profile:', err);
//       router.replace('/login');
//     } finally {
//       setCheckingProfile(false);
//     }
//   };

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       console.warn('⏳ Fallback timeout triggered — unblocking UI');
//       setCheckingProfile(false);
//     }, 7000);

//     const getInitialSession = async () => {
//       console.log('🔄 Fetching initial Supabase session...');
//       const result = await supabase.auth.getSession();

//       console.log('📦 Full session result:', result);
//       const activeSession = result.data.session;
//       setSession(activeSession);

//       if (activeSession?.user?.id) {
//         await checkProfileAndRedirect(activeSession);
//       } else {
//         console.log('❌ No session on load — redirecting to login');
//         router.replace('/login');
//         setCheckingProfile(false);
//       }
//     };

//     getInitialSession();

//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((_event, session) => {
//       console.log('📡 Auth state changed:', _event, session);
//       setSession(session);

//       if (session?.user?.id) {
//         checkProfileAndRedirect(session);
//       } else {
//         router.replace('/login');
//         setCheckingProfile(false);
//       }
//     });

//     return () => {
//       subscription.unsubscribe();
//       clearTimeout(timeout);
//     };
//   }, []);

//   const signInWithGoogle = async () => {
//     const redirectTo = 'byebuyapp://';
//     console.log('🔐 Google Sign In button clicked');
//     const { data, error } = await supabase.auth.signInWithOAuth({
//       provider: 'google',
//       options: { redirectTo },
//     });

//     if (error) {
//       console.error('⚠️ OAuth error:', error.message);
//     } else {
//       console.log('🔗 Redirecting to Google OAuth:', data?.url);
//     }
//   };

//   const signOut = async () => {
//     console.log('🚪 Signing out...');
//     await supabase.auth.signOut();
//   };

//   return (
//     <AuthContext.Provider value={{ session, signInWithGoogle, signOut }}>
//       {!checkingProfile ? children : <LoadingScreen />}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);