import { getData, saveData } from '@/services/storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text, TextInput, TouchableOpacity
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useUser } from '../../contexts/UserContext';
import OnboardingScreenLayout from './OnboardingScreenLayout';

export default function BirthdayScreen() {
  const router = useRouter();
  const { userData, setUserData } = useUser();
  const [birthYear, setBirthYear] = useState(userData?.birthYear || '');

  useEffect(() => {
    const year = parseInt(birthYear);
    const currentYear = new Date().getFullYear();
    const age = currentYear - year;

    if (!isNaN(year) && year > 1900 && year < currentYear) {
      setUserData((prev) => ({ ...prev, birthYear, age }));
    }
  }, [birthYear]);
  
  const handleNext = async () => {
    const year = parseInt(birthYear);
    const currentYear = new Date().getFullYear();
    if (!birthYear || isNaN(year) || year < 1900 || year > currentYear) {
      Toast.show({ type: 'error', text1: 'Enter a valid birth year.' });
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

    const age = currentYear - year;

    const updatedData = {
      ...baseData,
      birthYear: year.toString(),
      age,
    };

    setUserData(updatedData);
    await saveData('userData', JSON.stringify(updatedData));
    console.log('[🟡 BirthdayScreen] Saved userData:', updatedData);
    router.push('/onboarding/RetirementAgeScreen');
  };


  return (
    <OnboardingScreenLayout
      currentStep={2}
      totalSteps={5}
      onBack={() => router.back()}
    >
      <Text style={styles.label}>What year were you born?</Text>
      <TextInput
        placeholder="e.g., 2000"
        keyboardType="numeric"
        value={birthYear}
        onChangeText={setBirthYear}
        style={styles.input}
      />
      <TouchableOpacity
        onPress={handleNext}
        disabled={!birthYear}
        style={[styles.button, !birthYear && { backgroundColor: '#ddd' }]}
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