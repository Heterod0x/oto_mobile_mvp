import { ActivityIndicator } from 'react-native';
import { Box } from '@/components/ui/box';
import { Text, Heading } from '@/components/ui/text';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Ionicons } from '@expo/vector-icons';

interface Metadata {
  duration: string;
  language: string;
  situation: string;
  place: string;
  time: string;
  location: string;
  participants: string[];
}

interface Sentiment {
  positive: number;
  neutral: number;
  negative: number;
}

interface Keyword {
  keyword: string;
  importance_score: number;
}

interface Props {
  metadata?: Metadata | null;
  sentiment?: Sentiment | null;
  keywords?: Keyword[] | null;
}

const toPercent = (n: number) => `${Math.round(n * 100)}%`;

const SentimentBar = ({ label, value, color, icon }: { 
  label: string; 
  value: number; 
  color: string; 
  icon: string; 
}) => (
  <Box className="mb-4">
    <Box className="flex-row items-center justify-between mb-2">
      <Box className="flex-row items-center">
        <Ionicons name={icon as any} size={16} color={color} style={{ marginRight: 8 }} />
        <Text size="sm" className="text-typography-700">
          {label}
        </Text>
      </Box>
      <Text size="sm" weight="semibold" style={{ color }}>
        {toPercent(value)}
      </Text>
    </Box>
    <Box className="w-full h-2 bg-background-200 rounded-full overflow-hidden">
      <Box 
        className="h-full rounded-full"
        style={{ 
          width: `${Math.max(value * 100, 2)}%`,
          backgroundColor: color 
        }}
      />
    </Box>
  </Box>
);

const MetadataItem = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
  <Box className="flex-row items-center py-3 border-b border-outline-100 last:border-b-0">
    <Box className="w-8 h-8 bg-primary-100 rounded-full items-center justify-center mr-3">
      <Ionicons name={icon as any} size={16} color="#4f46e5" />
    </Box>
    <Box className="flex-1">
      <Text size="xs" className="text-typography-500 mb-1">
        {label}
      </Text>
      <Text size="sm" weight="medium" className="text-typography-900">
        {value}
      </Text>
    </Box>
  </Box>
);

export default function BreakdownSection({ metadata, sentiment, keywords }: Props) {
  if (!metadata && !sentiment && !keywords) {
    return (
      <Card variant="elevated" className="mb-4">
        <CardBody>
          <Box className="flex-row items-center justify-center py-8">
            <ActivityIndicator size="small" color="#4f46e5" />
            <Text size="md" className="text-typography-600 ml-3">
              Analyzing conversation details...
            </Text>
          </Box>
        </CardBody>
      </Card>
    );
  }

  return (
    <Box className="space-y-4">
      {/* Sentiment Analysis */}
      {sentiment && (
        <Card variant="elevated">
          <CardHeader>
            <Box className="flex-row items-center">
              <Box className="w-8 h-8 bg-info-100 rounded-full items-center justify-center mr-3">
                <Ionicons name="heart" size={16} color="#0ea5e9" />
              </Box>
              <Heading size="lg" className="text-typography-900">
                Sentiment Analysis
              </Heading>
            </Box>
          </CardHeader>
          <CardBody>
            <SentimentBar 
              label="Positive" 
              value={sentiment.positive} 
              color="#059669" 
              icon="happy" 
            />
            <SentimentBar 
              label="Neutral" 
              value={sentiment.neutral} 
              color="#6b7280" 
              icon="remove" 
            />
            <SentimentBar 
              label="Negative" 
              value={sentiment.negative} 
              color="#dc2626" 
              icon="sad" 
            />
          </CardBody>
        </Card>
      )}

      {/* Metadata */}
      {metadata && (
        <Card variant="elevated">
          <CardHeader>
            <Box className="flex-row items-center">
              <Box className="w-8 h-8 bg-tertiary-100 rounded-full items-center justify-center mr-3">
                <Ionicons name="information-circle" size={16} color="#f59e0b" />
              </Box>
              <Heading size="lg" className="text-typography-900">
                Conversation Details
              </Heading>
            </Box>
          </CardHeader>
          <CardBody>
            <MetadataItem 
              icon="time" 
              label="Duration" 
              value={metadata.duration} 
            />
            <MetadataItem 
              icon="language" 
              label="Language" 
              value={metadata.language} 
            />
            {metadata.place && (
              <MetadataItem 
                icon="location" 
                label="Place" 
                value={metadata.place} 
              />
            )}
            {metadata.location && (
              <MetadataItem 
                icon="map" 
                label="Location" 
                value={metadata.location} 
              />
            )}
            <MetadataItem 
              icon="people" 
              label="Participants" 
              value={`${metadata.participants.length} people`} 
            />
          </CardBody>
        </Card>
      )}

      {/* Keywords */}
      {keywords && keywords.length > 0 && (
        <Card variant="elevated">
          <CardHeader>
            <Box className="flex-row items-center">
              <Box className="w-8 h-8 bg-secondary-100 rounded-full items-center justify-center mr-3">
                <Ionicons name="pricetags" size={16} color="#6b7280" />
              </Box>
              <Heading size="lg" className="text-typography-900">
                Key Topics
              </Heading>
            </Box>
          </CardHeader>
          <CardBody>
            <Box className="flex-row flex-wrap gap-2">
              {keywords.slice(0, 10).map((keyword, index) => {
                const intensity = keyword.importance_score;
                const bgColor = intensity > 0.8 ? 'bg-primary-100' : 
                               intensity > 0.6 ? 'bg-secondary-100' : 'bg-background-200';
                const textColor = intensity > 0.8 ? 'text-primary-700' : 
                                 intensity > 0.6 ? 'text-secondary-700' : 'text-typography-600';
                
                return (
                  <Box 
                    key={keyword.keyword} 
                    className={`${bgColor} px-3 py-2 rounded-full flex-row items-center`}
                  >
                    <Text size="sm" weight="medium" className={textColor}>
                      {keyword.keyword}
                    </Text>
                    <Box className="ml-2 w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                  </Box>
                );
              })}
            </Box>
            
            {keywords.length > 10 && (
              <Box className="mt-4 pt-4 border-t border-outline-100">
                <Text size="sm" className="text-typography-500 text-center">
                  +{keywords.length - 10} more topics identified
                </Text>
              </Box>
            )}
          </CardBody>
        </Card>
      )}
    </Box>
  );
}
