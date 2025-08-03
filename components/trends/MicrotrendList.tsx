import { Microtrend } from "@/types/trend";
import { Box } from "@/components/ui/box";
import { Text, Heading } from "@/components/ui/text";
import { Card, CardBody } from "@/components/ui/card";
import { Ionicons } from "@expo/vector-icons";
import MicrotrendCard from "./MicrotrendCard";

interface Props {
  microtrends: Microtrend[] | null;
}

export default function MicrotrendList({ microtrends }: Props) {
  // reduce microtrends to 5
  const reducedMicrotrends = microtrends?.slice(0, 5);

  if (!microtrends || microtrends.length === 0) {
    return (
      <Box className="mt-8">
        <Box className="flex-row items-center mb-6">
          <Box className="w-8 h-8 bg-secondary-100 rounded-full items-center justify-center mr-3">
            <Ionicons name="flash" size={16} color="#6b7280" />
          </Box>
          <Heading size="xl" className="text-typography-900">
            Emerging Micro-Trends
          </Heading>
        </Box>
        
        <Card variant="outline" className="border-dashed">
          <CardBody>
            <Box className="items-center py-8">
              <Box className="w-16 h-16 bg-background-100 rounded-full items-center justify-center mb-4">
                <Ionicons name="pulse-outline" size={32} color="#9ca3af" />
              </Box>
              <Text size="lg" weight="medium" className="text-typography-700 mb-2">
                No micro-trends available
              </Text>
              <Text size="sm" className="text-typography-500 text-center">
                Check back later for emerging conversation patterns
              </Text>
            </Box>
          </CardBody>
        </Card>
      </Box>
    );
  }

  return (
    <Box className="mt-8">
      {/* Section Header */}
      <Box className="flex-row items-center justify-between mb-6">
        <Box className="flex-row items-center">
          <Box className="w-8 h-8 bg-secondary-100 rounded-full items-center justify-center mr-3">
            <Ionicons name="flash" size={16} color="#6b7280" />
          </Box>
          <Box>
            <Heading size="xl" className="text-typography-900">
              Emerging Micro-Trends
            </Heading>
            <Text size="sm" className="text-typography-600">
              {microtrends.length} trending topics
            </Text>
          </Box>
        </Box>
        
        {/* Trending indicator */}
        <Box className="flex-row items-center bg-success-50 px-3 py-1 rounded-full">
          <Ionicons name="trending-up" size={14} color="#059669" style={{ marginRight: 4 }} />
          <Text size="xs" className="text-success-700 font-medium">
            Live
          </Text>
        </Box>
      </Box>

      {/* Micro-trend Cards */}
      <Box className="space-y-3">
        {reducedMicrotrends.map((microtrend, index) => (
          <MicrotrendCard 
            key={microtrend.id} 
            microtrend={microtrend}
            onPress={() => {
              // TODO: Navigate to microtrend detail
              console.log('Microtrend pressed:', microtrend.title);
            }}
          />
        ))}
      </Box>

      {/* Show more button if there are many trends */}
      {microtrends.length > 5 && (
        <Box className="mt-4">
          <Card variant="ghost" className="border-dashed border-primary-200">
            <CardBody>
              <Box className="flex-row items-center justify-center py-3">
                <Ionicons name="add-circle-outline" size={20} color="#4f46e5" style={{ marginRight: 8 }} />
                <Text size="md" className="text-primary-600 font-medium">
                  View All Micro-Trends
                </Text>
              </Box>
            </CardBody>
          </Card>
        </Box>
      )}
    </Box>
  );
}
