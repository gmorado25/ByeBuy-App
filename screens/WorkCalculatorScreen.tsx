import ProtectedRoute from '@/components/ProtectedRoute';
import { useUser } from '@/contexts/UserContext';
import React, { useEffect, useState } from 'react';
import { Button, ScrollView, Text, TextInput, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { styles } from './WorkCalculatorScreen.styles';

const WorkCalculatorScreen = () => {
  const [salaryInput, setSalaryInput] = useState('');
  const [salaryType, setSalaryType] = useState<'hourly' | 'annual'>('hourly');
  const [products, setProducts] = useState([{ name: '', price: '' }]);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const { userData, setUserData } = useUser();
  type TrackerKey = 'spent' | 'saved' | 'invested';

  useEffect(() => {
    if (!salaryInput && userData?.postTaxSalary) {
      setSalaryInput((userData.postTaxSalary / 2080).toFixed(2));
      setSalaryType('hourly');
    }
  }, []);

  const onCalculate = () => {
    const salary = parseFloat(salaryInput);
    if (isNaN(salary)) {
      setResultMessage('Please enter a valid salary.');
      return;
    }
    const hourlyRate = salaryType === 'hourly' ? salary : salary / 2080;
    const totalCost = products.reduce((sum, p) => sum + parseFloat(p.price || '0'), 0);
    const hoursNeeded = totalCost / hourlyRate;
    let comment = '';
    if (hoursNeeded > 40) comment = '⏳ That’s a full work week! Worth it?';
    else if (hoursNeeded > 20) comment = '🤔 That’s a big time commitment.';
    else if (hoursNeeded > 5) comment = '💸 Not bad. Think about it.';
    else comment = '🎉 That’s affordable in work time!';
    setResultMessage(`${hoursNeeded.toFixed(1)} hours of work needed. ${comment}`);
  };

  const updateTracker = (key: TrackerKey) => {
    const totalCost = products.reduce((sum, p) => sum + parseFloat(p.price || '0'), 0);
    const current = (userData[key] as number | undefined) || 0;
    setUserData({ ...userData, [key]: current + totalCost });
  };

  return (
    <ProtectedRoute>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>How many hours does this cost?</Text>
        <Text style={styles.label}>Salary Type</Text>
        <View style={styles.toggleContainer}>
          <Button title="Hourly" onPress={() => setSalaryType('hourly')} color={salaryType === 'hourly' ? '#3B82F6' : '#999'} />
          <Button title="Annual" onPress={() => setSalaryType('annual')} color={salaryType === 'annual' ? '#3B82F6' : '#999'} />
        </View>
        <Text style={styles.label}>
          {salaryType === 'hourly' ? 'Hourly Rate' : 'Annual Salary'}
        </Text>
        <TextInput
          placeholder="e.g., 25 or 60000"
          keyboardType="numeric"
          value={salaryInput}
          onChangeText={setSalaryInput}
          style={styles.input}
          placeholderTextColor="#aaa"
        />
        {products.map((product, index) => (
          <View key={index}>
            <Text style={styles.label}>Product Name</Text>
            <TextInput
              placeholder="e.g., iPhone"
              value={product.name}
              onChangeText={(name) => {
                const newProducts = [...products];
                newProducts[index].name = name;
                setProducts(newProducts);
              }}
              style={styles.input}
              placeholderTextColor="#aaa"
            />
            <Text style={styles.label}>Price</Text>
            <TextInput
              placeholder="e.g., 999"
              keyboardType="numeric"
              value={product.price}
              onChangeText={(price) => {
                const newProducts = [...products];
                newProducts[index].price = price;
                setProducts(newProducts);
              }}
              style={styles.input}
              placeholderTextColor="#aaa"
            />
          </View>
        ))}
        <Button title="Add Another Product" onPress={() => setProducts([...products, { name: '', price: '' }])} />
        <View style={{ height: 10 }} />
        <Button title="Calculate" onPress={onCalculate} />
        {resultMessage && (
          <Animated.View entering={FadeInUp.duration(500)} style={styles.resultBox}>
            <Text style={styles.resultText}>{resultMessage}</Text>
          </Animated.View>
        )}

        <Button title="Spend" onPress={() => updateTracker('spent')} />
        <Button title="Save" onPress={() => updateTracker('saved')} />
        <Button title="Invest" onPress={() => updateTracker('invested')} />

      </ScrollView>
    </ProtectedRoute>
  );
};

export default WorkCalculatorScreen;