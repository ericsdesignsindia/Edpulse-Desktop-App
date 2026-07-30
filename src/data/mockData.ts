import {
  ServicePillarInfo,
  PortfolioCaseStudy,
  CalendarPost,
  AdCampaign,
  ABExperiment,
  CSharpFile,
} from '../types';

export const SERVICE_PILLARS: ServicePillarInfo[] = [
  {
    id: 'web-dev',
    number: 1,
    title: 'Web Development',
    shortDesc: 'High-speed Next.js / React web applications, custom API pipelines, and landing pages.',
    fullDesc: 'Enterprise web solutions built with React 19, Next.js, FastAPI, and Cloud Run architecture. High performance, zero cold starts, and full API integrations.',
    iconName: 'Code',
    color: 'from-indigo-600 to-indigo-800',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    keyFeatures: ['Next.js App Router', 'FastAPI Webhook Engine', 'REST & GraphQL APIs', 'Lighthouse 95+ Score'],
    metrics: [
      { label: 'Avg Speed Score', value: '98/100' },
      { label: 'Uptime SLA', value: '99.99%' },
    ],
  },
  {
    id: 'digital-marketing',
    number: 2,
    title: 'Digital Marketing',
    shortDesc: 'Multi-channel growth strategy, PPC acquisition, and conversion optimization.',
    fullDesc: 'Data-driven paid search and social campaigns engineered to maximize ROAS. Complete pipeline attribution tracking from initial click to CRM deal closed.',
    iconName: 'TrendingUp',
    color: 'from-emerald-600 to-emerald-800',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    keyFeatures: ['Google Search Ads', 'Meta ROAS Scaling', 'Funnel Optimization', 'CAC Reduction Engine'],
    metrics: [
      { label: 'Avg ROAS', value: '4.2x' },
      { label: 'Cost Per Lead', value: '-34%' },
    ],
  },
  {
    id: 'brand-solution',
    number: 3,
    title: 'Brand Solution',
    shortDesc: 'Brand identity, strategic positioning, guidelines, and corporate design kits.',
    fullDesc: 'Complete visual identity architecture including logo suites, typography guidelines, brand voice playbooks, and high-converting marketing collateral.',
    iconName: 'Palette',
    color: 'from-amber-600 to-amber-800',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    keyFeatures: ['Design System Kits', 'Vector Logo Suites', 'Brand Voice Guidelines', 'Corporate Pitch Decks'],
    metrics: [
      { label: 'Brand Recognition', value: '+180%' },
      { label: 'Design Tokens', value: '250+' },
    ],
  },
  {
    id: 'content-writing',
    number: 4,
    title: 'Content Writing',
    shortDesc: 'SEO-optimized articles, direct response ad copy, and technical whitepapers.',
    fullDesc: 'AI-boosted editorial content created by senior tech writers. Optimized for search intent, thought leadership, and high audience engagement.',
    iconName: 'FileText',
    color: 'from-sky-600 to-sky-800',
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    keyFeatures: ['Gemini AI Editorial', 'Technical Whitepapers', 'Ad Copywriting', 'SEO Content Clusters'],
    metrics: [
      { label: 'Organic Traffic', value: '+220%' },
      { label: 'Reader Dwell Time', value: '4m 12s' },
    ],
  },
  {
    id: 'creative-designing',
    number: 5,
    title: 'Creative Designing',
    shortDesc: 'Ad creatives, social graphics, 3D brand assets, and UI/UX prototypes.',
    fullDesc: 'High-impact visual assets engineered for social ad campaigns, landing page UI prototypes, 3D product renders, and interactive visual storyboards.',
    iconName: 'Sparkles',
    color: 'from-fuchsia-600 to-fuchsia-800',
    badgeColor: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30',
    keyFeatures: ['Figma UI Prototypes', 'Social Ad Banners', '3D Asset Renders', 'Motion Graphics'],
    metrics: [
      { label: 'CTR Lift', value: '+52%' },
      { label: 'Creative Variants', value: '500+/mo' },
    ],
  },
  {
    id: 'ai-automation',
    number: 6,
    title: 'AI Automation',
    shortDesc: 'Custom LLM workflow automation, CRM lead routing, and automated agents.',
    fullDesc: 'Intelligent automation flows connecting n8n, FastAPI, HubSpot, and Gemini 3.6 Flash. Instant lead qualification, automated proposal generation, and AI chatbots.',
    iconName: 'Bot',
    color: 'from-violet-600 to-violet-800',
    badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
    keyFeatures: ['n8n Workflow Nodes', 'FastAPI Webhook Sync', 'Gemini AI Agents', 'HubSpot / Salesforce Sync'],
    metrics: [
      { label: 'Lead Prep Time', value: '< 10s' },
      { label: 'Hours Saved/Mo', value: '140 hrs' },
    ],
  },
  {
    id: 'seo',
    number: 7,
    title: 'Search Engine Optimization',
    shortDesc: 'Technical SEO, backlink outreach, keyword clustering, and site auditing.',
    fullDesc: 'Comprehensive search engine dominance strategy combining technical site audits, automated Schema.org JSON-LD generation, and high-authority link building.',
    iconName: 'Search',
    color: 'from-rose-600 to-rose-800',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    keyFeatures: ['Core Web Vitals Audit', 'Keyword Clustering', 'Schema.org JSON-LD', 'Competitor Backlink Analysis'],
    metrics: [
      { label: '#1 Ranking Terms', value: '140+' },
      { label: 'Domain Authority', value: '68' },
    ],
  },
  {
    id: 'digital-portfolio',
    number: 8,
    title: 'Digital Portfolio',
    shortDesc: 'Interactive client showcase engine featuring live case studies and stats.',
    fullDesc: 'Showcase engine highlighting real verified client campaigns, interactive live demos, architecture blueprints, and ROI growth metrics.',
    iconName: 'FolderGit2',
    color: 'from-cyan-600 to-cyan-800',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    keyFeatures: ['Live Demo Previewer', 'Verified Client ROI', 'Case Study Exports', 'Filter by Vertical'],
    metrics: [
      { label: 'Completed Projects', value: '120+' },
      { label: 'Client Retention', value: '94%' },
    ],
  },
];

