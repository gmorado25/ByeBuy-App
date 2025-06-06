import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';
import { compoundInterest } from '../utils/compoundInterest';
import InvestmentChart from '../components/InvestmentChart';

const InvestmentSimulatorScreen = () => {
  const [currentAge, setCurrentAge] = useState('');
  const [retirementAge, setRetirementAge] = useState('65');
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('0.07');
  const [chartData, setChartData] = useState<{ age: string, amount: number }[]>([]);

  const simulate = () => {
    const age = parseInt(currentAge);
    const endAge = parseInt(retirementAge);
    const principal = parseFloat(amount);
      const interestRate = parseFloat(rate);
      const data = [];

      for (let i = age; i <= endAge; i++) {
          const years = i - age;
          data.push({ age: i.toString(), amount: compoundInterest(principal, interestRate, years) });
      }

    setChartData(data);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>📈 Investment Simulator</Text>
      <Text>Current Age:</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={currentAge} onChangeText={setCurrentAge} />
      <Text>Retirement Age:</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={retirementAge} onChangeText={setRetirementAge} />
      <Text>Amount to Invest:</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={amount} onChangeText={setAmount} />
      <Text>Expected Annual Return (e.g. 0.07):</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={rate} onChangeText={setRate} />

      <Button title="Simulate" onPress={simulate} />

      {chartData.length > 0 && <InvestmentChart data={chartData} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 10 },
});

export default InvestmentSimulatorScreen;