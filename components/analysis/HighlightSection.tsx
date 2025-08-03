import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { Box } from '@/components/ui/box';
import { Text, Heading } from '@/components/ui/text';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Button, ButtonText } from '@/components/ui/button';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

interface Highlight {
  summary: string;
  highlight: string;
  timecode_start_at: string;
  timecode_end_at: string;
  favorite: boolean;
}

interface Props {
  highlights?: Highlight[] | null;
}

const formatTimecode = (timecode: string) => {
  // Convert timecode to more readable format
  const time = new Date(`1970-01-01T${timecode}Z`);
  const minutes = time.getUTCMinutes();
  const seconds = time.getUTCSeconds();
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const HighlightCard = ({ highlight, index }: { highlight: Highlight; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <TouchableOpacity 
      onPress={() => setIsExpanded(!isExpanded)}
      activeOpacity={0.7}
    >
      <Card 
        variant={highlight.favorite ? "elevated" : "outline"} 
        className={`mb-3 ${highlight.favorite ? 'border-l-4 border-l-warning-500' : ''}`}
      >
        <CardBody>
          <Box className="flex-row items-start justify-between">
            <Box className="flex-1 mr-3">
              {/* Header */}
              <Box className="flex-row items-center mb-2">
                <Box className="w-6 h-6 bg-primary-100 rounded-full items-center justify-center mr-2">
                  <Text size="xs" weight="bold" className="text-primary-600">
                    {index + 1}
                  </Text>
                </Box>
                <Text size="xs" className="text-typography-500">
                  {formatTimecode(highlight.timecode_start_at)} - {formatTimecode(highlight.timecode_end_at)}
                </Text>
                {highlight.favorite && (
                  <Box className="ml-2">
                    <Ionicons name="star" size={14} color="#f59e0b" />
                  </Box>
                )}
              </Box>

              {/* Summary */}
              <Text 
                size="sm" 
                className="text-typography-900 leading-5 mb-2"
                numberOfLines={isExpanded ? undefined : 2}
              >
                {highlight.summary}
              </Text>

              {/* Full highlight text when expanded */}
              {isExpanded && highlight.highlight && (
                <Box className="bg-background-100 rounded-lg p-3 mb-3">
                  <Text size="sm" className="text-typography-700 italic leading-5">
                    &ldquo;{highlight.highlight}&rdquo;
                  </Text>
                </Box>
              )}

              {/* Action buttons */}
              <Box className="flex-row items-center justify-between">
                <Box className="flex-row items-center space-x-3">
                </Box>
              </Box>
            </Box>
          </Box>
        </CardBody>
      </Card>
    </TouchableOpacity>
  );
};

export default function HighlightSection({ highlights }: Props) {
  const [showAll, setShowAll] = useState(false);
  
  if (!highlights) {
    return (
      <Card variant="elevated" className="mb-4">
        <CardBody>
          <Box className="flex-row items-center justify-center py-8">
            <ActivityIndicator size="small" color="#4f46e5" />
            <Text size="md" className="text-typography-600 ml-3">
              Generating highlights...
            </Text>
          </Box>
        </CardBody>
      </Card>
    );
  }

  if (highlights.length === 0) {
    return (
      <Card variant="elevated" className="mb-4">
        <CardBody>
          <Box className="items-center py-8">
            <Box className="w-16 h-16 bg-background-100 rounded-full items-center justify-center mb-4">
              <Ionicons name="star-outline" size={32} color="#9ca3af" />
            </Box>
            <Text size="lg" weight="medium" className="text-typography-700 mb-2">
              No highlights found
            </Text>
            <Text size="sm" className="text-typography-500 text-center">
              This conversation doesn&apos;t have any highlighted moments yet.
            </Text>
          </Box>
        </CardBody>
      </Card>
    );
  }

  const displayedHighlights = showAll ? highlights : highlights.slice(0, 3);
  const favoriteCount = highlights.filter(h => h.favorite).length;

  return (
    <Card variant="elevated" className="mb-4">
      <CardHeader>
        <Box className="flex-row items-center justify-between">
          <Box className="flex-row items-center">
            <Box className="w-8 h-8 bg-warning-100 rounded-full items-center justify-center mr-3">
              <Ionicons name="star" size={16} color="#f59e0b" />
            </Box>
            <Box>
              <Heading size="lg" className="text-typography-900">
                Highlights
              </Heading>
              <Text size="xs" className="text-typography-500">
                {highlights.length} moments • {favoriteCount} favorites
              </Text>
            </Box>
          </Box>
          
          {highlights.length > 3 && (
            <Button 
              variant="ghost" 
              size="sm"
              onPress={() => setShowAll(!showAll)}
            >
              <ButtonText variant="ghost" size="sm">
                {showAll ? 'Show Less' : `+${highlights.length - 3} More`}
              </ButtonText>
            </Button>
          )}
        </Box>
      </CardHeader>
      
      <CardBody>
        <Box className="space-y-3">
          {displayedHighlights.map((highlight, index) => (
            <HighlightCard 
              key={index} 
              highlight={highlight} 
              index={index}
            />
          ))}
        </Box>
      </CardBody>
    </Card>
  );
}
