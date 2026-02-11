import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useTugboats, useAssignments, useVessels } from '../../services/queries';
import { LoadingSkeleton, ErrorState, EmptyState } from '../../components/common/QueryState';
import { TugboatHealthDetail } from './TugboatHealthDetail';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Waves } from 'lucide-react';
import type { Tugboat } from '../../types/legacy';

export function TugboatsPage() {
  const { data: tugboats = [], isLoading, error } = useTugboats();
  const { data: assignments = [] } = useAssignments();
  const { data: vessels = [] } = useVessels();
  const [selectedTugboat, setSelectedTugboat] = useState<Tugboat | null>(null);

  if (isLoading) {
    return <LoadingSkeleton rows={6} />;
  }

  if (error) {
    return <ErrorState error={error as Error} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-harbor-light">Tugboat Fleet</h1>
          <p className="text-harbor-muted">Monitor and manage tugboat operations</p>
        </div>
        <img src="/assets/generated/tugboat-icon.dim_256x256.png" alt="Tugboat" className="h-16 w-16 opacity-50" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fleet Overview</CardTitle>
        </CardHeader>
        <CardContent>
          {tugboats.length === 0 ? (
            <EmptyState message="No tugboats in fleet" icon={Waves} />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tugboat Name</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Current Assignment</TableHead>
                  <TableHead>Health</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tugboats.map((tug) => {
                  const assignment = assignments.find((a) => a.tugboatIds.some((id) => id === tug.id));
                  const vessel = assignment ? vessels.find((v) => v.id === assignment.vesselId) : null;
                  const isAvailable = !assignment;
                  const healthScore = Number(tug.capacity) > 5500 ? 95 : Number(tug.capacity) > 5000 ? 75 : 60;
                  const healthStatus = healthScore >= 90 ? 'operational' : healthScore >= 70 ? 'degraded' : 'out-of-service';

                  return (
                    <TableRow key={tug.id.toString()}>
                      <TableCell className="font-medium">{tug.name}</TableCell>
                      <TableCell className="text-harbor-muted">{tug.capacity.toString()} kW</TableCell>
                      <TableCell>
                        <StatusBadge status={isAvailable ? 'Available' : 'Assigned'} type="tugboat" />
                      </TableCell>
                      <TableCell>{vessel ? vessel.name : '-'}</TableCell>
                      <TableCell>
                        <StatusBadge status={healthStatus} type="tugboat" />
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => setSelectedTugboat(tug)}
                          className="text-sm text-harbor-accent hover:underline"
                        >
                          View Health
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <TugboatHealthDetail
        tugboat={selectedTugboat}
        open={!!selectedTugboat}
        onOpenChange={(open) => !open && setSelectedTugboat(null)}
      />
    </div>
  );
}
