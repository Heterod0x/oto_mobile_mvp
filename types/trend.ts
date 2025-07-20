export interface Trend {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  description: string | null;
  volume: number;
  overall_positive_sentiment: number | null;
  overall_negative_sentiment: number | null;
  cluster_id: number | null;
}

export type Microtrend = Omit<Trend, 'cluster_id'>;

export type TrendListResponse = Trend[];
export type MicrotrendListResponse = Microtrend[];
