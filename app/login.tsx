// import { useRouter } from 'expo-router';
// import React from 'react';
// import { Button, StyleSheet, View } from 'react-native';
// import { useAuth } from '../contexts/AuthContext';
// export default function LoginScreen() {
//   const { signInWithGoogle } = useAuth();
//   const router = useRouter();
//   return (
//     <View style={styles.container}>
//       <Button title="Sign in with Google" onPress={signInWithGoogle} />
//       <Button title="Sign in / Sign up with Email" onPress={() => router.push('/auth')} />
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 },
// });
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
export default function LoginScreen() {
  const { signInWithGoogle } = useAuth();
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to ByeBuy</Text>
      {/* <Image
        source={require('../assets/welcome-illustration.png')} // Add a fun SVG or PNG here
        style={styles.image}
        resizeMode="contain"
      /> */}
      <TouchableOpacity style={styles.button} onPress={signInWithGoogle}>
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/auth')}>
        <Text style={styles.buttonText}>Sign in / Sign up with Email</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9FF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#4A90E2',
    marginBottom: 20,
  },
  image: {
    width: 250,
    height: 180,
    marginBottom: 30,
  },
  button: {
    width: '100%',
    backgroundColor: '#4A90E2',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});