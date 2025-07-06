import { getData, saveData } from '@/services/storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useAuth } from '../../contexts/AuthContext';
import { useUser } from '../../contexts/UserContext';
import { supabase } from '../../services/supabase';
import { syncUserProfile } from '../../services/syncUserData';
import OnboardingScreenLayout from './OnboardingScreenLayout';

export default function SalaryScreen() {
  const router = useRouter();
  const { userData, setUserData } = useUser();
  const { session } = useAuth();
  const [salary, setSalary] = useState(userData?.salary?.toString() || '');
  const [loading, setLoading] = useState(false);
  
  const handleNext = async () => {
    const gross = parseFloat(salary);
    if (isNaN(gross) || gross < 1000 || gross > 1000000) {
      Toast.show({ type: 'error', text1: 'Enter a valid annual salary.' });
      return;
    }

    const stored = await getData('userData');
    let baseData = userData;
    if (stored) {
      try {
        baseData = JSON.parse(stored);
        console.log('[📦 Loaded userData from storage before sync]', baseData);
      } catch (err) {
        console.error('[LOAD ERROR] Failed to parse userData:', err);
      }
    }

    const updatedData = {
      ...baseData,
      salary: gross,
      postTaxSalary: gross,
      hasCompletedOnboarding: true,
    };

    setUserData(updatedData);
    await saveData('userData', JSON.stringify(updatedData));
    setLoading(true);

    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (!session || error) {
        console.warn('No session found');
        Toast.show({ type: 'error', text1: 'Session missing. Try logging in again.' });
        return;
      }

      console.log('[🧠 FINAL CHECK] Syncing this payload:', updatedData);

      const result = await syncUserProfile(updatedData, session);
      if (result) {
        Toast.show({ type: 'success', text1: 'Onboarding complete!' });
        router.push('/onboarding/OnboardingCompleteScreen');
      } else {
        throw new Error('Sync failed');
      }
    } catch (err) {
      console.error('[SYNC ERROR] Failed to sync profile:', err);
      Toast.show({ type: 'error', text1: 'Failed to save profile data.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <OnboardingScreenLayout
        currentStep={4}
        totalSteps={5}
        onBack={() => router.back()}
      >
        <Text style={styles.label}>What’s your post-tax annual salary?</Text>
        <TextInput
          placeholder="e.g., 48000"
          keyboardType="numeric"
          value={salary}
          onChangeText={setSalary}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={handleNext}
          disabled={!salary || loading}
          style={[styles.button, (!salary || loading) && { backgroundColor: '#ddd' }]}
        >
          <Text style={styles.buttonText}>Finish</Text>
        </TouchableOpacity>
      </OnboardingScreenLayout>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#4a90e2" />
          <Text style={styles.loadingText}>Saving your profile...</Text>
        </View>
      )}
    </>
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
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#333',
  },
});