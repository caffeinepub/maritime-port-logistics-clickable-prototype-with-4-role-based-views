import { KpiCard } from '../../components/common/KpiCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useTugboats, useAssignments, useVessels } from '../../services/queries';
import { LoadingSkeleton, ErrorState, EmptyState } from '../../components/common/QueryState';
import { Waves, CheckCircle, Clock, Ship } from 'lucide-react';

export function TugDispatcherDashboard() {
  const { data: tugboats = [], isLoading: tugboatsLoading, error: tugboatsError } = useTugboats();
  const { data: assignments = [], isLoading: assignmentsLoading } = useAssignments();
  const { data: vessels = [], isLoading: vesselsLoading } = useVessels();

  if (tugboatsLoading || assignmentsLoading || vesselsLoading) {
    return <LoadingSkeleton rows={6} />;
  }

  if (tugboatsError) {
    return <ErrorState error={tugboatsError as Error} />;
  }

  const assignedTugIds = new Set(assignments.flatMap((a) => a.tugboatIds.map((id) => id.toString())));
  const availableTugs = tugboats.filter((t) => !assignedTugIds.has(t.id.toString()));
  const activeAssignments = assignments.filter((a) => a.status === 'in_progress' || a.status === 'planned');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-harbor-light">Tug Dispatcher Control</h1>
        <p className="text-harbor-muted">Tugboat coordination and dispatch management</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Total Tugboats" value={tugboats.length} icon={Waves} variant="default" />
        <KpiCard title="Available" value={availableTugs.length} icon={CheckCircle} variant="success" />
        <KpiCard title="Assigned" value={tugboats.length - availableTugs.length} icon={Clock} variant="warning" />
        <KpiCard title="Active Jobs" value={activeAssignments.length} icon={Ship} variant="default" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tugboat Fleet Status</CardTitle>
        </CardHeader>
        <CardContent>
          {tugboats.length === 0 ? (
            <EmptyState message="No tugboats in fleet" icon={Waves} />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tugboat</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Current Assignment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tugboats.map((tug) => {
                  const assignment = assignments.find((a) => a.tugboatIds.some((id) => id === tug.id));
                  const vessel = assignment ? vessels.find((v) => v.id === assignment.vesselId) : null;
                  const isAvailable = !assignment;

                  return (
                    <TableRow key={tug.id.toString()}>
                      <TableCell className="font-medium">{tug.name}</TableCell>
                      <TableCell className="text-harbor-muted">{tug.capacity.toString()} kW</TableCell>
                      <TableCell>
                        <StatusBadge status={isAvailable ? 'Available' : 'Assigned'} type="tugboat" />
                      </TableCell>
                      <TableCell>{vessel ? vessel.name : '-'}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Assignment Queue</CardTitle>
        </CardHeader>
        <CardContent>
          {activeAssignments.length === 0 ? (
            <EmptyState message="No active assignments" icon={Ship} />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assignment</TableHead>
                  <TableHead>Vessel</TableHead>
                  <TableHead>Tugboats</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeAssignments.map((assignment) => {
                  const vessel = vessels.find((v) => v.id === assignment.vesselId);
                  const assignedTugs = tugboats.filter((t) => assignment.tugboatIds.some((id) => id === t.id));

                  return (
                    <TableRow key={assignment.id.toString()}>
                      <TableCell className="font-mono text-sm">#{assignment.id.toString()}</TableCell>
                      <TableCell className="font-medium">{vessel?.name || 'Unknown'}</TableCell>
                      <TableCell className="text-sm text-harbor-muted">
                        {assignedTugs.map((t) => t.name).join(', ')}
                      </TableCell>
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
  );
}
