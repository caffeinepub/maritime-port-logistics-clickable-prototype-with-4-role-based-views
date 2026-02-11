import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

export function KpiCard({ title, value, icon: Icon, trend, variant = 'default' }: KpiCardProps) {
  const variantClasses = {
    default: 'border-harbor-steel/30',
    success: 'border-harbor-success/50 bg-harbor-success/5',
    warning: 'border-harbor-warning/50 bg-harbor-warning/5',
    danger: 'border-destructive/50 bg-destructive/5',
  };

  return (
    <Card className={cn('border-2', variantClasses[variant])}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-harbor-muted">{title}</CardTitle>
        <Icon className="h-4 w-4 text-harbor-muted" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-harbor-light">{value}</div>
        {trend && (
          <p className={cn('text-xs', trend.positive ? 'text-harbor-success' : 'text-destructive')}>
            {trend.value}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
