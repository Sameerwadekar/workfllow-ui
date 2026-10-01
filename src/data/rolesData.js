export const ROLES_DATA = {
  workspace: {
    name: 'Acme Corp Global',
    tier: 'ENTERPRISE TIER',
    initials: 'AC',
    activeRolesCount: 8,
    totalUsersCount: 142
  },

  currentUser: {
    name: 'Sarah Green',
    email: 'sarah@company.com',
    initials: 'SG',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    hasUnreadNotifications: true,
    hasUnreadMessages: false
  },

  stats: [
    {
      id: 'total-roles',
      title: 'TOTAL ROLES',
      value: '8',
      pill: 'Configured',
      pillType: 'emerald',
      subtext: '5 Default • 3 Custom Defined',
      iconType: 'user-check',
      accentColor: '#00c875' // emerald/teal
    },
    {
      id: 'granular-capabilities',
      title: 'GRANULAR CAPABILITIES',
      value: '36',
      pill: 'Permissions',
      pillType: 'teal',
      subtext: 'Across 4 core resource scopes',
      iconType: 'shield-check',
      accentColor: '#00c875' // emerald/teal
    },
    {
      id: 'assigned-members',
      title: 'ASSIGNED MEMBERS',
      value: '58',
      pill: '+14% MoM',
      pillType: 'emerald',
      subtext: '100% covered under security policies',
      iconType: 'users',
      accentColor: '#6366f1' // indigo
    },
    {
      id: 'security-policy',
      title: 'SECURITY POLICY',
      value: 'Enforced 2FA',
      pill: 'RBAC 2.1',
      pillType: 'emerald',
      subtext: 'Zero Unassigned Seats detected',
      iconType: 'lock',
      accentColor: '#f59e0b' // amber
    }
  ],

  categories: [
    'All Roles',
    'Administration',
    'Engineering',
    'Design & Product',
    'Finance'
  ],

  roles: [
    {
      id: 'super-admin',
      name: 'Super Admin',
      badge: 'System Default',
      badgeType: 'purple',
      slug: '#role-superadmin',
      category: 'Administration',
      iconType: 'shield',
      iconBg: 'bg-purple-100/70 text-purple-600 border border-purple-200/50',
      description: 'Full unconstrained access to all company workspaces, billing, and member access controls.',
      assignedUsers: [
        { initials: 'AC', name: 'Alex Carter', color: 'bg-teal-600 text-white' },
        { initials: 'SG', name: 'Sarah Green', color: 'bg-emerald-600 text-white' },
        { overflow: '+2' }
      ],
      keyPermissions: [
        { code: 'all:*', type: 'highlight' },
        { code: 'bypass:2fa', type: 'neutral' },
        { code: 'manage:billing', type: 'neutral' }
      ],
      status: 'Active'
    },
    {
      id: 'product-manager',
      name: 'Product Manager',
      badge: 'Custom',
      badgeType: 'blue',
      slug: '#role-pm',
      category: 'Design & Product',
      iconType: 'zap',
      iconBg: 'bg-emerald-100/70 text-emerald-600 border border-emerald-200/50',
      description: 'Manages sprint milestones, task backlogs, project roadmaps, and cross-team dependencies.',
      assignedUsers: [
        { initials: 'DK', name: 'David Kim', color: 'bg-amber-600 text-white' },
        { initials: 'EC', name: 'Emily Chen', color: 'bg-teal-600 text-white' },
        { overflow: '+14' }
      ],
      keyPermissions: [
        { code: 'project:create', type: 'neutral' },
        { code: 'sprint:edit', type: 'neutral' },
        { code: 'task:assign', type: 'neutral' }
      ],
      status: 'Active'
    },
    {
      id: 'lead-developer',
      name: 'Lead Developer',
      badge: 'Custom',
      badgeType: 'blue',
      slug: '#role-dev-lead',
      category: 'Engineering',
      iconType: 'code',
      iconBg: 'bg-blue-100/70 text-blue-600 border border-blue-200/50',
      description: 'Full control over code repositories, deployment pipelines, test environments, and branch locks.',
      assignedUsers: [
        { initials: 'CJ', name: 'Chris Johnson', color: 'bg-teal-600 text-white' },
        { initials: 'LE', name: 'Lee Evans', color: 'bg-indigo-600 text-white' },
        { overflow: '+21' }
      ],
      keyPermissions: [
        { code: 'repo:write', type: 'neutral' },
        { code: 'deploy:staging', type: 'neutral' },
        { code: 'deploy:prod', type: 'neutral' }
      ],
      status: 'Active'
    },
    {
      id: 'ux-ui-designer',
      name: 'UX/UI Designer',
      badge: 'Custom',
      badgeType: 'blue',
      slug: '#role-design',
      category: 'Design & Product',
      iconType: 'pen-tool',
      iconBg: 'bg-rose-100/70 text-rose-600 border border-rose-200/50',
      description: 'Manages design tokens, brand specs, wireframes, and creative asset libraries.',
      assignedUsers: [
        { initials: 'LL', name: 'Lisa Lee', color: 'bg-pink-600 text-white' },
        { initials: 'BO', name: 'Brown Oliver', color: 'bg-rose-600 text-white' },
        { overflow: '+8' }
      ],
      keyPermissions: [
        { code: 'assets:upload', type: 'neutral' },
        { code: 'assets:export', type: 'neutral' },
        { code: 'figma:sync', type: 'neutral' }
      ],
      status: 'Active'
    },
    {
      id: 'external-auditor',
      name: 'External Auditor',
      badge: 'Read-Only',
      badgeType: 'amber',
      slug: '#role-audit',
      category: 'Finance',
      iconType: 'eye',
      iconBg: 'bg-amber-100/70 text-amber-600 border border-amber-200/50',
      description: 'Compliance and financial reporting view access with export restrictions.',
      assignedUsers: [
        { initials: 'EA', name: 'External Auditor', color: 'bg-slate-700 text-white' }
      ],
      keyPermissions: [
        { code: 'view:logs', type: 'neutral' },
        { code: 'view:analytics', type: 'neutral' },
        { code: 'no:write', type: 'danger' }
      ],
      status: 'Active'
    },
    {
      id: 'security-officer',
      name: 'Security Officer',
      badge: 'System Default',
      badgeType: 'purple',
      slug: '#role-sec-ops',
      category: 'Administration',
      iconType: 'lock',
      iconBg: 'bg-purple-100/70 text-purple-600 border border-purple-200/50',
      description: 'Manages enterprise key rotations, zero-trust perimeter configurations, and threat alerts.',
      assignedUsers: [
        { initials: 'SG', name: 'Sarah Green', color: 'bg-emerald-600 text-white' },
        { initials: 'MW', name: 'Mark Wayne', color: 'bg-slate-800 text-white' }
      ],
      keyPermissions: [
        { code: 'audit:read', type: 'neutral' },
        { code: 'keys:rotate', type: 'highlight' },
        { code: 'ip:allowlist', type: 'neutral' }
      ],
      status: 'Active'
    },
    {
      id: 'billing-admin',
      name: 'Billing Administrator',
      badge: 'Custom',
      badgeType: 'blue',
      slug: '#role-billing',
      category: 'Finance',
      iconType: 'file-spreadsheet',
      iconBg: 'bg-emerald-100/70 text-emerald-600 border border-emerald-200/50',
      description: 'Oversees financial settlements, invoices, payment processor hooks, and subscription seats.',
      assignedUsers: [
        { initials: 'FR', name: 'Finance Rep', color: 'bg-emerald-700 text-white' },
        { overflow: '+3' }
      ],
      keyPermissions: [
        { code: 'invoices:read', type: 'neutral' },
        { code: 'payment:process', type: 'neutral' },
        { code: 'tax:export', type: 'neutral' }
      ],
      status: 'Active'
    },
    {
      id: 'guest-contractor',
      name: 'Contractor (Legacy)',
      badge: 'Custom',
      badgeType: 'blue',
      slug: '#role-contractor-guest',
      category: 'Engineering',
      iconType: 'code',
      iconBg: 'bg-slate-100 text-slate-500 border border-slate-200',
      description: 'Archived temporary access account for outside contractors and external partners.',
      assignedUsers: [
        { initials: 'CT', name: 'Contractor', color: 'bg-slate-500 text-white' }
      ],
      keyPermissions: [
        { code: 'repo:read', type: 'neutral' },
        { code: 'pr:create', type: 'neutral' },
        { code: 'no:deploy', type: 'danger' }
      ],
      status: 'Inactive'
    }
  ]
};

export default ROLES_DATA;
