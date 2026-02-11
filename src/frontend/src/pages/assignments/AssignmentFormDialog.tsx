import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUpdateAssignmentStatus } from '../../services/mutations';
import type { Assignment } from '../../types/legacy';
import { Loader2 } from 'lucide-react';

interface AssignmentFormDialogProps {
  assignment: Assignment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AssignmentFormDialog({ assignment, open, onOpenChange }: AssignmentFormDialogProps) {
  const [status, setStatus] = useState(assignment?.status || 'pending');
  const updateStatus = useUpdateAssignmentStatus();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignment) return;

    updateStatus.mutate(
      { id: assignment.id, status },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{assignment ? 'Edit Assignment' : 'Create Assignment'}</DialogTitle>
          <DialogDescription>
            {assignment
              ? 'Update the assignment status'
              : 'Note: Full assignment creation is not available in this prototype. Only status updates are supported.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {assignment && (
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            {assignment && (
              <Button type="submit" disabled={updateStatus.isPending}>
                {updateStatus.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Status
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
