import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ScrollView } from 'react-native';
import { calculateWorkHours } from '../utils/calculator';

const WorkCalculatorScreen = () => {
  const [salary, setSalary] = useState('');
  const [rateType, setRateType] = useState<'monthly' | 'hourly' | 'daily'>('hourly');
  const [products, setProducts] = useState([{ name: 'Product', price: '' }]);
  const [monthlyExpenses, setMonthlyExpenses] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const onCalculate = () => {
    const parsedProducts = products.map(p => ({ ...p, price: parseFloat(p.price || '0') }));
    const hours = calculateWorkHours({
      salary: parseFloat(salary),
      rateType,
      products: parsedProducts,
      monthlyExpenses: parseFloat(monthlyExpenses || '0'),
    });
    setResult(`${hours} hours of work needed`);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🧮 Work-to-Afford</Text>

      <Text>Salary ({rateType}):</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={salary} onChangeText={setSalary} />

      <Text>Monthly Expenses (Optional):</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={monthlyExpenses} onChangeText={setMonthlyExpenses} />

      {products.map((product, index) => (
        <View key={index}>
          <Text>Product Name:</Text>
          <TextInput style={styles.input} value={product.name} onChangeText={name => {
            const newProducts = [...products];
            newProducts[index].name = name;
            setProducts(newProducts);
          }} />

          <Text>Price:</Text>
          <TextInput style={styles.input} keyboardType="numeric" value={product.price} onChangeText={price => {
            const newProducts = [...products];
            newProducts[index].price = price;
            setProducts(newProducts);
          }} />
        </View>
      ))}

      <Button title="Add Another Product" onPress={() => setProducts([...products, { name: '', price: '' }])} />
      <Button title="Calculate" onPress={onCalculate} />

      {result && <Text style={styles.result}>{result}</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 10 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  result: { fontSize: 20, marginTop: 20, color: 'green' },
});

export default WorkCalculatorScreen;