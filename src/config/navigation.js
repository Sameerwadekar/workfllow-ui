import {
  LayoutGrid,
  Building2,
  Network,
  Folder,
  CheckCircle2,
  Calendar,
  BarChart3,
  Lock,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';

export const NAVIGATION_CONFIG = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    permission: 'dashboard.view',
    path: '/dashboard',
    icon: LayoutGrid,
    description: 'Main metrics, KPIs, and overview'
  },
  {
    id: 'tenants',
    label: 'Tenants',
    permission: 'tenant.view',
    path: '/tenants',
    icon: Building2,
    badge: null,
    description: 'Multi-tenant organization provisioning and administration'
  },
  {
    id: 'departments',
    label: 'Departments',
    permission: 'department.view',
    path: '/departments',
    icon: Network,
    badge: null,
    description: 'Manage company departments, divisions, and operational teams'
  },
  {
    id: 'projects',
    label: 'Projects',
    permission: 'project.view',
    path: '/projects',
    icon: Folder,
    badge: 28,
    description: 'Manage and track team projects',
    children: [
      {
        id: 'projects-all',
        label: 'All Projects',
        permission: 'project.view',
        path: '/projects',
        count: 28
      },
      {
        id: 'projects-my',
        label: 'My Projects',
        permission: 'project.view',
        path: '/projects/my',
        count: 12
      },
      {
        id: 'projects-team',
        label: 'Team Projects',
        permission: 'project.view',
        path: '/projects/team',
        count: 8
      },
      {
        id: 'projects-create',
        label: 'Create Project',
        permission: 'project.create',
        path: '/projects/create',
        isAction: true,
        actionLabel: '+ New Project'
      }
    ]
  },
  {
    id: 'tasks',
    label: 'Tasks',
    permission: 'task.view',
    path: '/tasks',
    icon: CheckCircle2,
    badge: 18,
    description: 'Track ongoing tasks and deliverables',
    children: [
      {
        id: 'tasks-all',
        label: 'All Tasks',
        permission: 'task.view',
        path: '/tasks',
        count: 18
      },
      {
        id: 'tasks-my',
        label: 'My Tasks',
        permission: 'task.view',
        path: '/tasks/my',
        count: 7
      }
    ]
  },
  {
    id: 'calendar',
    label: 'Calendar',
    permission: 'calendar.view',
    path: '/calendar',
    icon: Calendar,
    description: 'Schedules, sprints, and team milestones'
  },
  {
    id: 'analytics',
    label: 'Analytics',
    permission: 'analytics.view',
    path: '/analytics',
    icon: BarChart3,
    description: 'Deep performance reporting and KPIs'
  },
  {
    id: 'roles-access',
    label: 'Roles & Access',
    permission: 'role.view',
    path: '/roles-access',
    icon: Lock,
    description: 'Role-based access controls and permissions matrix'
  },
  {
    id: 'reports',
    label: 'Reports',
    permission: 'report.view',
    path: '/reports',
    icon: BarChart3,
    description: 'Executive summaries and exported datasets'
  }
];

export const FOOTER_NAVIGATION = [
  {
    id: 'settings',
    type: 'link',
    label: 'Settings',
    permission: 'settings.view',
    path: '/settings',
    icon: Settings,
    description: 'Account and application preferences'
  },
  {
    id: 'help',
    type: 'link',
    label: 'Help',
    path: '/help',
    icon: HelpCircle,
    description: 'Support center and documentation'
  },
  {
    id: 'logout',
    type: 'action',
    label: 'Logout',
    icon: LogOut,
    variant: 'danger',
    description: 'End session securely'
  }
];

export function filterNavigation(items, userPermissions = []) {
  if (!Array.isArray(items)) return [];
  const permSet = new Set(userPermissions);

  const hasPerm = (perm) => {
    if (!perm) return true;
    return permSet.has(perm);
  };

  return items
    .map((item) => {
      if (item.children && Array.isArray(item.children)) {
        if (!hasPerm(item.permission)) {
          return null;
        }

        const filteredChildren = item.children.filter((child) => hasPerm(child.permission));
        if (filteredChildren.length > 0) {
          return {
            ...item,
            children: filteredChildren
          };
        }
        return null;
      }
      if (hasPerm(item.permission)) {
        return item;
      }
      return null;
    })
    .filter(Boolean);
}

export default NAVIGATION_CONFIG;
