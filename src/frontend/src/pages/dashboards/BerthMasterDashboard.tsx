import { KpiCard } from '../../components/common/KpiCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useBerths, useVessels, useAssignments } from '../../services/queries';
import { LoadingSkeleton, ErrorState, EmptyState } from '../../components/common/QueryState';
import { Anchor, Ship, Ruler, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatBerthSpec, hasMeaningfulSpecs } from '../../utils/berthSpecs';

export function BerthMasterDashboard() {
  const { data: berths = [], isLoading: berthsLoading, error: berthsError } = useBerths();
  const { data: vessels = [], isLoading: vesselsLoading } = useVessels();
  const { data: assignments = [], isLoading: assignmentsLoading } = useAssignments();

  if (berthsLoading || vesselsLoading || assignmentsLoading) {
    return <LoadingSkeleton rows={6} />;
  }

  if (berthsError) {
    return <ErrorState error={berthsError as Error} />;
  }

  const occupiedBerths = assignments.filter((a) => a.status === 'in_progress').length;
  const availableBerths = berths.length - occupiedBerths;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-harbor-light">Berth Master Control</h1>
        <p className="text-harbor-muted">Berth allocation and vessel positioning management</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Total Berths" value={berths.length} icon={Anchor} variant="default" />
        <KpiCard title="Occupied" value={occupiedBerths} icon={Ship} variant="warning" />
        <KpiCard title="Available" value={availableBerths} icon={CheckCircle} variant="success" />
        <KpiCard title="Utilization" value={`${Math.round((occupiedBerths / berths.length) * 100)}%`} icon={Ruler} variant="default" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Berth Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          {berths.length === 0 ? (
            <EmptyState message="No berths configured" icon={Anchor} />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Berth</TableHead>
                  <TableHead>Max Length</TableHead>
                  <TableHead>Max Beam</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned Vessel</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {berths.map((berth) => {
                  const assignment = assignments.find((a) => a.berthId === berth.id && a.status === 'in_progress');
                  const vessel = assignment ? vessels.find((v) => v.id === assignment.vesselId) : null;
                  const isOccupied = !!assignment;

                  return (
                    <TableRow key={berth.id.toString()}>
                      <TableCell className="font-medium">{berth.name}</TableCell>
                      <TableCell className="text-harbor-muted">{formatBerthSpec(berth.maxLength)}</TableCell>
                      <TableCell className="text-harbor-muted">{formatBerthSpec(berth.maxBeam)}</TableCell>
                      <TableCell>
                        <Badge variant={isOccupied ? 'secondary' : 'default'} className={isOccupied ? '' : 'bg-harbor-success text-harbor-dark'}>
                          {isOccupied ? 'Occupied' : 'Available'}
                        </Badge>
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
          <CardTitle>Upcoming Arrivals</CardTitle>
        </CardHeader>
        <CardContent>
          {vessels.length === 0 ? (
            <EmptyState message="No upcoming arrivals" icon={Ship} />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vessel</TableHead>
                  <TableHead>Length</TableHead>
                  <TableHead>Beam</TableHead>
                  <TableHead>Suitable Berths</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vessels.map((vessel) => {
                  const suitableBerths = berths.filter(
                    (b) => hasMeaningfulSpecs(b) && b.maxLength >= vessel.length && b.maxBeam >= vessel.beam
                  );
                  return (
                    <TableRow key={vessel.id.toString()}>
                      <TableCell className="font-medium">{vessel.name}</TableCell>
                      <TableCell className="text-harbor-muted">{vessel.length.toString()}m</TableCell>
                      <TableCell className="text-harbor-muted">{vessel.beam.toString()}m</TableCell>
                      <TableCell>
                        <Badge variant={suitableBerths.length > 0 ? 'default' : 'secondary'} className={suitableBerths.length > 0 ? 'bg-harbor-success text-harbor-dark' : ''}>
                          {suitableBerths.length} available
                        </Badge>
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
