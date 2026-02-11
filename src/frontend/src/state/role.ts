export type RoleType = 'port-ops' | 'berth-master' | 'tug-dispatcher' | 'maintenance';

export interface RoleConfig {
  id: RoleType;
  label: string;
  landingRoute: string;
  description: string;
  navItems: Array<{
    label: string;
    path: string;
    icon: string;
  }>;
}

export const ROLES: Record<RoleType, RoleConfig> = {
  'port-ops': {
    id: 'port-ops',
    label: 'Port Operations',
    landingRoute: '/',
    description: 'Overall port flow and coordination',
    navItems: [
      { label: 'Dashboard', path: '/', icon: 'LayoutDashboard' },
      { label: 'Vessels', path: '/vessels', icon: 'Ship' },
      { label: 'Berthing', path: '/berthing', icon: 'Anchor' },
      { label: 'Tugboats', path: '/tugboats', icon: 'Waves' },
      { label: 'Assignments', path: '/assignments', icon: 'ClipboardList' },
    ],
  },
  'berth-master': {
    id: 'berth-master',
    label: 'Berth Master',
    landingRoute: '/berth-master',
    description: 'Berth allocation and vessel positioning',
    navItems: [
      { label: 'Dashboard', path: '/berth-master', icon: 'LayoutDashboard' },
      { label: 'Berthing', path: '/berthing', icon: 'Anchor' },
      { label: 'Vessels', path: '/vessels', icon: 'Ship' },
      { label: 'Assignments', path: '/assignments', icon: 'ClipboardList' },
    ],
  },
  'tug-dispatcher': {
    id: 'tug-dispatcher',
    label: 'Tug Dispatcher',
    landingRoute: '/tug-dispatcher',
    description: 'Tugboat coordination and dispatch',
    navItems: [
      { label: 'Dashboard', path: '/tug-dispatcher', icon: 'LayoutDashboard' },
      { label: 'Tugboats', path: '/tugboats', icon: 'Waves' },
      { label: 'Assignments', path: '/assignments', icon: 'ClipboardList' },
      { label: 'Vessels', path: '/vessels', icon: 'Ship' },
    ],
  },
  'maintenance': {
    id: 'maintenance',
    label: 'Maintenance',
    landingRoute: '/maintenance',
    description: 'Equipment health and maintenance',
    navItems: [
      { label: 'Dashboard', path: '/maintenance', icon: 'LayoutDashboard' },
      { label: 'Tugboats', path: '/tugboats', icon: 'Waves' },
      { label: 'Assignments', path: '/assignments', icon: 'ClipboardList' },
    ],
  },
};
