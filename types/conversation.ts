export type ConversationStatus =
  | 'not_started'
  | 'processing'
  | 'completed'
  | 'failed';

export interface ConversationDTO {
  id: string;
  created_at: string;
  updated_at: string;
  status: ConversationStatus;
  file_name: string;
  mime_type: string;
  available_duration?: string;
  language?: string;
  situation?: string;
  place?: string;
  time?: string;
  location?: string;
  points?: number;
}
