import { StyleSheet, Text, View } from 'react-native';

interface Props {
  suggestions?: string[];
  scores?: {
    boring_score: number;
    density_score: number;
    clarity_score: number;
    engagement_score: number;
    interesting_score: number;
  } | null;
}

const toPercent = (n: number) => `${Math.round(n * 100)}%`;

export default function InsightSection({ suggestions, scores }: Props) {
  if (!suggestions && !scores) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>解析中...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Performance Insight</Text>
      {suggestions && suggestions.length > 0 && (
        <View style={{ marginBottom: 8 }}>
          {suggestions.slice(0, 3).map((s, i) => (
            <Text key={i} style={styles.bullet}>{`\u2022 ${s}`}</Text>
          ))}
        </View>
      )}
      {scores && (
        <View>
          {Object.entries(scores)
            .filter(([k, v]) => typeof v === 'number' && !isNaN(v))
            .map(([k, v]) => (
              <Text key={k} style={styles.score}>{`${k}: ${toPercent(v)}`}</Text>
            ))}
        </View>
      )}
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
  bullet: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  score: {
    fontSize: 13,
    color: '#555',
  },
  loading: {
    fontSize: 14,
    color: '#666',
  },
});
