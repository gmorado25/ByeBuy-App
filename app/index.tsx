import { Redirect } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';

export default function Index() {
  const { session } = useAuth();
  const { userData } = useUser();

  if (!session) return <Redirect href="/login" />;

  if (!userData?.hasCompletedOnboarding) {
    return <Redirect href="/onboarding/WelcomeScreen" />;
  }

  return <Redirect href="/home" />;
}