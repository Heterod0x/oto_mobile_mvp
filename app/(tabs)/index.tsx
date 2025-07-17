import { View } from 'react-native';
import RecordingControls from '@/components/RecordingControls';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <RecordingControls />
    </View>
  );
}
