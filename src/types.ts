export type ServicePillarId =
  | 'web-dev'
  | 'digital-marketing'
  | 'brand-solution'
  | 'content-writing'
  | 'creative-designing'
  | 'ai-automation'
  | 'seo'
  | 'digital-portfolio';

export interface ServicePillarInfo {
  id: ServicePillarId;
  number: number;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  color: string;
  badgeColor: string;
  keyFeatures: string[];
  metrics: { label: string; value: string }[];
}

export interface PortfolioCaseStudy {
  id: string;
  title: string;
  pillar: ServicePillarId;
  pillarLabel: string;
  client: string;
  description: string;
  roiStats: string;
  techStack: string[];
  gradient: string;
  badgeColor: string;
  liveUrl?: string;
}

export interface CalendarPost {
  id: string;
  platform: 'LinkedIn' | 'Twitter' | 'Instagram' | 'Facebook';
  content: string;
  scheduledTime: string;
  status: 'Scheduled' | 'Published' | 'Draft';
  author: string;
  hashtags?: string[];
}

export interface EmailBlock {
  id: string;
  type: 'Header Banner' | 'Body Copy' | 'CTA Button' | 'Divider' | 'Feature Grid';
  title: string;
  content: string;
  buttonUrl?: string;
}

export interface AdCampaign {
  id: string;
  name: string;
  platform: 'Google Ads' | 'Meta Ads' | 'LinkedIn Ads' | 'TikTok Ads';
  monthlyBudget: number;
  spent: number;
  clicks: number;
  conversions: number;
  roas: number;
  status: 'Active' | 'Paused' | 'Draft';
}

export interface TechnicalCheck {
  name: string;
  status: 'Passed' | 'Warning' | 'Failed';
  details: string;
}

export interface SeoAuditResult {
  score: number;
  domain: string;
  scannedAt: string;
  metaAnalysis: {
    title: string;
    description: string;
    ogTags: string;
    canonical: string;
  };
  technicalChecks: TechnicalCheck[];
  recommendations: string[];
  keywordOpportunities: string[];
}

export interface ABExperiment {
  id: string;
  name: string;
  pageUrl: string;
  variantA: {
    headline: string;
    conversionRate: number;
    visitors: number;
  };
  variantB: {
    headline: string;
    conversionRate: number;
    visitors: number;
  };
  status: 'Running' | 'Concluded';
  winner?: 'A' | 'B';
}

export type UserRole = 'Admin' | 'Client' | 'Content Manager' | 'Developer';

export interface CSharpFile {
  fileName: string;
  language: 'xml' | 'csharp' | 'json';
  code: string;
  description: string;
}
