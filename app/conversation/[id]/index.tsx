import ClipList from "@/components/clips/ClipList";
import ClipHeader from "@/components/clips/ClipHeader";
import SummarySection from "@/components/analysis/SummarySection";
import InsightSection from "@/components/analysis/InsightSection";
import BreakdownSection from "@/components/analysis/BreakdownSection";
import TranscriptSection from "@/components/analysis/TranscriptSection";
import useClips from "@/hooks/useClips";
import useAnalysis from "@/hooks/useAnalysis";
import useTranscript from "@/hooks/useTranscript";
import { Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Text, View, StyleSheet, ScrollView } from "react-native";

export default function ConversationDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const conversationId = Array.isArray(id) ? id[0] : id;
  const { data, loading, error } = useClips(conversationId);
  const { data: analysis } = useAnalysis(conversationId);
  const { data: transcript } = useTranscript(conversationId);

  const handleCommentaryToggle = (enabled: boolean) => {
    // TODO: Implement commentary clip filtering
    console.log('Commentary toggle:', enabled);
  };

  const handleMusicToggle = (enabled: boolean) => {
    // TODO: Implement music clip filtering
    console.log('Music toggle:', enabled);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Conversation", headerShown: false }} />
      
      {loading && (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}
      
      {error && (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      
      {data && (
        <>
          <ClipHeader
            onCommentaryToggle={handleCommentaryToggle}
            onMusicToggle={handleMusicToggle}
          />
          <ClipList clips={data} />
          <ScrollView style={styles.analysisScroll}>
            <SummarySection summary={analysis?.summary.summary} />
            <InsightSection
              suggestions={analysis?.insights.suggestions}
              scores={analysis?.insights}
            />
            <BreakdownSection
              metadata={analysis?.breakdown.metadata}
              sentiment={analysis?.breakdown.sentiment}
              keywords={analysis?.breakdown.keywords}
            />
            <TranscriptSection captions={transcript?.captions} />
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#dc3545',
    textAlign: 'center',
  },
  analysisScroll: {
    flex: 1,
    paddingTop: 8,
  },
});
