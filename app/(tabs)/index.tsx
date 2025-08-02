import { SafeAreaView, ScrollView } from 'react-native';
import RecordingControls from '@/components/recording/RecordingControls';
import { Box } from '@/components/ui/box';
import { Text, Heading } from '@/components/ui/text';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Box className="flex-1 px-5 py-8 pt-24 pb-12 bg-gradient-to-b from-background-0 to-background-50">
          {/* Header Section */}
          <Box className="items-center mb-12 mt-10">
            <Heading size="6xl" weight="light" className="text-primary-900 mb-2 tracking-tight">
              oto
            </Heading>
            <Text size="lg" className="text-typography-600 text-center">
              Record, Analyze & Share Conversations
            </Text>
          </Box>
          
          {/* Recording Section */}
          <Box className="flex-1 justify-center items-center">
            <RecordingControls />
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
