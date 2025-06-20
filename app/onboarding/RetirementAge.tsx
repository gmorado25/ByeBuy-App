import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useUser } from '../../contexts/UserContext';

export default function RetirementAgeScreen() {
  const [retireAge, setRetireAge] = useState('');
  const { userData, setUserData } = useUser();
  const router = useRouter();

  const handleNext = () => {
    const age = parseInt(retireAge);

    if (isNaN(age) || age < 40 || age > 100) {
      Toast.show({ type: 'error', text1: 'Please enter a valid retirement age (40–100).' });
      return;
    }

    setUserData({ ...userData, retirementAge: age });
    router.push('/onboarding/SalaryScreen');
  };


  return (
    <View style={{ padding: 20 }}>
      <Text>What age do you plan to retire?</Text>
      <TextInput
        placeholder="e.g., 65"
        keyboardType="numeric"
        value={retireAge}
        onChangeText={setRetireAge}
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
}