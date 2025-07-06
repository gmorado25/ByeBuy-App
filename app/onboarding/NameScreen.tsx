import { saveData } from '@/services/storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useUser } from '../../contexts/UserContext';
import OnboardingScreenLayout from './OnboardingScreenLayout';

export default function NameScreen() {
  const router = useRouter();
  const { userData, setUserData } = useUser();
  const [name, setName] = useState(userData?.name || '');

  const handleNext = async () => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    const updatedData = { ...userData, name: trimmedName };
    setUserData(prev => ({ ...prev, name: trimmedName }));
    await saveData('userData', JSON.stringify(updatedData));
    console.log('[NameScreen] Saved userData:', updatedData);
    router.push('/onboarding/BirthdayScreen');
  };

  return (
    <OnboardingScreenLayout
      currentStep={1}
      totalSteps={5}
      onBack={() => router.back()}
    >
      <Text style={styles.label}>What’s your name?</Text>
      <TextInput
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        returnKeyType="done"
        autoCapitalize="words"
        autoCorrect={false}
        textContentType="name"
      />
      <TouchableOpacity
        onPress={handleNext}
        disabled={!name.trim()}
        style={[styles.button, !name.trim() && { backgroundColor: '#ddd' }]}
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