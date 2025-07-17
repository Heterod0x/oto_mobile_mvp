import { StyleSheet, Text, View } from 'react-native';

interface Props {
  summary?: string | null;
}

export default function SummarySection({ summary }: Props) {
  if (!summary) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Summary生成中...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Summary</Text>
      <Text style={styles.text}>{summary}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  loading: {
    fontSize: 14,
    color: '#666',
  },
});
