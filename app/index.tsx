import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../services/supabase';

export default function Index() {
  const { session } = useAuth();
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  useEffect(() => {
    const checkProfile = async () => {
      if (!session || !session.user?.id) {
        setRedirectTo('/login');
        return;
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('completed_onboarding')
        .eq('id', session.user.id)
        .single();

      if (error || !profile?.completed_onboarding) {
        setRedirectTo('/onboarding/WelcomeScreen');
      } else {
        setRedirectTo('/home');
      }
    };

    checkProfile();
  }, [session]);

  if (!redirectTo) return null;
  return <Redirect href={redirectTo} />;
}