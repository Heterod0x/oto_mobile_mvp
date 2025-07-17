import { View, Text } from 'react-native';
import Recorder from '@/components/Recorder';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20 }}>
      <Text>Home Screen</Text>
      <Recorder />
    </View>
  );
}
