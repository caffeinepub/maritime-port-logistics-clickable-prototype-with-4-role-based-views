import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { useVessels, useAssignments, useBerths } from '../../services/queries';
import { LoadingSkeleton, ErrorState, EmptyState } from '../../components/common/QueryState';
import { VesselDetailPanel } from './VesselDetailPanel';
import { Ship, Search } from 'lucide-react';
import type { Vessel } from '../../types/legacy';

export function VesselsPage() {
  const { data: vessels = [], isLoading, error } = useVessels();
  const { data: assignments = [] } = useAssignments();
  const { data: berths = [] } = useBerths();
  const [selectedVessel, setSelectedVessel] = useState<Vessel | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  if (isLoading) {
    return <LoadingSkeleton rows={6} />;
  }

  if (error) {
    return <ErrorState error={error as Error} />;
  }

  const filteredVessels = vessels.filter(
    (v) =>
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.imo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-harbor-light">Vessel Management</h1>
        <p className="text-harbor-muted">Monitor and manage all vessels in port</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Vessels</CardTitle>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-harbor-muted" />
            <Input
              placeholder="Search by name or IMO..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          {filteredVessels.length === 0 ? (
            <EmptyState message="No vessels found" icon={Ship} />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vessel Name</TableHead>
                  <TableHead>IMO Number</TableHead>
                  <TableHead>Length</TableHead>
                  <TableHead>Beam</TableHead>
                  <TableHead>Assigned Berth</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVessels.map((vessel) => {
                  const assignment = assignments.find((a) => a.vesselId === vessel.id);
                  const berth = assignment ? berths.find((b) => b.id === assignment.berthId) : null;

                  return (
                    <TableRow key={vessel.id.toString()} className="cursor-pointer hover:bg-harbor-steel/5">
                      <TableCell className="font-medium">{vessel.name}</TableCell>
                      <TableCell className="font-mono text-sm text-harbor-muted">{vessel.imo}</TableCell>
                      <TableCell className="text-harbor-muted">{vessel.length.toString()}m</TableCell>
                      <TableCell className="text-harbor-muted">{vessel.beam.toString()}m</TableCell>
                      <TableCell>{berth ? berth.name : '-'}</TableCell>
                      <TableCell>
                        <button
                          onClick={() => setSelectedVessel(vessel)}
                          className="text-sm text-harbor-accent hover:underline"
                        >
                          View Details
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

      <VesselDetailPanel
        vessel={selectedVessel}
        open={!!selectedVessel}
        onOpenChange={(open) => !open && setSelectedVessel(null)}
      />
    </div>
  );
}
