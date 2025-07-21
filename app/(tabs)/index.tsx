import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import RecordingControls from '@/components/recording/RecordingControls';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSection}>
          <Text style={styles.headerTitle}>OTO</Text>
          <Text style={styles.headerSubtitle}>Record, Analyze & Share Conversations</Text>
        </View>
        
        <View style={styles.recordingSection}>
          <RecordingControls />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 32,
    paddingBottom: 50,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 48,
    marginTop: 40,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: '300',
    letterSpacing: -1,
    color: '#1a1a1a',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '400',
  },
  recordingSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
