import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useUser } from '../../contexts/UserContext';

export default function SalaryScreen() {
  const [salary, setSalary] = useState('');
  const { userData, setUserData } = useUser();
  const router = useRouter();

  const handleNext = () => {
    const gross = parseFloat(salary);
    if (isNaN(gross) || gross < 1000 || gross > 1000000) {
      Toast.show({ type: 'error', text1: 'Please enter a valid annual salary.' });
      return;
    }

    const postTax = gross * 0.75;
    setUserData({ ...userData, salary: gross, postTaxSalary: postTax });
    router.push('/onboarding/OnboardingCompleteScreen');
  };


  return (
    <View style={{ padding: 20 }}>
      <Text>What’s your annual salary?</Text>
      <TextInput
        placeholder="e.g., 60000"
        keyboardType="numeric"
        value={salary}
        onChangeText={setSalary}
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <Button title="Finish" onPress={handleNext} />
    </View>
  );
}