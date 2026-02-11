import { DetailDrawer } from '../../components/common/DetailDrawer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { Tugboat } from '../../types/legacy';
import { Activity, Droplet, Gauge, Wrench } from 'lucide-react';

interface TugboatHealthDetailProps {
  tugboat: Tugboat | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TugboatHealthDetail({ tugboat, open, onOpenChange }: TugboatHealthDetailProps) {
  if (!tugboat) return null;

  const capacity = Number(tugboat.capacity);
  const overallHealth = capacity > 5500 ? 95 : capacity > 5000 ? 75 : 60;
  const engineHealth = capacity > 5500 ? 92 : capacity > 5000 ? 78 : 65;
  const hydraulicHealth = capacity > 5500 ? 98 : capacity > 5000 ? 72 : 55;
  const utilization = capacity > 5500 ? 65 : capacity > 5000 ? 80 : 45;

  const getHealthColor = (score: number) => {
    if (score >= 90) return 'bg-harbor-success';
    if (score >= 70) return 'bg-harbor-warning';
    return 'bg-harbor-danger';
  };

  return (
    <DetailDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={tugboat.name}
      description="Tugboat health metrics and maintenance status"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Overall Health Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{overallHealth}%</span>
                <span className="text-sm text-harbor-muted">
                  {overallHealth >= 90 ? 'Excellent' : overallHealth >= 70 ? 'Good' : 'Needs Attention'}
                </span>
              </div>
              <Progress value={overallHealth} className={getHealthColor(overallHealth)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="h-5 w-5" />
              Engine Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-harbor-muted">Capacity</p>
                <p className="font-medium">{capacity} kW</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Engine Health</span>
                  <span className="text-sm font-medium">{engineHealth}%</span>
                </div>
                <Progress value={engineHealth} className={getHealthColor(engineHealth)} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplet className="h-5 w-5" />
              Hydraulic Systems
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">System Health</span>
                <span className="text-sm font-medium">{hydraulicHealth}%</span>
              </div>
              <Progress value={hydraulicHealth} className={getHealthColor(hydraulicHealth)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Utilization & Maintenance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Current Utilization</span>
                  <span className="text-sm font-medium">{utilization}%</span>
                </div>
                <Progress value={utilization} />
              </div>
              <div className="rounded-md border border-harbor-steel/30 p-3">
                <p className="text-sm text-harbor-muted">
                  {overallHealth >= 90
                    ? 'No immediate maintenance required. Continue regular inspections.'
                    : overallHealth >= 70
                      ? 'Schedule routine maintenance within the next 2 weeks.'
                      : 'Immediate maintenance attention required. Reduce operational load.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DetailDrawer>
  );
}
