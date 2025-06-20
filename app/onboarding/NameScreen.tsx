import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useUser } from '../../contexts/UserContext';

export default function NameScreen() {
  const [name, setName] = useState('');
  const { userData, setUserData } = useUser();
  const router = useRouter();

  const handleNext = () => {
    setUserData({ ...userData, name });
    router.push('/onboarding/BirthdayScreen');
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>What’s your name?</Text>
      <TextInput
        placeholder="Jane"
        value={name}
        onChangeText={setName}
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
}