import { Microtrend, Trend } from "@/types/trend";
import { Box } from '@/components/ui/box';
import { Text, Heading } from '@/components/ui/text';
import { Card, CardBody } from '@/components/ui/card';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  trend: Trend | Microtrend;
}

const toPercent = (v: number) => `${Math.round(v * 100)}%`;

const getVolumeColor = (volume: number) => {
  if (volume >= 0.7) return 'text-success-600';
  if (volume >= 0.4) return 'text-warning-600';
  return 'text-error-600';
};

const getVolumeIcon = (volume: number) => {
  if (volume >= 0.7) return 'flame';
  if (volume >= 0.4) return 'trending-up';
  return 'pulse';
};

export default function TrendCard({ trend }: Props) {
  const {
    title,
    description,
    volume,
    overall_positive_sentiment,
    overall_negative_sentiment,
  } = trend;

  const volumeValue = volume ?? 0;
  const positiveValue = overall_positive_sentiment ?? 0;
  const negativeValue = overall_negative_sentiment ?? 0;

  return (
    <Card variant="elevated" className="mr-3 w-80">
      <CardBody>
        {/* Header with trend icon */}
        <Box className="flex-row items-start justify-between mb-3">
          <Box className="flex-1 mr-3">
            <Heading size="md" className="text-typography-900 mb-1" numberOfLines={2}>
              {title}
            </Heading>
          </Box>
          <Box className="w-8 h-8 bg-primary-100 rounded-full items-center justify-center">
            <Ionicons 
              name={getVolumeIcon(volumeValue) as any} 
              size={16} 
              color="#4f46e5" 
            />
          </Box>
        </Box>

        {/* Description */}
        {description && (
          <Text size="sm" className="text-typography-600 mb-4 leading-5" numberOfLines={3}>
            {description}
          </Text>
        )}

        {/* Metrics */}
        <Box className="space-y-3">
          {/* Popularity */}
          <Box className="flex-row items-center justify-between">
            <Box className="flex-row items-center">
              <Ionicons name="bar-chart" size={14} color="#6b7280" style={{ marginRight: 6 }} />
              <Text size="xs" className="text-typography-600">
                Popularity
              </Text>
            </Box>
            <Text size="xs" weight="semibold" className={getVolumeColor(volumeValue)}>
              {toPercent(volumeValue)}
            </Text>
          </Box>

          {/* Sentiment */}
          {(positiveValue > 0 || negativeValue > 0) && (
            <Box className="flex-row items-center justify-between">
              <Box className="flex-row items-center">
                <Ionicons name="heart" size={14} color="#6b7280" style={{ marginRight: 6 }} />
                <Text size="xs" className="text-typography-600">
                  Sentiment
                </Text>
              </Box>
              <Box className="flex-row items-center space-x-2">
                <Box className="flex-row items-center">
                  <Text size="xs" className="text-success-600">
                    +{toPercent(positiveValue)}
                  </Text>
                </Box>
                <Text size="xs" className="text-typography-400">/</Text>
                <Box className="flex-row items-center">
                  <Text size="xs" className="text-error-600">
                    -{toPercent(negativeValue)}
                  </Text>
                </Box>
              </Box>
            </Box>
          )}

          {/* Progress bar for popularity */}
          <Box className="mt-2">
            <Box className="w-full h-1.5 bg-background-200 rounded-full overflow-hidden">
              <Box 
                className={`h-full rounded-full ${
                  volumeValue >= 0.7 ? 'bg-success-500' : 
                  volumeValue >= 0.4 ? 'bg-warning-500' : 'bg-error-500'
                }`}
                style={{ width: `${Math.max(volumeValue * 100, 5)}%` }}
              />
            </Box>
          </Box>
        </Box>
      </CardBody>
    </Card>
  );
}
