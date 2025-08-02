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
import { ActivityIndicator, ScrollView, SafeAreaView } from "react-native";
import { Box } from "@/components/ui/box";
import { Text, Heading } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { Header, HeaderAction } from "@/components/ui/header";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function ConversationDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const conversationId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();
  const { data, loading, error } = useClips(conversationId);
  const { data: analysis } = useAnalysis(conversationId);
  const { data: conversation } = useConversation(conversationId);
  const [activeTab, setActiveTab] = useState<'overview' | 'clips' | 'insights'>('overview');

  const handleCommentaryToggle = (enabled: boolean) => {
    console.log("Commentary toggle:", enabled);
  };

  const handleMusicToggle = (enabled: boolean) => {
    console.log("Music toggle:", enabled);
  };

  const TabButton = ({ 
    tab, 
    label, 
    icon, 
    isActive 
  }: { 
    tab: 'overview' | 'clips' | 'insights'; 
    label: string; 
    icon: string; 
    isActive: boolean; 
  }) => (
    <Button
      variant={isActive ? "solid" : "ghost"}
      size="sm"
      onPress={() => setActiveTab(tab)}
      className={`flex-1 ${isActive ? '' : 'bg-transparent'}`}
    >
      <Box className="flex-row items-center">
        <Ionicons 
          name={icon as any} 
          size={16} 
          color={isActive ? "white" : "#4f46e5"} 
          style={{ marginRight: 6 }}
        />
        <ButtonText variant={isActive ? "solid" : "ghost"} size="sm">
          {label}
        </ButtonText>
      </Box>
    </Button>
  );

  if (loading) {
    return (
      <SafeAreaView className="flex-1">
        <Stack.Screen options={{ title: "Analysis", headerShown: false }} />
        
        {/* Hero Header - Same as main page */}
        <Box className="bg-gradient-to-br from-primary-600 to-primary-800 px-5 py-6 pt-12">
          <Box className="flex-row items-center justify-between mb-6">
            <Button
              variant="ghost"
              size="sm"
              onPress={() => router.back()}
              className="bg-white/0"
            >
              <Ionicons name="chevron-back" size={24} color="gray" />
            </Button>
            
            <Box className="w-10 h-10" /> {/* Spacer for alignment */}
          </Box>
        </Box>

        {/* Loading Content */}
        <Box className="flex-1 bg-background-50 justify-center items-center px-8">
          <Box className="items-center">
            {/* Animated Loading Circle */}
            <Box className="w-24 h-24 bg-white rounded-full items-center justify-center mb-8 shadow-lg">
              <Box className="w-16 h-16 bg-primary-100 rounded-full items-center justify-center">
                <ActivityIndicator size="large" color="#4f46e5" />
              </Box>
            </Box>
            
            {/* Progress Bar */}
            <Box className="w-full max-w-sm mt-6">
              <Box className="w-full h-2 bg-background-200 rounded-full overflow-hidden">
                <Box className="w-2/3 h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full" />
              </Box>
              <Text size="xs" className="text-typography-500 text-center mt-2">
                Processing... This may take a few moments
              </Text>
            </Box>
          </Box>
        </Box>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1">
        <Header 
          title="Analysis" 
          showBackButton 
          onBackPress={() => router.back()}
        />
        <Box className="flex-1 justify-center items-center px-8">
          <Box className="items-center">
            <Box className="w-20 h-20 bg-error-100 rounded-full items-center justify-center mb-6">
              <Ionicons name="alert-circle" size={40} color="#dc2626" />
            </Box>
            <Heading size="lg" className="text-error-700 mb-2 text-center">
              Analysis Failed
            </Heading>
            <Text size="md" className="text-typography-600 text-center mb-6">
              {error}
            </Text>
            <Button onPress={() => router.back()}>
              <ButtonText>Go Back</ButtonText>
            </Button>
          </Box>
        </Box>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen options={{ title: "Analysis", headerShown: false }} />
      
      {/* Hero Header */}
      <Box className="bg-gradient-to-br from-primary-600 to-primary-800 px-5 py-6 pt-12">
        <Box className="flex-row items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="sm"
            onPress={() => router.back()}
            className="bg-white/0"
          >
            <Ionicons name="chevron-back" size={24} color="gray" />
          </Button>
        </Box>

        <Box className="items-center">
          <Box className="w-16 h-16 bg-black/0 rounded-full items-center justify-center mb-4">
            <Ionicons name="analytics" size={32} color="gray" />
          </Box>
          <Heading size="2xl" className="text-black mb-2 text-center">
            Conversation Analysis
          </Heading>
          <Text size="md" className="text-black/80 text-center">
            AI-powered insights and performance metrics
          </Text>
        </Box>
      </Box>

      {/* Tab Navigation */}
      <Box className="bg-background-0 px-5 py-4 border-b border-outline-100">
        <Box className="flex-row bg-background-100 rounded-lg p-1">
          <TabButton 
            tab="overview" 
            label="Overview" 
            icon="pie-chart" 
            isActive={activeTab === 'overview'} 
          />
          <TabButton 
            tab="clips" 
            label="Clips" 
            icon="musical-notes" 
            isActive={activeTab === 'clips'} 
          />
          <TabButton 
            tab="insights" 
            label="Insights" 
            icon="bulb" 
            isActive={activeTab === 'insights'} 
          />
        </Box>
      </Box>

      {/* Content */}
      <ScrollView 
        className="flex-1 bg-background-50"
        showsVerticalScrollIndicator={false}
      >
        <Box className="px-5 py-6">
          {activeTab === 'overview' && (
            <Box className="space-y-6">
              {/* Points Earned - Hero Card */}
              {conversation?.points !== undefined && (
                <Card variant="elevated" className="bg-gradient-to-r from-success-500 to-success-600 mb-4">
                  <CardBody>
                    <Box className="flex-row items-center justify-between">
                      <Box className="flex-1">
                        <Text size="sm" className="text-black/80 mb-1">
                          Points Earned
                        </Text>
                        <Heading size="3xl" className="text-black">
                          +{conversation.points}
                        </Heading>
                      </Box>
                      <Box className="w-16 h-16 bg-black/0 rounded-full items-center justify-center">
                        <Ionicons name="trophy" size={32} color="gray" />
                      </Box>
                    </Box>
                  </CardBody>
                </Card>
              )}

              <SummarySection summary={analysis?.summary.summary} />
              <InsightSection
                suggestions={analysis?.insights.suggestions}
                scores={analysis?.insights}
              />
            </Box>
          )}

          {activeTab === 'clips' && (
            <Box>
              <ClipHeader
                onCommentaryToggle={handleCommentaryToggle}
                onMusicToggle={handleMusicToggle}
              />
              <ClipList clips={data} />
            </Box>
          )}

          {activeTab === 'insights' && (
            <Box className="space-y-6">
              <BreakdownSection
                metadata={analysis?.breakdown.metadata}
                sentiment={analysis?.breakdown.sentiment}
                keywords={analysis?.breakdown.keywords}
              />
              <HighlightSection highlights={analysis?.highlights} />
            </Box>
          )}
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
