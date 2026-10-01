import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  ShieldAlert,
  Lock,
  BadgeCheck,
  UserCog,
  Send,
  ArrowLeft,
  ArrowLeftRight,
  Lightbulb,
  ArrowRight,
  MailCheck,
  X,
  ExternalLink,
  Building2,
  CheckCircle2,
  Menu
} from 'lucide-react';
import {
  selectUser,
  selectUserRole,
  selectTenant
} from '../features/userSlice';

export default function AccessDenied({
  requiredPermission = 'tenant.view',
  targetResource = 'Tenant Organizations (/tenants)',
  requiredRole = 'Super Administrator (Platform Scope)',
  policyRule = 'Policy Rule #POL-894-SEC'
}) {
  const navigate = useNavigate();
  const outletCtx = useOutletContext();
  const onToggleSidebar = outletCtx?.onToggleSidebar;

  const currentUser = useSelector(selectUser);
  const currentRole = useSelector(selectUserRole);
  const currentTenant = useSelector(selectTenant);

  const [requestSent, setRequestSent] = useState(false);
  const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  // Derived user display info
  const userName = currentUser?.name || 'Authenticated User';
  const userEmail = currentUser?.email || 'user@company.com';
  const tenantName = currentTenant?.name || 'Acme Corp Global';
  const roleDisplay = currentRole
    ? currentRole.replace('ROLE_', '').replace(/_/g, ' ')
    : 'Company Member';

  const userInitials = userName
    ? userName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : 'AU';

  const requestId = 'REQ-77291';
  const sessionId = currentUser?.userId ? `sess_${currentUser.userId.substring(0, 8)}` : 'sess_993f412_ak4';

  const handleRequestAccess = () => {
    setRequestSent(true);
  };

  const handleCopySession = () => {
    navigator.clipboard?.writeText(sessionId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto py-2 sm:py-6 flex flex-col items-center">
      {/* Background ambient radial glow */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-rose-200/40 via-slate-100/30 to-emerald-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Header / Breadcrumb Bar */}
      <div className="w-full flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          {onToggleSidebar && (
            <button
              type="button"
              onClick={onToggleSidebar}
              className="lg:hidden p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition mr-1 cursor-pointer"
              title="Open Navigation"
            >
              <Menu className="w-4 h-4" />
            </button>
          )}
          <span className="hover:text-slate-900 cursor-pointer flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            {tenantName}
          </span>
          <span className="text-slate-300">/</span>
          <span className="hover:text-slate-900 cursor-pointer">Security & Permissions</span>
          <span className="text-slate-300">/</span>
          <span className="text-rose-600 font-bold">403 Restricted</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            {policyRule}
          </span>
        </div>
      </div>

      {/* Main Hero Card */}
      <div className="w-full bg-white rounded-3xl p-6 sm:p-10 shadow-[0_20px_25px_-5px_rgba(15,23,42,0.05),0_8px_10px_-6px_rgba(15,23,42,0.03)] border border-slate-100 flex flex-col items-center text-center relative overflow-hidden">
        {/* Subtle decorative perimeter shapes */}
        <div className="absolute -right-16 -top-16 w-56 h-56 bg-slate-50 rounded-full opacity-60 pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-44 h-44 bg-rose-50/40 rounded-full opacity-50 pointer-events-none" />

        {/* Shield & Lock Visual Icon */}
        <div className="relative mb-4 group">
          <div className="w-24 h-24 rounded-3xl bg-rose-50 border border-rose-100/80 flex items-center justify-center text-rose-600 shadow-xs transition-transform duration-300 group-hover:scale-105">
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-rose-600 shadow-inner border border-rose-100/50">
              <ShieldAlert className="w-9 h-9" />
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white flex items-center justify-center text-rose-600 shadow-md border border-rose-100">
            <Lock className="w-4 h-4" />
          </div>
        </div>

        {/* Status Tag Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold mb-3 tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
          ERROR CODE 403 · FORBIDDEN
        </div>

        {/* Headline */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2 max-w-2xl">
          Access Denied: Restricted Permission Area
        </h1>

        {/* Informative Sub-copy */}
        <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mb-6 leading-relaxed">
          You don’t have the necessary role permission (<code className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[11px] font-semibold">{requiredPermission}</code>) to access {targetResource}. In our multi-tenant architecture, this resource is restricted to authorized platform operators.
        </p>

        {/* Dispatched Request Alert Notification */}
        {requestSent && (
          <div className="w-full max-w-3xl mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between gap-4 transition-all duration-300 text-left">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <MailCheck className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-slate-900">
                  Access request dispatched
                </span>
                <span className="text-[11px] sm:text-xs text-slate-600">
                  Request ID <strong className="font-mono text-emerald-800">#{requestId}</strong> logged. Notification delivered to platform administrators.
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setRequestSent(false)}
              className="p-1.5 rounded-lg hover:bg-emerald-100 text-slate-500 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Access Scope Diagnostics Grid */}
        <div className="w-full max-w-3xl bg-slate-50/80 rounded-2xl p-4 sm:p-5 mb-6 text-left border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/60">
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-4 h-4 text-[#006c49]" />
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Access Scope Diagnostics
              </span>
            </div>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-200/70 text-slate-600">
              Auth: JWT / Asymmetric RS256
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Identity Card */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-100 flex flex-col justify-between">
              <span className="text-[11px] font-semibold text-slate-400 mb-1.5">
                Authenticated Identity
              </span>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#006c49] flex items-center justify-center text-xs font-bold shrink-0">
                  {userInitials}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-slate-900 truncate">
                    {userName}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono truncate">
                    {userEmail}
                  </span>
                </div>
              </div>
            </div>

            {/* Current Role Card */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-100 flex flex-col justify-between">
              <span className="text-[11px] font-semibold text-slate-400 mb-1.5">
                Your Current Role
              </span>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserCog className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-bold text-slate-900 capitalize">
                    {roleDisplay}
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {currentTenant ? 'Tenant Scope' : 'Platform Scope'}
                </span>
              </div>
            </div>

            {/* Required Entitlement Card */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-100 flex flex-col justify-between">
              <span className="text-[11px] font-semibold text-slate-400 mb-1.5">
                Required Entitlement
              </span>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                  <span className="text-xs font-bold text-rose-600 font-mono truncate">
                    {requiredPermission}
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 shrink-0">
                  {requiredRole}
                </span>
              </div>
            </div>

            {/* Target Resource Card */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-100 flex flex-col justify-between">
              <span className="text-[11px] font-semibold text-slate-400 mb-1.5">
                Target Resource
              </span>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="text-xs font-bold text-slate-900 truncate">
                    {targetResource}
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
                  Protected
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <button
            type="button"
            onClick={handleRequestAccess}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#006c49] hover:bg-[#005236] text-white text-xs font-semibold shadow-md shadow-emerald-700/20 active:scale-95 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Request Access from Admin</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-500" />
            <span>Back to Dashboard</span>
          </button>

          <button
            type="button"
            onClick={() => setIsWorkspaceModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 text-xs font-semibold transition-colors cursor-pointer"
          >
            <ArrowLeftRight className="w-4 h-4" />
            <span>Switch Workspace</span>
          </button>
        </div>

        {/* Troubleshooting & Next Steps Cards */}
        <div className="w-full max-w-3xl flex flex-col text-left pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-4 h-4 text-[#006c49]" />
            <h2 className="text-sm font-bold text-slate-900">
              Troubleshooting & Next Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Step 01 */}
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-[#006c49] font-bold text-xs mb-2.5 shadow-xs border border-slate-100">
                  01
                </div>
                <h3 className="text-xs font-bold text-slate-900 mb-1">
                  Contact Org Admin
                </h3>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Request privilege elevation or authorization for tenant orchestration from your platform administrator.
                </p>
              </div>
              <a
                href="mailto:workflowadmin@gmail.com?subject=Permission%20Access%20Request&body=Please%20grant%20access%20to%20tenant.view"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#006c49] mt-3 hover:underline"
              >
                <span>Email Administrator</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            {/* Step 02 */}
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-[#006c49] font-bold text-xs mb-2.5 shadow-xs border border-slate-100">
                  02
                </div>
                <h3 className="text-xs font-bold text-slate-900 mb-1">
                  Verify Active Session
                </h3>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Confirm you are logged in under the expected account credentials and not a delegated sub-account.
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#006c49] mt-3 hover:underline text-left cursor-pointer"
              >
                <span>Re-authenticate Session</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Step 03 */}
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-[#006c49] font-bold text-xs mb-2.5 shadow-xs border border-slate-100">
                  03
                </div>
                <h3 className="text-xs font-bold text-slate-900 mb-1">
                  Explore Permitted Areas
                </h3>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Access your available company tools including Projects, Tasks, Team, and Workspace Analytics.
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate('/projects')}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#006c49] mt-3 hover:underline text-left cursor-pointer"
              >
                <span>View Workspace Projects</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* IAM Engine Footer Meta Bar */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2 mt-5 text-slate-400 text-[11px] px-1">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>TaskFlow Enterprise IAM Engine · RBAC v4.2.1-prod</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCopySession}
            title="Click to copy session ID"
            className="flex items-center gap-1 hover:text-slate-700 transition cursor-pointer"
          >
            <span>Session:</span>
            <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-mono text-[10px]">
              {copiedId ? 'Copied!' : sessionId}
            </code>
          </button>
          <span>Cluster: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-mono text-[10px]">prod-auth-01</code></span>
          <button
            type="button"
            onClick={() => navigate('/help')}
            className="hover:text-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Support Docs</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Workspace Switcher Modal */}
      {isWorkspaceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#006c49]" />
                <h3 className="text-base font-bold text-slate-900">Available Workspaces</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsWorkspaceModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 mb-5">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#006c49] text-white flex items-center justify-center font-bold text-xs">
                    {tenantName.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900">{tenantName}</span>
                    <span className="text-[10px] text-emerald-700 font-medium">Active Workspace</span>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                  Current
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsWorkspaceModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsWorkspaceModalOpen(false);
                  navigate('/dashboard');
                }}
                className="px-4 py-2 rounded-xl bg-[#006c49] text-white text-xs font-semibold hover:bg-[#005236] transition cursor-pointer"
              >
                Go to Workspace Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
