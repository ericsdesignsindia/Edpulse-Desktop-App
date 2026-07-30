import React, { useState } from 'react';
import { DesktopHeader } from './components/DesktopHeader';
import { SidebarNav } from './components/SidebarNav';
import { StatusBar } from './components/StatusBar';
import { ServiceHubPillars } from './components/pillars/ServiceHubPillars';
import { DigitalPortfolioView } from './components/marketing/DigitalPortfolioView';
import { ContentCalendarView } from './components/marketing/ContentCalendarView';
import { EmailDripBuilderView } from './components/marketing/EmailDripBuilderView';
import { PaidAdManagerView } from './components/marketing/PaidAdManagerView';
import { TrafficAnalyticsView } from './components/marketing/TrafficAnalyticsView';
import { SeoAuditorView } from './components/marketing/SeoAuditorView';
import { ABTestingView } from './components/marketing/ABTestingView';
import { CrmPermissionsView } from './components/system/CrmPermissionsView';
import { CSharpWpfStudioView } from './components/developer/CSharpWpfStudioView';
import { UserRole } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [currentRole, setCurrentRole] = useState<UserRole>('Admin');

  return (
    <div className="bg-slate-950 text-slate-100 font-sans antialiased h-screen flex flex-col overflow-hidden select-none">
      {/* Windows 11 Native WPF TitleBar & Control Header */}
      <DesktopHeader
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        onOpenCodeStudio={() => setActiveTab('csharp-studio')}
        activeTab={activeTab}
      />

      {/* Main WPF Window Body Grid */}
      <div className="flex-1 flex overflow-hidden">
        {/* WPF Acrylic Sidebar Navigation */}
        <SidebarNav
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          currentRole={currentRole}
        />

        {/* Scrollable View Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-950/90 text-slate-100">
          {activeTab === 'dashboard' && (
            <ServiceHubPillars onNavigateToTab={setActiveTab} />
          )}
          {activeTab === 'portfolio' && <DigitalPortfolioView />}
          {activeTab === 'calendar' && <ContentCalendarView />}
          {activeTab === 'email-builder' && <EmailDripBuilderView />}
          {activeTab === 'ad-manager' && <PaidAdManagerView />}
          {activeTab === 'traffic-reports' && <TrafficAnalyticsView />}
          {activeTab === 'seo-auditor' && <SeoAuditorView />}
          {activeTab === 'ab-testing' && <ABTestingView />}
          {activeTab === 'crm-permissions' && (
            <CrmPermissionsView
              currentRole={currentRole}
              onRoleChange={setCurrentRole}
            />
          )}
          {activeTab === 'csharp-studio' && <CSharpWpfStudioView />}
        </main>
      </div>

      {/* Windows OS Bottom Status Bar */}
      <StatusBar />
    </div>
  );
}
