import { useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function LoginScreen() {
  const { signInWithGoogle } = useAuth();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Button title="Sign in with Google" onPress={signInWithGoogle} />
      <Button title="Sign in / Sign up with Email" onPress={() => router.push('/auth')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 },
});

// import { useRouter } from 'expo-router'
// import React from 'react'
// import { Button, View } from 'react-native'
// import { useAuth } from '../contexts/AuthContext'

// export default function Login() {
//   const { promptAsync } = useAuth()
//   const router = useRouter()

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', gap: 20, padding: 16 }}>
//       <Button title="Sign in with Google" onPress={() => promptAsync()} />
//       <Button title="Sign in with Email or Phone" onPress={() => router.push('/auth')} />
//     </View>
//   )
// }
