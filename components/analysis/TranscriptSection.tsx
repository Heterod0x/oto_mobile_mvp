import { StyleSheet, Text, View } from 'react-native';

interface Caption {
  timecode: string;
  speaker: string;
  caption: string;
}

interface Props {
  captions?: Caption[] | null;
}

export default function TranscriptSection({ captions }: Props) {
  if (!captions) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Transcript未生成...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transcript</Text>
      {captions.map((item, idx) => (
        <View key={idx} style={styles.row}>
          <Text style={styles.time}>{item.timecode}</Text>
          <View style={styles.textContainer}>
            <Text style={styles.speaker}>{item.speaker}</Text>
            <Text style={styles.caption}>{item.caption}</Text>
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
    flexDirection: 'row',
    marginBottom: 8,
  },
  time: {
    width: 72,
    fontSize: 12,
    color: '#666',
  },
  textContainer: {
    flex: 1,
  },
  speaker: {
    fontSize: 13,
    fontWeight: '600',
  },
  caption: {
    fontSize: 13,
    color: '#333',
  },
  loading: {
    fontSize: 14,
    color: '#666',
  },
});
