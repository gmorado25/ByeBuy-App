import { Button, Input } from '@rneui/themed'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Toast from 'react-native-toast-message'
import { supabase } from '../services/supabase'

export default function AuthForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const signInEmail = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Email and password are required',
      });
      return;
    }

    setLoading(true)
    const trimmedEmail = email.trim()
    const { error } = await supabase.auth.signInWithPassword({ email: trimmedEmail, password })
    setLoading(false)

    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Login failed',
        text2: error.message,
      });
    } else {
      Toast.show({
        type: 'success',
        text1: 'Login successful',
      });
      router.replace('/home');
    }
  }

  const signUpEmail = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Email and password are required',
      });
      return;
    }

    setLoading(true)
    const trimmedEmail = email.trim()
    const { error } = await supabase.auth.signUp({ email: trimmedEmail, password })

    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Signup failed',
        text2: error.message,
      });
    } else {
      Toast.show({
        type: 'success',
        text1: 'Signup successful',
        text2: 'Check your inbox to confirm!',
      });
    }
  }

  return (
    <View style={styles.container}>
      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Input placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} />
      <Button title="Sign In" onPress={signInEmail} disabled={loading} />
      <Button title="Sign Up" onPress={signUpEmail} disabled={loading} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 16, marginTop: 48 },
})