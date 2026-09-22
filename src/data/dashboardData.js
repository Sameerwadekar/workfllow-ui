export const DASHBOARD_DATA = {
  user: {
    name: 'Sarah Green',
    email: 'sarah@company.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    role: 'Product Lead',
    hasUnreadNotifications: true,
    hasUnreadMessages: false
  },

  metrics: [
    {
      id: 'active-projects',
      title: 'Active Projects',
      value: 32,
      badgeText: '+12% this month',
      badgeType: 'positive',
      iconType: 'folder',
      color: 'emerald'
    },
    {
      id: 'completed-tasks',
      title: 'Completed Tasks',
      value: 627,
      badgeText: '+18% this month',
      badgeType: 'positive',
      iconType: 'check',
      color: 'emerald'
    },
    {
      id: 'team-members',
      title: 'Team Members',
      value: 58,
      avatars: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80'
      ],
      iconType: 'users',
      color: 'cyan'
    },
    {
      id: 'deadlines',
      title: 'Deadlines',
      value: 15,
      subtext: '2 upcoming this week',
      badgeType: 'neutral',
      iconType: 'calendar',
      color: 'amber'
    }
  ],

  analyticsOverview: {
    title: 'Analytics Overview',
    subtitle: 'Weekly performance metrics',
    yAxis: [100, 80, 60, 40, 20, 0],
    data: [
      { day: 'Sat', bar: 70, wave: 65, dot: false },
      { day: 'Sun', bar: 80, wave: 78, dot: true },
      { day: 'Mon', bar: 50, wave: 62, dot: true },
      { day: 'Tue', bar: 85, wave: 85, dot: false },
      { day: 'Wed', bar: 40, wave: 90, dot: true },
      { day: 'Thu', bar: 50, wave: 80, dot: true },
      { day: 'Fri', bar: 60, wave: 65, dot: false }
    ]
  },

  teamCollaboration: [
    {
      id: 1,
      name: 'Alexa Carter',
      activity: 'Updated design sy...',
      time: '2h ago',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
    },
    {
      id: 2,
      name: 'Chris Johnson',
      activity: 'Reviewed pull requ...',
      time: '4h ago',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
    },
    {
      id: 3,
      name: 'David Kim',
      activity: 'Working on authen...',
      time: '5h ago',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80'
    },
    {
      id: 4,
      name: 'Emily Chen',
      activity: 'Created new wirefr...',
      time: '6h ago',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80'
    }
  ],

  recentActivity: [
    {
      id: 1,
      author: 'Alex Carter',
      initials: 'AC',
      action: 'commented on task',
      target: 'Design Review',
      time: '10m ago',
      badgeColor: 'bg-sky-100 text-sky-600'
    },
    {
      id: 2,
      author: 'Lisa Lee',
      initials: 'LL',
      action: 'uploaded file',
      target: 'mockup-v2.fig',
      time: '1h ago',
      badgeColor: 'bg-emerald-100 text-emerald-600'
    },
    {
      id: 3,
      author: 'Brown Carter',
      initials: 'BC',
      action: 'created new task',
      target: 'Mobile Responsive',
      time: '2h ago',
      badgeColor: 'bg-amber-100 text-amber-600'
    },
    {
      id: 4,
      author: 'Lee Brown',
      initials: 'LB',
      action: 'created new task',
      target: 'Mobile Responsive',
      time: '2h ago',
      badgeColor: 'bg-purple-100 text-purple-600'
    }
  ],

  sprintProgress: {
    title: 'Sprint Progress',
    subtitle: 'Current sprint completion',
    inProgressPercent: 42,
    completedPercent: 78
  },

  timeTracking: {
    title: 'Time Tracking',
    subtitle: 'Current task timer',
    initialSeconds: 5350, // 01:29:10
    displayTime: '01 : 29 : 10'
  }
};

export default DASHBOARD_DATA;
