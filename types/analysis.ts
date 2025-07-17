export interface AnalysisResponse {
  summary: { summary: string };
  highlights: Array<{
    summary: string;
    highlight: string;
    timecode_start_at: string;
    timecode_end_at: string;
    favorite: boolean;
  }>;
  insights: {
    suggestions: string[];
    boring_score: number;
    density_score: number;
    clarity_score: number;
    engagement_score: number;
    interesting_score: number;
  };
  breakdown: {
    metadata: {
      duration: string;
      language: string;
      situation: string;
      place: string;
      time: string;
      location: string;
      participants: string[];
    };
    sentiment: { positive: number; neutral: number; negative: number };
    keywords: Array<{ keyword: string; importance_score: number }>;
  };
}

export interface TranscriptResponse {
  id: string;
  created_at: string;
  updated_at: string;
  captions: Array<{ timecode: string; speaker: string; caption: string }>;
}
