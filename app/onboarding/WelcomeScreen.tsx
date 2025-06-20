import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>👋 Welcome to ByeBuy!</Text>
      <Text style={{ marginVertical: 10 }}>Let’s personalize your experience.</Text>
      <Button title="Get Started" onPress={() => router.push('/onboarding/NameScreen')} />
    </View>
  );
}