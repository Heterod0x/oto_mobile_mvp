import { ConversationDTO } from "@/types/conversation";
import { TouchableOpacity } from "react-native";
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Card, CardBody } from '@/components/ui/card';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  conversation: ConversationDTO;
  onPress?: () => void;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
    case 'success':
      return 'text-success-600';
    case 'processing':
    case 'pending':
      return 'text-warning-600';
    case 'failed':
    case 'error':
      return 'text-error-600';
    default:
      return 'text-typography-600';
  }
};

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
    case 'success':
      return 'checkmark-circle';
    case 'processing':
    case 'pending':
      return 'time';
    case 'failed':
    case 'error':
      return 'alert-circle';
    default:
      return 'document';
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < 24) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (diffInHours < 24 * 7) {
    return date.toLocaleDateString([], { weekday: 'short', hour: '2-digit', minute: '2-digit' });
  } else {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }
};

export default function ConversationItem({ conversation, onPress }: Props) {
  const formattedDate = formatDate(conversation.created_at);
  const statusColor = getStatusColor(conversation.status);
  const statusIcon = getStatusIcon(conversation.status);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card variant="outline" className="mx-5 mb-3">
        <CardBody>
          <Box className="flex-row items-center">
            {/* File Icon */}
            <Box className="w-12 h-12 bg-primary-100 rounded-full items-center justify-center mr-4">
              <Ionicons name="musical-notes" size={20} color="#4f46e5" />
            </Box>

            {/* Content */}
            <Box className="flex-1 mr-3">
              <Text size="md" weight="medium" className="text-typography-900 mb-1" numberOfLines={1}>
                {conversation.file_name}
              </Text>
              <Box className="flex-row items-center">
                <Ionicons name="time" size={12} color="#9ca3af" style={{ marginRight: 4 }} />
                <Text size="xs" className="text-typography-500">
                  {formattedDate}
                </Text>
              </Box>
            </Box>

            {/* Status */}
            <Box className="items-center">
              <Box className="flex-row items-center mb-1">
                <Ionicons 
                  name={statusIcon as any} 
                  size={16} 
                  color={
                    conversation.status.toLowerCase() === 'completed' ? '#059669' :
                    conversation.status.toLowerCase() === 'processing' ? '#f59e0b' :
                    conversation.status.toLowerCase() === 'failed' ? '#dc2626' : '#6b7280'
                  }
                />
              </Box>
              <Text size="xs" className={statusColor} weight="medium">
                {conversation.status}
              </Text>
            </Box>

            {/* Chevron */}
            <Box className="ml-2">
              <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
            </Box>
          </Box>
        </CardBody>
      </Card>
    </TouchableOpacity>
  );
}
