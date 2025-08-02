import { Box } from '@/components/ui/box';
import { Text, Heading } from '@/components/ui/text';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native';

interface Props {
  suggestions?: string[];
  scores?: {
    boring_score: number;
    density_score: number;
    clarity_score: number;
    engagement_score: number;
    interesting_score: number;
  } | null;
}

const toPercent = (n: number) => `${Math.round(n * 100)}%`;

const getScoreColor = (score: number) => {
  if (score >= 0.8) return 'text-success-600';
  if (score >= 0.6) return 'text-warning-600';
  return 'text-error-600';
};

const getScoreIcon = (score: number) => {
  if (score >= 0.8) return 'trending-up';
  if (score >= 0.6) return 'remove';
  return 'trending-down';
};

const formatScoreLabel = (key: string) => {
  return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()).replace(' Score', '');
};

export default function InsightSection({ suggestions, scores }: Props) {
  if (!suggestions && !scores) {
    return (
      <Card variant="elevated" className="mb-4">
        <CardBody>
          <Box className="flex-row items-center justify-center py-8">
            <ActivityIndicator size="small" color="#4f46e5" />
            <Text size="md" className="text-typography-600 ml-3">
              Analyzing performance...
            </Text>
          </Box>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card variant="elevated" className="mb-4">
      <CardHeader>
        <Box className="flex-row items-center">
          <Box className="w-8 h-8 bg-warning-100 rounded-full items-center justify-center mr-3">
            <Ionicons name="analytics" size={16} color="#f59e0b" />
          </Box>
          <Heading size="lg" className="text-typography-900">
            Performance Insights
          </Heading>
        </Box>
      </CardHeader>
      <CardBody>
        {/* Suggestions */}
        {suggestions && suggestions.length > 0 && (
          <Box className="mb-6">
            <Text size="sm" weight="medium" className="text-typography-700 mb-3">
              Recommendations
            </Text>
            <Box className="space-y-2">
              {suggestions.slice(0, 3).map((suggestion, index) => (
                <Box key={index} className="flex-row items-start">
                  <Box className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 mr-3" />
                  <Text size="sm" className="text-typography-700 flex-1 leading-5">
                    {suggestion}
                  </Text>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* Scores */}
        {scores && (
          <Box>
            <Text size="sm" weight="medium" className="text-typography-700 mb-3">
              Performance Metrics
            </Text>
            <Box className="space-y-3">
              {Object.entries(scores)
                .filter(([k, v]) => typeof v === 'number' && !isNaN(v))
                .map(([key, value]) => (
                  <Box key={key} className="flex-row items-center justify-between">
                    <Box className="flex-row items-center flex-1">
                      <Ionicons 
                        name={getScoreIcon(value) as any} 
                        size={16} 
                        color={value >= 0.8 ? '#059669' : value >= 0.6 ? '#f59e0b' : '#dc2626'} 
                        style={{ marginRight: 8 }}
                      />
                      <Text size="sm" className="text-typography-700 flex-1">
                        {formatScoreLabel(key)}
                      </Text>
                    </Box>
                    <Box className="flex-row items-center">
                      <Text size="sm" weight="semibold" className={getScoreColor(value)}>
                        {toPercent(value)}
                      </Text>
                    </Box>
                  </Box>
                ))}
            </Box>
          </Box>
        )}
      </CardBody>
    </Card>
  );
}
