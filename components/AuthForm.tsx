import { Button, Input } from '@rneui/themed'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { supabase } from '../services/supabase'

export default function AuthForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const signInEmail = async () => {
    setLoading(true)
    const trimmedEmail = email.trim()
    const { error } = await supabase.auth.signInWithPassword({ email: trimmedEmail, password })
    setLoading(false)
    error ? Alert.alert('Login error', error.message) : router.replace('/home')
  }

  const signUpEmail = async () => {
    setLoading(true)
    const trimmedEmail = email.trim()
    const { error } = await supabase.auth.signUp({ email: trimmedEmail, password })
    setLoading(false)
    error
      ? Alert.alert('Signup error', error.message)
      : Alert.alert('Check your inbox to confirm!')
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