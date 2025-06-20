import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

export async function saveData(key: string, value: string) {
  if (isWeb) {
    await AsyncStorage.setItem(key, value);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
}

export async function getData(key: string) {
  return isWeb ? await AsyncStorage.getItem(key) : await SecureStore.getItemAsync(key);
}

export async function removeData(key: string) {
  return isWeb ? await AsyncStorage.removeItem(key) : await SecureStore.deleteItemAsync(key);
}