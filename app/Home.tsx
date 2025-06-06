import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useRouter } from 'expo-router';

const HomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💸 ByeBuy - Money Insight Made Fun</Text>
      
      <Button
        title="Work-to-Afford Calculator"
        onPress={() => router.push('../WorkCalculatorTab')}
      />
      
      <Button
        title="Time-Value Investment Simulator"
        onPress={() => router.push('../InvestmentSimulatorTab')}
      />
      
      <Button
        title="View Savings Summary"
        onPress={() => router.push('/(tabs)')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, gap: 20 },
  title: { fontSize: 22, textAlign: 'center', marginBottom: 30 },
});

export default HomeScreen;