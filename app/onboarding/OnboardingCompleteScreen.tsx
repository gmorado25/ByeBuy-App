import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';
import { useUser } from '../../contexts/UserContext';

export default function OnboardingCompleteScreen() {
  const { userData } = useUser();
  const router = useRouter();

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>🎉 Welcome, {userData.name}!</Text>
      <Text>Your setup is complete.</Text>
      <Button title="Go to App" onPress={() => router.replace('/(tabs)/HomeScreen')} />
    </View>
  );
}