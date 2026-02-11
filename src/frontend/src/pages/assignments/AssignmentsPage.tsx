import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useAssignments, useVessels, useBerths, useTugboats } from '../../services/queries';
import { LoadingSkeleton, ErrorState, EmptyState } from '../../components/common/QueryState';
import { AssignmentFormDialog } from './AssignmentFormDialog';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ClipboardList, Plus } from 'lucide-react';
import type { Assignment } from '../../types/legacy';

export function AssignmentsPage() {
  const { data: assignments = [], isLoading, error } = useAssignments();
  const { data: vessels = [] } = useVessels();
  const { data: berths = [] } = useBerths();
  const { data: tugboats = [] } = useTugboats();
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (isLoading) {
    return <LoadingSkeleton rows={6} />;
  }

  if (error) {
    return <ErrorState error={error as Error} />;
  }

  const handleEdit = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedAssignment(null);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-harbor-light">Assignment Management</h1>
          <p className="text-harbor-muted">Coordinate vessel berthing and tugboat assignments</p>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          New Assignment
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          {assignments.length === 0 ? (
            <EmptyState message="No assignments found" icon={ClipboardList} />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Vessel</TableHead>
                  <TableHead>Berth</TableHead>
                  <TableHead>Tugboats</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignments.map((assignment) => {
                  const vessel = vessels.find((v) => v.id === assignment.vesselId);
                  const berth = berths.find((b) => b.id === assignment.berthId);
                  const assignedTugs = tugboats.filter((t) => assignment.tugboatIds.some((id) => id === t.id));

                  return (
                    <TableRow key={assignment.id.toString()}>
                      <TableCell className="font-mono text-sm">#{assignment.id.toString()}</TableCell>
                      <TableCell className="font-medium">{vessel?.name || 'Unknown'}</TableCell>
                      <TableCell>{berth?.name || 'Unknown'}</TableCell>
                      <TableCell className="text-sm text-harbor-muted">
                        {assignedTugs.length > 0 ? assignedTugs.map((t) => t.name).join(', ') : 'None'}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={assignment.status} type="assignment" />
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(assignment)}>
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <AssignmentFormDialog
        assignment={selectedAssignment}
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
      />
    </div>
  );
}
