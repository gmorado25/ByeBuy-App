import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#111827' },
  label: { fontSize: 16, marginBottom: 4, color: '#111827' },
  input: {
    backgroundColor: '#1E1E1E',
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  resultBox: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#D1FAE5',
    borderRadius: 12,
    borderColor: '#10B981',
    borderWidth: 1,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  resultText: {
    fontSize: 18,
    color: '#065F46',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 24,
  },
});