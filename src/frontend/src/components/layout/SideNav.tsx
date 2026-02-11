import { useRole } from '../../state/RoleProvider';
import { Link, useRouterState } from '@tanstack/react-router';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Ship,
  Anchor,
  Waves,
  ClipboardList,
} from 'lucide-react';

const iconMap = {
  LayoutDashboard,
  Ship,
  Anchor,
  Waves,
  ClipboardList,
};

export function SideNav() {
  const { roleConfig } = useRole();
  const router = useRouterState();
  const currentPath = router.location.pathname;

  return (
    <aside className="sticky top-16 h-[calc(100vh-4rem)] w-64 border-r border-harbor-steel/20 bg-harbor-darker">
      <nav className="space-y-1 p-4">
        <div className="mb-4">
          <h2 className="px-3 text-xs font-semibold uppercase tracking-wider text-harbor-muted">
            {roleConfig.label}
          </h2>
          <p className="px-3 text-xs text-harbor-muted/70">{roleConfig.description}</p>
        </div>

        {roleConfig.navItems.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          const isActive = currentPath === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-harbor-accent text-harbor-light'
                  : 'text-harbor-muted hover:bg-harbor-steel/10 hover:text-harbor-light'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
