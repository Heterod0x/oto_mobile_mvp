import { View, Text, StyleSheet } from 'react-native';

interface Props {
  initials: string;
}

export default function Avatar({ initials }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
});
