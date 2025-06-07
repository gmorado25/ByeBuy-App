import { useUserStore } from '@/hooks/useUserStore';
import { compoundInterest } from '@/utils/compoundInterest';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default function SummaryTab() {
  const { savedAmount } = useUserStore();

  const valueAtRetirement = compoundInterest(savedAmount, 0.07, 40);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>📊 Your Savings Summary</Text>
      <Text style={styles.info}>💰 You’ve saved: ${savedAmount.toFixed(2)}</Text>
      <Text style={styles.info}>📈 If invested: ${valueAtRetirement.toFixed(2)} by retirement</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  info: { fontSize: 18, marginVertical: 8 },
});