import { Box } from '@/components/ui/box';
import { Text, Heading } from '@/components/ui/text';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native';

interface Props {
  summary?: string | null;
}

export default function SummarySection({ summary }: Props) {
  if (!summary) {
    return (
      <Card variant="elevated" className="mb-4">
        <CardBody>
          <Box className="flex-row items-center justify-center py-8">
            <ActivityIndicator size="small" color="#4f46e5" />
            <Text size="md" className="text-typography-600 ml-3">
              Generating summary...
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
          <Box className="w-8 h-8 bg-info-100 rounded-full items-center justify-center mr-3">
            <Ionicons name="document-text" size={16} color="#0ea5e9" />
          </Box>
          <Heading size="lg" className="text-typography-900">
            Summary
          </Heading>
        </Box>
      </CardHeader>
      <CardBody>
        <Text size="md" className="text-typography-700 leading-6">
          {summary}
        </Text>
      </CardBody>
    </Card>
  );
}
