// import ProtectedRoute from '@/components/ProtectedRoute';
// import { useUserStore } from '@/hooks/useUserStore';
// import { compoundInterest } from '@/utils/compoundInterest';
// import { ScrollView, StyleSheet, Text } from 'react-native';
// export default function SummaryTab() {
//   const { savedAmount } = useUserStore();
//   const valueAtRetirement = compoundInterest(savedAmount, 0.07, 40);
//   return (
//     <ProtectedRoute>
//       <ScrollView contentContainerStyle={styles.container}>
//         <Text style={styles.header}>📊 Your Savings Summary</Text>
//         <Text style={styles.info}>💰 You’ve saved: ${savedAmount.toFixed(2)}</Text>
//         <Text style={styles.info}>📈 If invested: ${valueAtRetirement.toFixed(2)} by retirement</Text>
//       </ScrollView>
//     </ProtectedRoute>
//   );
// }
// const styles = StyleSheet.create({
//   container: { flexGrow: 1, justifyContent: 'center', padding: 24 },
//   header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
//   info: { fontSize: 18, marginVertical: 8 },
// });
import { useUserStore } from '@/hooks/useUserStore';
import { compoundInterest } from '@/utils/compoundInterest';
import { useEffect } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
export default function SummaryTab() {
  const { signOut, session } = useAuth();
  const { savedAmount } = useUserStore();
  const valueAtRetirement = compoundInterest(savedAmount, 0.07, 40);
  useEffect(() => {
    if (session) {
      console.log('✅ Authenticated user:', session.user.email);
    } else {
      console.log('⚠️ No session found. User is not authenticated.');
    }
  }, [session]);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>📊 Your Savings Summary</Text>
      <Text style={styles.info}>💰 You’ve saved: ${savedAmount.toFixed(2)}</Text>
      <Text style={styles.info}>📈 If invested: ${valueAtRetirement.toFixed(2)} by retirement</Text>
      <View style={{ marginTop: 32 }}>
        <Button title="Logout" onPress={signOut} />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  info: { fontSize: 18, marginVertical: 8 },
});