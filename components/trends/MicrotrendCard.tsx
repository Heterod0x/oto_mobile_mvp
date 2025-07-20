import { Microtrend } from '@/types/trend';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  microtrend: Microtrend;
}

export default function MicrotrendCard({ microtrend }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{microtrend.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});
