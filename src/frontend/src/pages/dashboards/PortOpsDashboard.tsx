import { KpiCard } from '../../components/common/KpiCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useVessels, useAssignments, useAlerts } from '../../services/queries';
import { LoadingSkeleton, ErrorState, EmptyState } from '../../components/common/QueryState';
import { Ship, Anchor, AlertTriangle, ClipboardCheck } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export function PortOpsDashboard() {
  const { data: vessels = [], isLoading: vesselsLoading, error: vesselsError } = useVessels();
  const { data: assignments = [], isLoading: assignmentsLoading } = useAssignments();
  const { data: alerts = [], isLoading: alertsLoading } = useAlerts();

  if (vesselsLoading || assignmentsLoading || alertsLoading) {
    return <LoadingSkeleton rows={6} />;
  }

  if (vesselsError) {
    return <ErrorState error={vesselsError as Error} />;
  }

  const activeAssignments = assignments.filter((a) => a.status === 'in_progress' || a.status === 'planned');
  const urgentAlerts = alerts.filter((a) => a.urgent);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-harbor-light">Port Operations Control</h1>
        <p className="text-harbor-muted">Real-time overview of port logistics and vessel movements</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Active Vessels" value={vessels.length} icon={Ship} variant="default" />
        <KpiCard title="Active Assignments" value={activeAssignments.length} icon={ClipboardCheck} variant="default" />
        <KpiCard
          title="Urgent Alerts"
          value={urgentAlerts.length}
          icon={AlertTriangle}
          variant={urgentAlerts.length > 0 ? 'danger' : 'success'}
        />
        <KpiCard title="Berth Utilization" value="75%" icon={Anchor} variant="warning" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Vessel Arrivals</CardTitle>
          </CardHeader>
          <CardContent>
            {vessels.length === 0 ? (
              <EmptyState message="No vessels in port" icon={Ship} />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vessel</TableHead>
                    <TableHead>IMO</TableHead>
                    <TableHead>Dimensions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vessels.slice(0, 5).map((vessel) => (
                    <TableRow key={vessel.id.toString()}>
                      <TableCell className="font-medium">
                        <Link to="/vessels" className="hover:text-harbor-accent">
                          {vessel.name}
                        </Link>
                      </TableCell>
                      <TableCell className="text-harbor-muted">{vessel.imo}</TableCell>
                      <TableCell className="text-sm text-harbor-muted">
                        {vessel.length.toString()}m × {vessel.beam.toString()}m
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            {activeAssignments.length === 0 ? (
              <EmptyState message="No active assignments" icon={ClipboardCheck} />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assignment ID</TableHead>
                    <TableHead>Vessel</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeAssignments.slice(0, 5).map((assignment) => {
                    const vessel = vessels.find((v) => v.id === assignment.vesselId);
                    return (
                      <TableRow key={assignment.id.toString()}>
                        <TableCell className="font-mono text-sm">#{assignment.id.toString()}</TableCell>
                        <TableCell>{vessel?.name || 'Unknown'}</TableCell>
                        <TableCell>
                          <StatusBadge status={assignment.status} type="assignment" />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {urgentAlerts.length > 0 && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Urgent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {urgentAlerts.map((alert) => (
                <div key={alert.id.toString()} className="rounded-md border border-destructive/30 bg-background p-3">
                  <p className="text-sm font-medium">{alert.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
