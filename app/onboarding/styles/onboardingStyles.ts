import { StyleSheet } from 'react-native';

export const onboardingStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  scrollContainer: { flexGrow: 1, justifyContent: 'center' },
  inner: { padding: 24 },
  backButton: { marginBottom: 16 },
  backButtonText: { color: '#333', fontSize: 16 },
  progressContainer: {
    height: 8,
    backgroundColor: '#ddd',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 24,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#4a90e2',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4a90e2',
    padding: 14,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 12,
  },
  buttonText: { color: '#fff', fontWeight: '600' },
  errorText: { color: '#e53935', marginBottom: 8 },
});