import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type StatusType =
  | 'on-time'
  | 'delayed'
  | 'occupied'
  | 'available'
  | 'operational'
  | 'degraded'
  | 'out-of-service'
  | 'planned'
  | 'in-progress'
  | 'completed'
  | 'urgent'
  | 'normal';

interface StatusBadgeProps {
  status: string;
  type?: 'vessel' | 'berth' | 'tugboat' | 'assignment' | 'alert';
}

export function StatusBadge({ status, type = 'assignment' }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase().replace(/[_\s]/g, '-') as StatusType;

  const getVariantAndClass = () => {
    switch (normalizedStatus) {
      case 'on-time':
      case 'available':
      case 'operational':
      case 'completed':
        return { variant: 'default' as const, className: 'bg-harbor-success text-harbor-dark' };
      case 'delayed':
      case 'urgent':
      case 'out-of-service':
        return { variant: 'destructive' as const, className: '' };
      case 'degraded':
      case 'in-progress':
        return { variant: 'default' as const, className: 'bg-harbor-warning text-harbor-dark' };
      case 'occupied':
      case 'planned':
      case 'normal':
        return { variant: 'secondary' as const, className: '' };
      default:
        return { variant: 'outline' as const, className: '' };
    }
  };

  const { variant, className } = getVariantAndClass();

  return (
    <Badge variant={variant} className={cn('font-medium', className)}>
      {status}
    </Badge>
  );
}
