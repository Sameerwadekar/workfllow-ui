import {
  LayoutGrid,
  Folder,
  CheckCircle2,
  Calendar,
  BarChart3,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  Sun,
  Moon
} from 'lucide-react';

/**
 * Industry-standard modular navigation configuration.
 * Supports groups, badges, role-based access (RBAC), and custom action types.
 */
export const NAVIGATION_CONFIG = {
  // Primary Navigation Group
  main: [
    {
      id: 'overview',
      label: 'Overview',
      path: '/overview',
      icon: LayoutGrid,
      badge: null,
      description: 'Main dashboard and performance analytics'
    },
    {
      id: 'projects',
      label: 'Projects',
      path: '/projects',
      icon: Folder,
      badge: null,
      description: 'Manage and organize team projects'
    },
    {
      id: 'tasks',
      label: 'Tasks',
      path: '/tasks',
      icon: CheckCircle2,
      badge: null,
      description: 'Track ongoing tasks and deliverables'
    },
    {
      id: 'calendar',
      label: 'Calendar',
      path: '/calendar',
      icon: Calendar,
      badge: null,
      description: 'Schedules, sprints, and team milestones'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      path: '/analytics',
      icon: BarChart3,
      badge: null,
      description: 'Deep performance reporting and KPIs'
    },
    {
      id: 'team',
      label: 'Team',
      path: '/team',
      icon: Users,
      badge: null,
      description: 'Team members, roles, and permissions'
    }
  ],

  // Bottom / Utility Navigation Group
  footer: [
    {
      id: 'theme-toggle',
      type: 'toggle',
      label: 'Light Mode',
      icon: Sun,
      altIcon: Moon,
      description: 'Switch between light and dark workspace themes'
    },
    {
      id: 'settings',
      type: 'link',
      label: 'Settings',
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
  ]
};

export default NAVIGATION_CONFIG;
