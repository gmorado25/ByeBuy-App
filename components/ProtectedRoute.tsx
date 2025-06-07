import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (session === null) {
      router.replace('/login');
    }
  }, [session]);
  if (session === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return <>{children}</>;
}