import { StyleSheet, Text, View } from 'react-native';

interface Highlight {
  summary: string;
  highlight: string;
  timecode_start_at: string;
  timecode_end_at: string;
  favorite: boolean;
}

interface Props {
  highlights?: Highlight[] | null;
}

export default function HighlightSection({ highlights }: Props) {
  if (!highlights) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Highlights未生成...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Highlights</Text>
      {highlights.map((item, idx) => (
        <View key={idx} style={[styles.row, item.favorite && styles.favoriteRow]}>
          <View style={styles.textContainer}>
            <View style={styles.summaryContainer}>
              <Text style={styles.summary}>{item.summary}</Text>
              {item.favorite && <Text style={styles.starIcon}>⭐</Text>}
            </View>
            <Text style={styles.time}>{item.timecode_start_at}</Text>
          </View>
        </View>
      ))}
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
  row: {
    marginBottom: 8,
  },
  time: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginTop: 4,
  },
  textContainer: {
    flex: 1,
  },
  summaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  summary: {
    fontSize: 13,
    color: '#333',
    flex: 1,
  },
  starIcon: {
    fontSize: 14,
    marginLeft: 8,
  },
  favoriteRow: {
    backgroundColor: '#fff8e1',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#ffb300',
  },
  loading: {
    fontSize: 14,
    color: '#666',
  },
});