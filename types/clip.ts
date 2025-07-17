export interface ClipCaptionDTO {
  timecode_start: string;
  timecode_end: string;
  speaker: string;
  caption: string;
}

export interface ClipDTO {
  id: string;
  conversation_id: string;
  file_name: string;
  mime_type: string;
  title: string;
  description: string;
  comment: string;
  captions: ClipCaptionDTO[];
}
