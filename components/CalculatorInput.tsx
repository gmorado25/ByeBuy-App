import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

type Props = {
  label: string;
  value: string;
  onChange: (val: string) => void;
  keyboardType?: 'default' | 'numeric';
};

const CalculatorInput: React.FC<Props> = ({ label, value, onChange, keyboardType = 'numeric' }) => {
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        keyboardType={keyboardType}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
  },
});

export default CalculatorInput;