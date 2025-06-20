import { useUser } from '@/contexts/UserContext';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function SettingsScreen() {
  const { userData, setUserData } = useUser();
  const [name, setName] = useState(userData.name || '');
  const [salary, setSalary] = useState(userData.salary?.toString() || '');
  const router = useRouter();

  const saveChanges = () => {
    const parsedSalary = parseFloat(salary);

    if (!name.trim()) {
      Toast.show({ type: 'error', text1: 'Name is required.' });
      return;
    }

    if (isNaN(parsedSalary) || parsedSalary <= 0) {
      Toast.show({ type: 'error', text1: 'Enter a valid salary.' });
      return;
    }

    const updated = {
      ...userData,
      name: name.trim(),
      salary: parsedSalary,
      postTaxSalary: parsedSalary * 0.75,
    };

    setUserData(updated);
    Toast.show({ type: 'success', text1: 'Profile updated' });
  };


  const resetData = async () => {
    Alert.alert('Reset All Data?', 'This will erase your data and restart onboarding.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reset',
        style: 'destructive',
        onPress: async () => {
          await SecureStore.deleteItemAsync('userData');
          setUserData({});
          Toast.show({
            type: 'success',
            text1: 'App data has been reset!',
          });
          router.replace('/onboarding/WelcomeScreen');
        }
      },
    ]);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Profile Settings</Text>

      <Text>Name:</Text>
      <TextInput value={name} onChangeText={setName} style={{ borderBottomWidth: 1, marginBottom: 20 }} />

      <Text>Annual Salary:</Text>
      <TextInput
        value={salary}
        onChangeText={setSalary}
        keyboardType="numeric"
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />

      <Button title="Save Changes" onPress={saveChanges} />
      <View style={{ marginVertical: 20 }} />
      <Button color="red" title="❌ Reset App Data" onPress={resetData} />
    </View>
  );
}