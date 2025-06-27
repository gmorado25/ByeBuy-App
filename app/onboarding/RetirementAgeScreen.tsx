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

  // const handleNext = async () => {
  //   if (!retireAge) return;

  //   const updatedData = { ...userData, retireAge };
  //   setUserData(updatedData);

  //   try {
  //     const {
  //       data: { session },
  //       error,
  //     } = await supabase.auth.getSession();

  //     if (!session) throw new Error('No session found');

  //     await syncUserProfile(updatedData, session);

  //     Toast.show({ type: 'success', text1: 'Retirement age saved!' });
  //     router.push('/onboarding/SalaryScreen');
  //   } catch (err) {
  //     Toast.show({ type: 'error', text1: 'Failed to save retirement age.' });
  //     console.error('[RetirementAgeScreen] sync error:', err);
  //   }
  // };
  const handleNext = () => {
    const age = parseInt(retireAge);
    if (!retireAge || isNaN(age) || age < 30 || age > 100) {
      Toast.show({ type: 'error', text1: 'Enter a valid retirement age.' });
      return;
    }

    setUserData(prev => ({
      ...prev,
      retirementAge: age,
    }));
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