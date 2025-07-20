import BreakdownSection from "@/components/analysis/BreakdownSection";
import HighlightSection from "@/components/analysis/HighlightSection";
import InsightSection from "@/components/analysis/InsightSection";
import SummarySection from "@/components/analysis/SummarySection";
import ClipHeader from "@/components/clips/ClipHeader";
import ClipList from "@/components/clips/ClipList";
import useAnalysis from "@/hooks/useAnalysis";
import useClips from "@/hooks/useClips";
import useConversation from "@/hooks/useConversation";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ConversationDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const conversationId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { data, loading, error } = useClips(conversationId);
  const { data: analysis } = useAnalysis(conversationId);
  const { data: conversation } = useConversation(conversationId);

  const handleCommentaryToggle = (enabled: boolean) => {
    // TODO: Implement commentary clip filtering
    console.log("Commentary toggle:", enabled);
  };

  const handleMusicToggle = (enabled: boolean) => {
    // TODO: Implement music clip filtering
    console.log("Music toggle:", enabled);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Analysis", headerShown: false }} />

      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Analysis</Text>
        <View style={styles.headerSpacer} />
      </View>

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
        <ScrollView style={styles.mainScroll}>
          <ClipHeader
            onCommentaryToggle={handleCommentaryToggle}
            onMusicToggle={handleMusicToggle}
          />
          <ClipList clips={data} />
          <View style={styles.analysisContainer}>
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
            <HighlightSection highlights={analysis?.highlights} />
            {conversation?.points !== undefined && (
              <View style={styles.pointsSection}>
                <Text style={styles.pointsLabel}>Points Earned</Text>
                <Text style={styles.pointsValue}>+ {conversation.points}</Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  backButtonText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "500",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
  },
  headerSpacer: {
    width: 60,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#dc3545",
    textAlign: "center",
  },
  mainScroll: {
    flex: 1,
  },
  analysisContainer: {
    paddingTop: 8,
  },
  pointsSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  pointsLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  pointsValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});