export const INITIAL_PORTFOLIO_CASES: PortfolioCaseStudy[] = [
  {
    id: 'case-1',
    title: 'Enterprise SaaS Portal Build',
    pillar: 'web-dev',
    pillarLabel: 'Web Dev & SEO',
    client: 'Apex Cloud Systems',
    description: 'Custom React & FastAPI web app yielding +220% organic traffic growth and sub-second page loads.',
    roiStats: '+220% Organic Leads | $1.4M ARR Impact',
    techStack: ['React', 'FastAPI', 'Cloud Run', 'Tailwind CSS'],
    gradient: 'from-indigo-900 to-slate-900',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    liveUrl: 'https://apexcloud.example.com',
  },
  {
    id: 'case-2',
    title: 'Automated CRM Lead Routing',
    pillar: 'ai-automation',
    pillarLabel: 'AI Automation',
    client: 'Nexus Global Logistics',
    description: 'Integrated n8n & Gemini AI webhooks reducing lead qualification time from 45 minutes to < 10 seconds.',
    roiStats: '< 10s Lead Qualification | 98% Accuracy',
    techStack: ['Gemini 3.6 Flash', 'n8n', 'HubSpot API', 'Python'],
    gradient: 'from-emerald-900 to-slate-900',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    liveUrl: 'https://nexuslogistics.example.com',
  },
  {
    id: 'case-3',
    title: 'Global Brand Identity Relaunch',
    pillar: 'brand-solution',
    pillarLabel: 'Creative & Branding',
    client: 'Vanguard FinTech',
    description: 'Full visual redesign and ad creative overhaul resulting in 4.2x ROAS across multi-channel paid social campaigns.',
    roiStats: '4.2x ROAS | +185% Click-Through Rate',
    techStack: ['Figma Design System', 'Meta Ads', '3D Blender', 'Typography Kit'],
    gradient: 'from-violet-900 to-slate-900',
    badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
    liveUrl: 'https://vanguardfintech.example.com',
  },
];

export const INITIAL_CALENDAR_POSTS: CalendarPost[] = [
  {
    id: 'post-1',
    platform: 'LinkedIn',
    content: '🚀 Enterprise Digital Transformation isn’t just about adopting cloud tools—it’s about unifying marketing operations with automated AI pipelines. Here is how EDPulse OS streamlines lead routing in < 10 seconds.',
    scheduledTime: 'Today at 02:30 PM',
    status: 'Scheduled',
    author: 'Eric Rodgers',
    hashtags: ['DigitalTransformation', 'MarketingOS', 'AIAutomation'],
  },
  {
    id: 'post-2',
    platform: 'Twitter',
    content: 'Stop losing leads to slow response times. Multi-channel attribution + Gemini AI qualification = instant 4.2x ROAS lift. 📊⚡ #GrowthMarketing #SaaS',
    scheduledTime: 'Tomorrow at 10:00 AM',
    status: 'Scheduled',
    author: 'EDPulse Bot',
    hashtags: ['GrowthMarketing', 'SaaS'],
  },
];

