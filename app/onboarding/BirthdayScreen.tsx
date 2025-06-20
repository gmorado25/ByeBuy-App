import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useUser } from '../../contexts/UserContext';

export default function BirthdayScreen() {
  const [birthYear, setBirthYear] = useState('');
  const { userData, setUserData } = useUser();
  const router = useRouter();

  const handleNext = () => {
    const year = parseInt(birthYear);
    const currentYear = new Date().getFullYear();
    const calculatedAge = currentYear - year;

    if (isNaN(year) || year < 1920 || year > currentYear - 10) {
      Toast.show({ type: 'error', text1: 'Enter a valid birth year.' });
      return;
    }

    setUserData({ ...userData, birthYear: year.toString(), age: calculatedAge });
    router.push('/onboarding/RetirementAgeScreen');
  };


  return (
    <View style={{ padding: 20 }}>
      <Text>What year were you born?</Text>
      <TextInput
        placeholder="e.g., 2000"
        keyboardType="numeric"
        value={birthYear}
        onChangeText={setBirthYear}
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
}