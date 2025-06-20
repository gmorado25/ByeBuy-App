import { Button, Input } from '@rneui/themed';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { supabase } from '../services/supabase';

export default function AuthForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signInEmail = async () => {
    setLoading(true);
    const trimmedEmail = email.trim();
    const { error } = await supabase.auth.signInWithPassword({ email: trimmedEmail, password });
    setLoading(false);
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Login failed',
        text2: error.message || 'Unable to sign in. Please check your credentials.',
      });
      return;
    } else {
      Toast.show({
        type: 'success',
        text1: 'Login successful',
      });
      setTimeout(() => {
        router.replace('/(tabs)');
      }, 500);
    }
  };
  const signUpEmail = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Email and password are required',
      });
      return;
    }
    setLoading(true);
    const trimmedEmail = email.trim();
    const { error } = await supabase.auth.signUp({ email: trimmedEmail, password });
    setLoading(false);
    error
      ? Toast.show({
        type: 'error',
        text1: 'Signup error',
        text2: error.message,
      })
      : Toast.show({
        type: 'success',
        text1: 'Signup successful',
        text2: 'Check your inbox to confirm!',
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login Account</Text>
      <Input
        placeholder="Email address"
        value={email}
        onChangeText={setEmail}
        inputStyle={styles.inputText}
        containerStyle={styles.input}
      />
      <Input
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        inputStyle={styles.inputText}
        containerStyle={styles.input}
      />
      <Button
        title="Sign In"
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
        onPress={signInEmail}
        disabled={loading}
      />
      <Button
        title="Sign Up"
        buttonStyle={[styles.button, { backgroundColor: '#50E3C2' }]}
        titleStyle={styles.buttonText}
        onPress={signUpEmail}
        disabled={loading}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9FF',
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    fontSize: 26,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 20,
    color: '#4A90E2',
  },
  input: {
    marginBottom: 16,
  },
  inputText: {
    fontSize: 16,
    color: '#263238',
  },
  button: {
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: '#4A90E2',
    marginTop: 10,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 16,
  },
});