export const INITIAL_AD_CAMPAIGNS: AdCampaign[] = [
  {
    id: 'ad-1',
    name: 'EDPulse - AI Search Growth',
    platform: 'Google Ads',
    monthlyBudget: 3000,
    spent: 2140,
    clicks: 4280,
    conversions: 312,
    roas: 4.6,
    status: 'Active',
  },
  {
    id: 'ad-2',
    name: 'Retargeting - Enterprise Decision Makers',
    platform: 'Meta Ads',
    monthlyBudget: 1800,
    spent: 1250,
    clicks: 2910,
    conversions: 185,
    roas: 3.8,
    status: 'Active',
  },
  {
    id: 'ad-3',
    name: 'B2B Founder Lead Gen - Whitepaper',
    platform: 'LinkedIn Ads',
    monthlyBudget: 2500,
    spent: 1900,
    clicks: 1420,
    conversions: 94,
    roas: 2.9,
    status: 'Active',
  },
];

export const INITIAL_AB_TESTS: ABExperiment[] = [
  {
    id: 'ab-1',
    name: 'Hero Headline Conversion Test',
    pageUrl: 'https://edpulse.app/landing',
    variantA: {
      headline: 'EDPulse - Digital Growth OS',
      conversionRate: 3.4,
      visitors: 4200,
    },
    variantB: {
      headline: 'Automate Marketing Operations with EDPulse',
      conversionRate: 5.1,
      visitors: 4180,
    },
    status: 'Concluded',
    winner: 'B',
  },
  {
    id: 'ab-2',
    name: 'CTA Button Color & Wording Test',
    pageUrl: 'https://edpulse.app/services',
    variantA: {
      headline: 'Book a Free Audit Demo',
      conversionRate: 2.8,
      visitors: 1890,
    },
    variantB: {
      headline: 'Run Instant AI SEO Audit ->',
      conversionRate: 4.3,
      visitors: 1920,
    },
    status: 'Running',
  },
];

