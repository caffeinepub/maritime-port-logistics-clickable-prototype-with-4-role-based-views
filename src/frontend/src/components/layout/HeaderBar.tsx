import { useRole } from '../../state/RoleProvider';
import { ROLES, type RoleType } from '../../state/role';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useAlerts } from '../../services/queries';
import { Bell } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export function HeaderBar() {
  const { currentRole, setRole, roleConfig } = useRole();
  const { data: alerts = [] } = useAlerts();
  const navigate = useNavigate();
  const urgentCount = alerts.filter((a) => a.urgent).length;

  const handleRoleChange = (newRole: string) => {
    setRole(newRole as RoleType);
    const targetRoute = ROLES[newRole as RoleType].landingRoute;
    navigate({ to: targetRoute });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-harbor-steel/20 bg-harbor-dark/95 backdrop-blur supports-[backdrop-filter]:bg-harbor-dark/80">
      <div className="flex h-16 items-center gap-4 px-6">
        <div className="flex items-center gap-3">
          <img src="/assets/generated/port-ops-logo.dim_512x512.png" alt="Port Ops" className="h-10 w-10" />
          <div>
            <h1 className="text-lg font-bold text-harbor-light">Port Operations</h1>
            <p className="text-xs text-harbor-muted">Maritime Logistics System</p>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-harbor-muted" />
            {urgentCount > 0 && (
              <Badge variant="destructive" className="h-5 min-w-5 px-1.5">
                {urgentCount}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-harbor-muted">Role:</span>
            <Select value={currentRole} onValueChange={handleRoleChange}>
              <SelectTrigger className="w-[200px] border-harbor-steel/30 bg-harbor-darker">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(ROLES).map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </header>
  );
}
