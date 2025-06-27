// import { useRouter } from 'expo-router';
// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity
// } from 'react-native';
// import { useUser } from '../../contexts/UserContext';
// import OnboardingScreenLayout from './OnboardingScreenLayout';

// export default function OnboardingCompleteScreen() {
//   const { userData } = useUser();
//   const router = useRouter();

//   return (
//     <OnboardingScreenLayout
//       currentStep={5}
//       totalSteps={5}
//       onBack={() => router.back()}
//     >
//       <Text style={styles.title}>🎉 Welcome, {userData.name || 'friend'}!</Text>
//       <Text style={styles.subtitle}>Your setup is complete.</Text>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => router.replace('/home')}
//       >
//         <Text style={styles.buttonText}>Go to App</Text>
//       </TouchableOpacity>
//     </OnboardingScreenLayout>
//   );
// }

// const styles = StyleSheet.create({
//   title: {
//     fontSize: 24,
//     fontWeight: '600',
//     marginBottom: 12,
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 16,
//     marginBottom: 24,
//     textAlign: 'center',
//   },
//   button: {
//     backgroundColor: '#4a90e2',
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//     alignSelf: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
// });

import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import { useUser } from '../../contexts/UserContext';
import OnboardingScreenLayout from './OnboardingScreenLayout';

export default function OnboardingCompleteScreen() {
  const { userData } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!userData?.hasCompletedOnboarding) {
      router.replace('/onboarding/SalaryScreen');
    }
  }, [userData]);

  return (
    <OnboardingScreenLayout
      currentStep={5}
      totalSteps={5}
      onBack={() => router.back()}
    >
      <Text style={styles.title}>🎉 Welcome, {userData.name || 'friend'}!</Text>
      <Text style={styles.subtitle}>Your setup is complete.</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('/home')}
      >
        <Text style={styles.buttonText}>Go to App</Text>
      </TouchableOpacity>
    </OnboardingScreenLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});