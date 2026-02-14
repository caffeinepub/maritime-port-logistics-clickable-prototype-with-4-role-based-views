import { KpiCard } from '../../components/common/KpiCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useTugboats, useAssignments } from '../../services/queries';
import { LoadingSkeleton, ErrorState, EmptyState } from '../../components/common/QueryState';
import { Wrench, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export function MaintenanceDashboard() {
  const { data: tugboats = [], isLoading: tugboatsLoading, error: tugboatsError } = useTugboats();
  const { data: assignments = [], isLoading: assignmentsLoading } = useAssignments();

  if (tugboatsLoading || assignmentsLoading) {
    return <LoadingSkeleton rows={6} />;
  }

  if (tugboatsError) {
    return <ErrorState error={tugboatsError as Error} />;
  }

  // Simulate health status based on engine power (for prototype)
  const tugboatsWithHealth = tugboats.map((tug) => {
    const healthScore = Number(tug.engine_power_hp) > 4000 ? 95 : Number(tug.engine_power_hp) > 3700 ? 75 : 60;
    const status = healthScore >= 90 ? 'operational' : healthScore >= 70 ? 'degraded' : 'out-of-service';
    return { ...tug, healthScore, status };
  });

  const operational = tugboatsWithHealth.filter((t) => t.status === 'operational').length;
  const degraded = tugboatsWithHealth.filter((t) => t.status === 'degraded').length;
  const outOfService = tugboatsWithHealth.filter((t) => t.status === 'out-of-service').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-harbor-light">Maintenance & Equipment Health</h1>
        <p className="text-harbor-muted">Real-time monitoring of tugboat operational status</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Operational" value={operational} icon={CheckCircle} variant="success" />
        <KpiCard title="Degraded" value={degraded} icon={AlertTriangle} variant="warning" />
        <KpiCard title="Out of Service" value={outOfService} icon={XCircle} variant="danger" />
        <KpiCard title="Fleet Health" value={`${Math.round((operational / tugboats.length) * 100)}%`} icon={Wrench} variant="default" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Equipment Health Status</CardTitle>
        </CardHeader>
        <CardContent>
          {tugboatsWithHealth.length === 0 ? (
            <EmptyState message="No equipment to monitor" icon={Wrench} />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Equipment</TableHead>
                  <TableHead>Engine Power</TableHead>
                  <TableHead>Health Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Utilization</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tugboatsWithHealth.map((tug) => {
                  const assignment = assignments.find((a) => a.tugboatIds.some((id) => id === tug.id));
                  const utilization = assignment ? 85 : 0;

                  return (
                    <TableRow key={tug.id.toString()}>
                      <TableCell className="font-medium">{tug.name}</TableCell>
                      <TableCell className="text-harbor-muted">{tug.engine_power_hp.toString()} HP</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={tug.healthScore} className="w-20" />
                          <span className="text-sm text-harbor-muted">{tug.healthScore}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={tug.status} type="tugboat" />
                      </TableCell>
                      <TableCell className="text-sm text-harbor-muted">{utilization}%</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {degraded > 0 && (
        <Card className="border-harbor-warning/50 bg-harbor-warning/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-harbor-warning" />
              Maintenance Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {tugboatsWithHealth
                .filter((t) => t.status === 'degraded')
                .map((tug) => (
                  <div key={tug.id.toString()} className="rounded-md border border-harbor-warning/30 bg-background p-3">
                    <p className="text-sm font-medium">{tug.name} requires maintenance inspection</p>
                    <p className="text-xs text-harbor-muted">Health score: {tug.healthScore}%</p>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