export const CSHARP_WPF_FILES: CSharpFile[] = [
  {
    fileName: 'MainWindow.xaml',
    language: 'xml',
    description: 'XAML view layout defining WPF Fluent Design dark window, sidebar tabs, and service cards.',
    code: `<Window x:Class="EDPulse.DesktopOS.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="EDPulse - Integrated Marketing &amp; Operating OS"
        Height="850" Width="1300"
        WindowStartupLocation="CenterScreen"
        WindowStyle="None"
        AllowsTransparency="True"
        Background="#0F172A">
    
    <Border CornerRadius="12" BorderBrush="#334155" BorderThickness="1">
        <Grid>
            <Grid.RowDefinitions>
                <RowDefinition Height="36"/> <!-- Custom TitleBar -->
                <RowDefinition Height="*"/>  <!-- Main Area -->
                <RowDefinition Height="28"/> <!-- StatusBar -->
            </Grid.RowDefinitions>

            <!-- Windows WPF Titlebar -->
            <Grid Grid.Row="0" Background="#1E293B" MouseDown="TitleBar_MouseDown">
                <StackPanel Orientation="Horizontal" VerticalAlignment="Center" Margin="12,0,0,0">
                    <Border Width="20" Height="20" CornerRadius="5" Background="#6366F1">
                        <TextBlock Text="EP" Foreground="White" FontWeight="Bold" FontSize="10" HorizontalAlignment="Center" VerticalAlignment="Center"/>
                    </Border>
                    <TextBlock Text="EDPulse OS - Windows .NET Desktop" Foreground="#F8FAFC" FontSize="12" FontWeight="SemiBold" Margin="10,0,0,0"/>
                </StackPanel>
                
                <StackPanel Orientation="Horizontal" HorizontalAlignment="Right">
                    <Button Click="Minimize_Click" Style="{StaticResource TitleBarBtnStyle}" Content="─"/>
                    <Button Click="Maximize_Click" Style="{StaticResource TitleBarBtnStyle}" Content="☐"/>
                    <Button Click="Close_Click" Style="{StaticResource TitleBarCloseBtnStyle}" Content="✕"/>
                </StackPanel>
            </Grid>

            <!-- Content Grid with WPF Navigation -->
            <Grid Grid.Row="1">
                <Grid.ColumnDefinitions>
                    <ColumnDefinition Width="240"/> <!-- Sidebar Navigation -->
                    <ColumnDefinition Width="*"/>   <!-- Active View Frame -->
                </Grid.ColumnDefinitions>

                <!-- WPF Navigation Menu -->
                <Border Grid.Column="0" Background="#0F172A" BorderBrush="#1E293B" BorderThickness="0,0,1,0">
                    <StackPanel Margin="10">
                        <TextBlock Text="SERVICES &amp; PORTFOLIO" Foreground="#64748B" FontSize="10" FontWeight="Bold" Margin="10,10,0,5"/>
                        <RadioButton Content="Service Hub (8 Pillars)" IsChecked="True" Style="{StaticResource NavRadioStyle}"/>
                        <RadioButton Content="Digital Portfolio" Style="{StaticResource NavRadioStyle}"/>
                        
                        <TextBlock Text="MARKETING SUITE" Foreground="#64748B" FontSize="10" FontWeight="Bold" Margin="10,15,0,5"/>
                        <RadioButton Content="Content Calendar" Style="{StaticResource NavRadioStyle}"/>
                        <RadioButton Content="Email Drip Builder" Style="{StaticResource NavRadioStyle}"/>
                        <RadioButton Content="Paid Ad Manager" Style="{StaticResource NavRadioStyle}"/>
                        <RadioButton Content="SEO Site Auditor" Style="{StaticResource NavRadioStyle}"/>
                    </StackPanel>
                </Border>

                <!-- View Host Frame -->
                <ScrollViewer Grid.Column="1" VerticalScrollBarVisibility="Auto" Background="#020617" Padding="20">
                    <ContentControl Content="{Binding ActiveView}"/>
                </ScrollViewer>
            </Grid>
        </Grid>
    </Border>
</Window>`,
  },
  {
    fileName: 'MainWindow.xaml.cs',
    language: 'csharp',
    description: 'C# Code-Behind handling WPF window dragging, window controls, and view model bindings.',
    code: `using System;
using System.Windows;
using System.Windows.Input;
using EDPulse.DesktopOS.ViewModels;

namespace EDPulse.DesktopOS
{
    public partial class MainWindow : Window
    {
        public MainViewModel ViewModel { get; }

        public MainWindow()
        {
            InitializeComponent();
            ViewModel = new MainViewModel();
            DataContext = ViewModel;
        }

        private void TitleBar_MouseDown(object sender, MouseButtonEventArgs e)
        {
            if (e.ChangedButton == MouseButton.Left)
                this.DragMove();
        }

        private void Minimize_Click(object sender, RoutedEventArgs e)
        {
            this.WindowState = WindowState.Minimized;
        }

        private void Maximize_Click(object sender, RoutedEventArgs e)
        {
            this.WindowState = this.WindowState == WindowState.Maximized 
                ? WindowState.Normal 
                : WindowState.Maximized;
        }

        private void Close_Click(object sender, RoutedEventArgs e)
        {
            Application.Current.Shutdown();
        }
    }
}`,
  },
  {
    fileName: 'MainViewModel.cs',
    language: 'csharp',
    description: 'C# ViewModel managing state for 8 Service Pillars, Content Calendar, and SEO Auditor.',
    code: `using System;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Runtime.CompilerServices;

namespace EDPulse.DesktopOS.ViewModels
{
    public class MainViewModel : INotifyPropertyChanged
    {
        private object _activeView;
        public object ActiveView
        {
            get => _activeView;
            set { _activeView = value; OnPropertyChanged(); }
        }

        public ObservableCollection<ServicePillarModel> Pillars { get; set; }

        public MainViewModel()
        {
            Pillars = new ObservableCollection<ServicePillarModel>
            {
                new ServicePillarModel(1, "Web Development", "Next.js & FastAPI Enterprise Web Apps", "Code"),
                new ServicePillarModel(2, "Digital Marketing", "PPC & Funnel Growth Strategy", "TrendingUp"),
                new ServicePillarModel(3, "Brand Solution", "Corporate Design Systems & Brand Kits", "Palette"),
                new ServicePillarModel(4, "Content Writing", "AI-boosted SEO Articles & Copywriting", "FileText"),
                new ServicePillarModel(5, "Creative Designing", "3D Motion Graphics & Social Creatives", "Sparkles"),
                new ServicePillarModel(6, "AI Automation", "n8n Webhook & LLM Lead Routing", "Bot"),
                new ServicePillarModel(7, "SEO Optimization", "Technical Core Web Vitals & Schema", "Search"),
                new ServicePillarModel(8, "Digital Portfolio", "Verified Client ROI & Case Studies", "FolderGit2")
            };
        }

        public event PropertyChangedEventHandler PropertyChanged;
        protected void OnPropertyChanged([CallerMemberName] string name = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
        }
    }

    public record ServicePillarModel(int Id, string Title, string Description, string IconName);
}`,
  },
  {
    fileName: 'EDPulse.DesktopOS.csproj',
    language: 'xml',
    description: 'Modern .NET 9 C# Project Configuration with WPF desktop target.',
    code: `<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>WinExe</OutputType>
    <TargetFramework>net9.0-windows</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
    <UseWPF>true</UseWPF>
    <ApplicationIcon>Assets/icon.ico</ApplicationIcon>
    <Title>EDPulse Desktop OS</Title>
    <Authors>Eric Rodgers - EDPulse Team</Authors>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="CommunityToolkit.Mvvm" Version="8.3.2" />
    <PackageReference Include="MahApps.Metro" Version="3.0.0-alpha0492" />
    <PackageReference Include="Lucide.Wpf" Version="1.0.0" />
    <PackageReference Include="Newtonsoft.Json" Version="13.0.3" />
  </ItemGroup>

</Project>`,
  },
];
