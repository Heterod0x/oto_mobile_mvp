import { View, Text, StyleSheet, Switch } from 'react-native';
import { useState } from 'react';

interface Props {
  onCommentaryToggle?: (enabled: boolean) => void;
  onMusicToggle?: (enabled: boolean) => void;
}

export default function ClipHeader({ onCommentaryToggle, onMusicToggle }: Props) {
  const [commentaryEnabled, setCommentaryEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(true);

  const handleCommentaryToggle = (value: boolean) => {
    setCommentaryEnabled(value);
    // TODO: Implement commentary clip filtering
    onCommentaryToggle?.(value);
  };

  const handleMusicToggle = (value: boolean) => {
    setMusicEnabled(value);
    // TODO: Implement music clip filtering
    onMusicToggle?.(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clips</Text>
      <View style={styles.toggleContainer}>
        <View style={styles.toggleItem}>
          <Text style={styles.toggleLabel}>Commentary</Text>
          <Switch
            value={commentaryEnabled}
            onValueChange={handleCommentaryToggle}
            trackColor={{ false: '#d1d5db', true: '#60a5fa' }}
            thumbColor={commentaryEnabled ? '#ffffff' : '#f3f4f6'}
            ios_backgroundColor="#d1d5db"
          />
        </View>
        <View style={styles.toggleItem}>
          <Text style={styles.toggleLabel}>Music</Text>
          <Switch
            value={musicEnabled}
            onValueChange={handleMusicToggle}
            trackColor={{ false: '#d1d5db', true: '#60a5fa' }}
            thumbColor={musicEnabled ? '#ffffff' : '#f3f4f6'}
            ios_backgroundColor="#d1d5db"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  toggleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  toggleLabel: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
});