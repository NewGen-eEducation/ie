export type TabType =
  | 'dashboard'
  | 'admissions'
  | 'exam-pre'
  | 'exam-during'
  | 'exam-post'
  | 'results'
  | 'converters'
  | 'sports-games'
  | 'about';

export interface CustomAttachment {
  id: string;
  tab: TabType;
  title: string;
  url: string; // "local://filename" or "https://..."
  desc?: string;
  category?: string;
  timestamp: number;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
}

export interface RecentItem {
  id?: string;
  title: string;
  tab?: TabType;
  toolId?: string;
  url?: string;
  isLocal?: boolean;
  timestamp: number;
}

export interface ToolDefinition {
  id: string;
  title: string;
  desc: string;
  badge?: string;
  badgeColor?: string;
  icon?: string;
  tab: TabType;
  actionText?: string;
  category?: string;
}
