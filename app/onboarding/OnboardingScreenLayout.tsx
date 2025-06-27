// import { ReactNode } from 'react';
// import {
//     KeyboardAvoidingView,
//     Platform,
//     ScrollView,
//     StyleSheet,
//     View,
// } from 'react-native';

// export default function OnboardingScreenLayout({ children }: { children: ReactNode }) {
//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//       style={styles.wrapper}
//     >
//       <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
//         <View style={styles.card}>
//           {children}
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   wrapper: { flex: 1, backgroundColor: '#fff' },
//   container: { flexGrow: 1, justifyContent: 'center', padding: 24 },
//   card: {
//     backgroundColor: '#f2f2f2',
//     borderRadius: 16,
//     padding: 24,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 4 },
//   },
// });

import { useRouter } from 'expo-router';
import React from 'react';
import {
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { onboardingStyles } from './styles/onboardingStyles';

type OnboardingScreenLayoutProps = {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  showBackButton?: boolean;
  animate?: boolean;
  onBack?: () => void; // ← add this
};

export default function OnboardingScreenLayout({
  children,
  currentStep,
  totalSteps,
  showBackButton = true,
  animate = false,
  onBack, // ← added
}: OnboardingScreenLayoutProps) {
  const router = useRouter();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (animate) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [fadeAnim, animate]);

  return (
    <KeyboardAvoidingView
      style={onboardingStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={onboardingStyles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={onboardingStyles.inner}>
          {showBackButton && (
            <TouchableOpacity
              onPress={onBack ?? (() => router.back())}
              style={onboardingStyles.backButton}
            >
              <Text style={onboardingStyles.backButtonText}>← Back</Text>
            </TouchableOpacity>
          )}

          {/* Progress bar */}
          <View style={onboardingStyles.progressContainer}>
            <View
              style={[
                onboardingStyles.progressBar,
                { width: `${(currentStep / totalSteps) * 100}%` },
              ]}
            />
          </View>

          {/* Animated or regular content */}
          {animate ? (
            <Animated.View style={{ opacity: fadeAnim }}>{children}</Animated.View>
          ) : (
            children
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}