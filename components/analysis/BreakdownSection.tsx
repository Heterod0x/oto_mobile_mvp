import { StyleSheet, Text, View } from 'react-native';

interface Metadata {
  duration: string;
  language: string;
  situation: string;
  place: string;
  time: string;
  location: string;
  participants: string[];
}

interface Sentiment {
  positive: number;
  neutral: number;
  negative: number;
}

interface Keyword {
  keyword: string;
  importance_score: number;
}

interface Props {
  metadata?: Metadata | null;
  sentiment?: Sentiment | null;
  keywords?: Keyword[] | null;
}

const toPercent = (n: number) => `${Math.round(n * 100)}%`;

export default function BreakdownSection({ metadata, sentiment, keywords }: Props) {
  if (!metadata && !sentiment && !keywords) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>解析中...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Conversation Breakdown</Text>
      {metadata && (
        <View style={{ marginBottom: 8 }}>
          <Text style={styles.meta}>{`Duration: ${metadata.duration}`}</Text>
          <Text style={styles.meta}>{`Language: ${metadata.language}`}</Text>
          {metadata.place && (
            <Text style={styles.meta}>{`Place: ${metadata.place}`}</Text>
          )}
          {metadata.location && (
            <Text style={styles.meta}>{`Location: ${metadata.location}`}</Text>
          )}
          <Text style={styles.meta}>{`Participants: ${metadata.participants.length}`}</Text>
        </View>
      )}
      {sentiment && (
        <View style={{ marginBottom: 8 }}>
          <Text style={styles.meta}>{`Positive: ${toPercent(sentiment.positive)}`}</Text>
          <Text style={styles.meta}>{`Neutral: ${toPercent(sentiment.neutral)}`}</Text>
          <Text style={styles.meta}>{`Negative: ${toPercent(sentiment.negative)}`}</Text>
        </View>
      )}
      {keywords && keywords.length > 0 && (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {keywords.slice(0, 5).map((k) => (
            <Text key={k.keyword} style={styles.tag}>{k.keyword}</Text>
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
  meta: {
    fontSize: 14,
    color: '#333',
  },
  tag: {
    fontSize: 12,
    backgroundColor: '#eee',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 4,
    marginBottom: 4,
  },
  loading: {
    fontSize: 14,
    color: '#666',
  },
});
