import React, { useState } from 'react';
import {
  Check,
  ChevronDown,
  Search,
  Bell,
  MessageSquare,
  Building2,
  Globe,
  Monitor,
  ShieldCheck,
  CreditCard,
  Users,
  Lock,
  Clock,
  Camera,
  Info,
  X,
  Menu,
  CheckCircle2
} from 'lucide-react';

export default function OrganizationSettings({ onToggleSidebar }) {
  // State for tabs
  const [activeTab, setActiveTab] = useState('company');

  // State for form fields
  const [orgName, setOrgName] = useState('Acme Corp Global');
  const [workspaceSlug, setWorkspaceSlug] = useState('acme-corp-global');
  const [adminEmail, setAdminEmail] = useState('admin@acme-corp.com');
  const [taxId, setTaxId] = useState('US-98421049-T');
  const [industry, setIndustry] = useState('Technology & Cloud SaaS');
  const [headcount, setHeadcount] = useState('101 - 250 Employees');

  // Localization state
  const [language, setLanguage] = useState('en-US');
  const [timezone, setTimezone] = useState('(GMT-05:00) Eastern Time (US & Canada)');
  const [dateFormat, setDateFormat] = useState('YYYY-MM-DD');
  const [currency, setCurrency] = useState('USD ($) - United States Dollar');
  const [use24HourTime, setUse24HourTime] = useState(true);
  const [autoTranslate, setAutoTranslate] = useState(true);
  const [firstDayOfWeek, setFirstDayOfWeek] = useState('Monday');

  // Density & audio
  const [density, setDensity] = useState('compact');
  const [audioHaptics, setAudioHaptics] = useState(true);

  // Security state
  const [inactivityTimeout, setInactivityTimeout] = useState('30 Minutes');

  // Toast state
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (title, message) => {
    setToastMessage({ title, message });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleSave = () => {
    showToast(
      'Preferences Updated',
      'Workspace settings and regional preferences saved successfully.'
    );
  };

  const handleDiscard = () => {
    setOrgName('Acme Corp Global');
    setWorkspaceSlug('acme-corp-global');
    setAdminEmail('admin@acme-corp.com');
    setTaxId('US-98421049-T');
    setIndustry('Technology & Cloud SaaS');
    setHeadcount('101 - 250 Employees');
    setLanguage('en-US');
    setTimezone('(GMT-05:00) Eastern Time (US & Canada)');
    setDateFormat('YYYY-MM-DD');
    setCurrency('USD ($) - United States Dollar');
    setUse24HourTime(true);
    setAutoTranslate(true);
    setFirstDayOfWeek('Monday');
    setDensity('compact');
    setAudioHaptics(true);
    setInactivityTimeout('30 Minutes');
    showToast('Changes Discarded', 'Restored default workspace settings.');
  };

  const subTabs = [
    { id: 'company', label: 'Company Profile & Info', icon: Building2 },
    { id: 'localization', label: 'Language & Regional', icon: Globe, hasDot: true },
    { id: 'display', label: 'Preferences & Display', icon: Monitor },
    { id: 'security', label: 'Security & 2FA', icon: ShieldCheck },
    { id: 'notifications', label: 'Notifications & Alerts', icon: Bell },
    { id: 'billing', label: 'Billing & Plans', icon: CreditCard }
  ];

  return (
    <div className="space-y-7 relative pb-8 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* 1. Top Bar Header */}
      <header className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex flex-wrap items-center gap-3.5 flex-1 min-w-0">
          <button
            type="button"
            onClick={onToggleSidebar}
            aria-label="Open sidebar menu"
            className="lg:hidden p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Org Switcher */}
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-slate-200/90 bg-white shadow-2xs cursor-pointer hover:border-slate-300 transition shrink-0">
            <div className="w-7 h-7 rounded-lg bg-teal-500 text-white font-bold text-xs flex items-center justify-center tracking-tight">
              AC
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1">
                <span className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight leading-none">
                  Acme Corp Global
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <span className="text-[10px] font-extrabold text-[#00c875] tracking-wider leading-none mt-1 uppercase">
                Enterprise Tier
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search settings, preferences, team..."
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200/90 bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 shadow-2xs focus:outline-hidden focus:border-[#00c875] focus:ring-2 focus:ring-[#00c875]/15 transition"
            />
          </div>

          {/* Status Pill */}
          <div className="hidden xl:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-200/60 bg-emerald-50 text-xs font-semibold text-emerald-700 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Enterprise Cloud Active</span>
          </div>
        </div>

        {/* Right Actions & User Avatar */}
        <div className="flex items-center justify-end gap-3 shrink-0">
          <button
            type="button"
            aria-label="Notifications"
            onClick={() => showToast('Notifications', 'No pending settings alerts.')}
            className="relative w-9 h-9 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-slate-600 hover:text-slate-900 shadow-2xs hover:bg-slate-50 transition cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#00c875] ring-2 ring-white" />
          </button>

          <button
            type="button"
            aria-label="Messages"
            onClick={() => showToast('Team Messages', 'Opened enterprise message channels.')}
            className="w-9 h-9 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-slate-600 hover:text-slate-900 shadow-2xs hover:bg-slate-50 transition cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
          </button>

          <div className="h-6 w-px bg-slate-200 mx-0.5" />

          <div className="flex items-center gap-2.5 pl-1">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#00c875] to-emerald-400 text-white font-bold text-xs flex items-center justify-center shadow-xs ring-2 ring-white">
              SG
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">
                Sarah Green
              </div>
              <div className="text-[11px] text-slate-400 leading-tight mt-0.5">
                sarah@company.com
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Page Title & Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Organization Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage global enterprise configuration, multi-region localizations, and corporate workspace preferences.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleDiscard}
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-semibold shadow-2xs transition cursor-pointer active:scale-98"
          >
            Discard Changes
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-[#00c875] hover:bg-[#00b368] active:bg-[#009e5c] text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-500/20 transition cursor-pointer flex items-center gap-1.5 active:scale-98"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* 3. Sub-Navigation Tabs Rail */}
      <div className="border-b border-slate-200/90 pb-3 overflow-x-auto scrollbar-none">
        <nav className="flex items-center gap-2 text-xs font-medium">
          {subTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200/70 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 font-medium'
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? 'text-emerald-600' : 'text-slate-400'
                  }`}
                />
                <span>{tab.label}</span>
                {tab.hasDot && (
                  <span className="w-2 h-2 rounded-full bg-[#00c875]" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* 4. Quick Summary Metric Highlights (4 Cards) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Subscription Tier
            </p>
            <p className="text-base font-bold text-slate-800 mt-0.5">
              Enterprise Global
            </p>
            <span className="text-[11px] font-medium text-[#00c875]">
              Renews Oct 2027
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#00c875] flex items-center justify-center border border-emerald-100">
            <CheckCircle2 className="w-5 h-5 stroke-[2.2]" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Assigned Seats
            </p>
            <p className="text-base font-bold text-slate-800 mt-0.5">
              58 <span className="text-xs text-slate-400 font-normal">/ 100 Seats</span>
            </p>
            <span className="text-[11px] font-medium text-slate-500">
              42 seats remaining
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
            <Users className="w-5 h-5 stroke-[2.2]" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Security Standard
            </p>
            <p className="text-base font-bold text-slate-800 mt-0.5">
              RBAC 2.1 Enforced
            </p>
            <span className="text-[11px] font-medium text-emerald-600">
              Hardware 2FA Active
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
            <Lock className="w-5 h-5 stroke-[2.2]" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Primary Region
            </p>
            <p className="text-base font-bold text-slate-800 mt-0.5">
              US-East (N. Virginia)
            </p>
            <span className="text-[11px] font-medium text-slate-500">
              Latency: 24ms
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
            <Globe className="w-5 h-5 stroke-[2.2]" />
          </div>
        </div>
      </section>

      {/* 5. Main Settings Cards Body */}
      <div className="space-y-8">
        {/* SECTION 1: Workspace & Company Profile */}
        {(activeTab === 'company' || activeTab === 'all') && (
          <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 md:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Workspace &amp; Company Profile
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Customize your organization identity, branded workspace slug, and registered tax contact.
                </p>
              </div>
              <span className="px-2.5 py-1 text-[11px] font-semibold bg-slate-100 text-slate-700 rounded-lg">
                Verified Org
              </span>
            </div>

            {/* Avatar Uploader Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative group">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-teal-500 to-[#00c875] text-white flex items-center justify-center font-bold text-2xl shadow-md ring-4 ring-slate-50">
                  AC
                </div>
                <button
                  type="button"
                  onClick={() => showToast('Avatar Upload', 'Photo picker dialog opened.')}
                  className="absolute -bottom-1 -right-1 bg-white border border-slate-200 rounded-lg p-1.5 text-slate-600 hover:text-[#00c875] shadow-sm transition cursor-pointer"
                  title="Change Workspace Avatar"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => showToast('Upload New Icon', 'Select a PNG, SVG, or JPG up to 2MB.')}
                    className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-xs transition cursor-pointer"
                  >
                    Upload New Icon
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast('Icon Removed', 'Default organization avatar applied.')}
                    className="px-3 py-1.5 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium rounded-xl transition cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
                <p className="text-[11px] text-slate-400">
                  Recommended size: 512×512px. PNG, SVG, or JPG (max. 2MB).
                </p>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Organization Legal Name
                </label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c875]/20 focus:border-[#00c875] transition text-slate-800 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  TaskFlow Workspace URL
                </label>
                <div className="flex items-center">
                  <span className="inline-flex items-center px-3 py-2 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-slate-500 text-xs font-mono">
                    taskflow.io/
                  </span>
                  <input
                    type="text"
                    value={workspaceSlug}
                    onChange={(e) => setWorkspaceSlug(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-r-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c875]/20 focus:border-[#00c875] transition text-slate-800 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Primary Administrative Email
                </label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c875]/20 focus:border-[#00c875] transition text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Tax Identification / VAT Number
                </label>
                <input
                  type="text"
                  value={taxId}
                  onChange={(e) => setTaxId(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c875]/20 focus:border-[#00c875] transition text-slate-800 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Industry Sector
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c875]/20 focus:border-[#00c875] transition text-slate-800"
                >
                  <option>Technology &amp; Cloud SaaS</option>
                  <option>Financial Services &amp; Banking</option>
                  <option>Healthcare &amp; Life Sciences</option>
                  <option>E-commerce &amp; Logistics</option>
                  <option>Digital Media &amp; Design</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Estimated Organization Headcount
                </label>
                <select
                  value={headcount}
                  onChange={(e) => setHeadcount(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c875]/20 focus:border-[#00c875] transition text-slate-800"
                >
                  <option>1 - 25 Employees</option>
                  <option>26 - 100 Employees</option>
                  <option>101 - 250 Employees</option>
                  <option>251 - 1000 Employees</option>
                  <option>1000+ Enterprise</option>
                </select>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 2: Language, Locale & Regional Preferences */}
        {(activeTab === 'localization' || activeTab === 'all') && (
          <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 md:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900">
                    Language, Locale &amp; Regional Preferences
                  </h2>
                  <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-200/60">
                    Customizable per User
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Control preferred language syntax, date formatting, time zones, and currency presentation across all boards.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                  <span>Default Interface Language</span>
                  <span className="text-[11px] font-normal text-slate-400">
                    Auto-detects browser locale
                  </span>
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c875]/20 focus:border-[#00c875] transition text-slate-800"
                >
                  <option value="en-US">English (United States) - en-US</option>
                  <option value="en-GB">English (United Kingdom) - en-GB</option>
                  <option value="es-ES">Español (España) - es-ES</option>
                  <option value="fr-FR">Français (France) - fr-FR</option>
                  <option value="de-DE">Deutsch (Deutschland) - de-DE</option>
                  <option value="ja-JP">日本語 (Japan) - ja-JP</option>
                  <option value="pt-BR">Português (Brasil) - pt-BR</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                  <span>Default Workspace Timezone</span>
                  <span className="text-[11px] font-normal text-emerald-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> GMT-5 Synced
                  </span>
                </label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c875]/20 focus:border-[#00c875] transition text-slate-800"
                >
                  <option>(GMT-05:00) Eastern Time (US &amp; Canada)</option>
                  <option>(GMT-08:00) Pacific Time (US &amp; Canada)</option>
                  <option>(GMT+00:00) Greenwich Mean Time (London, Dublin)</option>
                  <option>(GMT+01:00) Central European Time (Berlin, Paris)</option>
                  <option>(GMT+05:30) India Standard Time (Kolkata, New Delhi)</option>
                  <option>(GMT+09:00) Japan Standard Time (Tokyo)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Date Display Format
                </label>
                <select
                  value={dateFormat}
                  onChange={(e) => setDateFormat(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c875]/20 focus:border-[#00c875] transition text-slate-800 font-mono"
                >
                  <option value="YYYY-MM-DD">YYYY-MM-DD (e.g. 2026-09-21)</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY (e.g. 21/09/2026)</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY (e.g. 09/21/2026)</option>
                  <option value="DD MMM YYYY">DD MMM YYYY (e.g. 21 Sep 2026)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Billing &amp; Project Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c875]/20 focus:border-[#00c875] transition text-slate-800 font-medium"
                >
                  <option>USD ($) - United States Dollar</option>
                  <option>EUR (€) - European Euro</option>
                  <option>GBP (£) - British Pound</option>
                  <option>JPY (¥) - Japanese Yen</option>
                  <option>CAD ($) - Canadian Dollar</option>
                  <option>AUD ($) - Australian Dollar</option>
                </select>
              </div>
            </div>

            {/* Multi-language & Clock Toggles */}
            <div className="pt-2 border-t border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-800">
                    Use 24-Hour Military Time
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Display timestamp as 14:30 instead of 02:30 PM across Gantt and time tracking logs.
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={use24HourTime}
                  onClick={() => setUse24HourTime(!use24HourTime)}
                  className={`relative inline-flex h-5.5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                    use24HourTime ? 'bg-[#00c875]' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      use24HourTime ? 'translate-x-4.5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-800">
                    Automatic Multilingual Team Translation
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Allow team comments and task descriptions to show in-line translation chips for non-native speakers.
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={autoTranslate}
                  onClick={() => setAutoTranslate(!autoTranslate)}
                  className={`relative inline-flex h-5.5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                    autoTranslate ? 'bg-[#00c875]' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      autoTranslate ? 'translate-x-4.5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-800">
                    Calendar First Day of Week
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Configure whether team sprints and calendar widgets begin on Monday or Sunday.
                  </p>
                </div>
                <div className="inline-flex rounded-xl p-0.5 bg-slate-100 border border-slate-200 text-xs">
                  <button
                    type="button"
                    onClick={() => setFirstDayOfWeek('Sunday')}
                    className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer ${
                      firstDayOfWeek === 'Sunday'
                        ? 'font-semibold bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Sunday
                  </button>
                  <button
                    type="button"
                    onClick={() => setFirstDayOfWeek('Monday')}
                    className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer ${
                      firstDayOfWeek === 'Monday'
                        ? 'font-semibold bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Monday
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 3: Workspace Display & Density */}
        {(activeTab === 'display' || activeTab === 'all') && (
          <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 md:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-base font-bold text-slate-900">
                Workspace Display &amp; Density
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Configure UI compactness, default views, and workflow sound alerts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Density Option 1 */}
              <div
                onClick={() => setDensity('compact')}
                className={`relative flex flex-col p-4 rounded-xl cursor-pointer transition ${
                  density === 'compact'
                    ? 'border-2 border-[#00c875] bg-emerald-50/20'
                    : 'border border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-900">
                    Compact Density
                  </span>
                  <span
                    className={`w-4 h-4 rounded-full border-4 flex items-center justify-center ${
                      density === 'compact'
                        ? 'border-[#00c875] bg-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  Tight row heights for maximum information per screen. Ideal for power users.
                </p>
              </div>

              {/* Density Option 2 */}
              <div
                onClick={() => setDensity('comfortable')}
                className={`relative flex flex-col p-4 rounded-xl cursor-pointer transition ${
                  density === 'comfortable'
                    ? 'border-2 border-[#00c875] bg-emerald-50/20'
                    : 'border border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-800">
                    Comfortable
                  </span>
                  <span
                    className={`w-4 h-4 rounded-full border-4 flex items-center justify-center ${
                      density === 'comfortable'
                        ? 'border-[#00c875] bg-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  Standard balanced line height with generous touch and click padding.
                </p>
              </div>

              {/* Density Option 3 */}
              <div
                onClick={() => setDensity('spacious')}
                className={`relative flex flex-col p-4 rounded-xl cursor-pointer transition ${
                  density === 'spacious'
                    ? 'border-2 border-[#00c875] bg-emerald-50/20'
                    : 'border border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-800">
                    Spacious Presentation
                  </span>
                  <span
                    className={`w-4 h-4 rounded-full border-4 flex items-center justify-center ${
                      density === 'spacious'
                        ? 'border-[#00c875] bg-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  Large font and wide spacing suitable for team presentations or tablets.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-800">
                  Audio Haptic Notifications
                </p>
                <p className="text-[11px] text-slate-500">
                  Play pleasant micro-tones when tasks are marked complete or approvals resolved.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={audioHaptics}
                onClick={() => setAudioHaptics(!audioHaptics)}
                className={`relative inline-flex h-5.5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  audioHaptics ? 'bg-[#00c875]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    audioHaptics ? 'translate-x-4.5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </section>
        )}

        {/* SECTION 4: Security Policies & Authentication */}
        {(activeTab === 'security' || activeTab === 'all') && (
          <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 md:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Security Policies &amp; Authentication
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Enforce enterprise access restrictions, session length, and 2FA mandates.
                </p>
              </div>
              <span className="px-2.5 py-1 text-[11px] font-bold bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200">
                Enforced 2FA
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/60">
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100/70 text-emerald-700 flex items-center justify-center">
                    <Lock className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      Mandatory Two-Factor Authentication (2FA)
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Requires all 58 members in Acme Corp to verify via Authenticator App or FIDO2 Security Key.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-600 bg-white px-3 py-1 rounded-lg border border-emerald-200">
                  Enforced
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-200/80">
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                    <Clock className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      Automatic Inactivity Timeout
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Sign out dormant sessions after period of inactivity for compliance.
                    </p>
                  </div>
                </div>
                <select
                  value={inactivityTimeout}
                  onChange={(e) => setInactivityTimeout(e.target.value)}
                  className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 font-medium focus:ring-[#00c875]"
                >
                  <option>15 Minutes</option>
                  <option>30 Minutes</option>
                  <option>2 Hours</option>
                  <option>8 Hours</option>
                </select>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* 6. Sticky Save Bar / Footer Confirmation */}
      <div className="sticky bottom-4 p-4 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 z-10">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Info className="w-4 h-4 text-[#00c875] shrink-0" />
          <span>All changes auto-saved to cloud draft. Click Save to publish changes globally.</span>
        </div>
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <button
            type="button"
            onClick={handleDiscard}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition cursor-pointer"
          >
            Reset Defaults
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 text-xs font-bold bg-[#00c875] hover:bg-[#00b368] active:bg-[#009e5c] text-white rounded-xl shadow-sm shadow-emerald-500/20 transition cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-white border border-emerald-200 rounded-2xl p-4 shadow-xl flex items-center gap-3 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <Check className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">{toastMessage.title}</p>
            <p className="text-[11px] text-slate-500">{toastMessage.message}</p>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
