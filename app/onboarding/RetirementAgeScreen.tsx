import { getData, saveData } from '@/services/storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  StyleSheet,
  Text, TextInput, TouchableOpacity
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useUser } from '../../contexts/UserContext';
import OnboardingScreenLayout from './OnboardingScreenLayout';

export default function RetirementAgeScreen() {
  const router = useRouter();
  const { userData, setUserData } = useUser();
  const [retireAge, setRetireAge] = useState(userData?.retirementAge?.toString() || '');

  const handleNext = async () => {
    const age = parseInt(retireAge);
    if (!retireAge || isNaN(age) || age < 30 || age > 100) {
      Toast.show({ type: 'error', text1: 'Enter a valid retirement age.' });
      return;
    }

    const stored = await getData('userData');
    let baseData = userData;
    if (stored) {
      try {
        baseData = JSON.parse(stored);
      } catch (err) {
        console.error('Failed to parse stored userData:', err);
      }
    }

    const updatedData = {
      ...baseData,
      retirementAge: age,
    };

    setUserData(updatedData);
    await saveData('userData', JSON.stringify(updatedData));
    console.log('[RetirementScreen] Saved userData:', updatedData);
    router.push('/onboarding/SalaryScreen');
  };

  return (
    <OnboardingScreenLayout
      currentStep={3}
      totalSteps={5}
      onBack={() => router.back()}
    >
      <Text style={styles.label}>What age do you plan to retire?</Text>
      <TextInput
        placeholder="e.g., 65"
        keyboardType="numeric"
        value={retireAge}
        onChangeText={setRetireAge}
        style={styles.input}
      />
      <TouchableOpacity
        onPress={handleNext}
        disabled={!retireAge}
        style={[styles.button, !retireAge && { backgroundColor: '#ddd' }]}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </OnboardingScreenLayout>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 20, fontWeight: '600', marginBottom: 12 },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    paddingVertical: 8,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});