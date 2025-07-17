import { ClipDTO } from '@/types/clip';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  clip: ClipDTO;
  onPress?: () => void;
}

export default function ClipCard({ clip, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.playButton}>
        <Ionicons name="play" size={24} color="#fff" />
      </View>
      <View style={{ flex: 1 }}>
        <Text numberOfLines={3} style={styles.description}>
          {clip.description || clip.title}
        </Text>
        {clip.captions && clip.captions[0] && (
          <Text numberOfLines={1} style={styles.snippet}>
            {clip.captions[0].caption}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 8,
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  description: {
    fontSize: 14,
    marginBottom: 4,
  },
  snippet: {
    fontSize: 12,
    color: '#666',
  },
});
