import { DetailDrawer } from '../../components/common/DetailDrawer';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAssignments, useBerths, useTugboats } from '../../services/queries';
import type { Vessel } from '../../types/legacy';
import { Ship, Anchor, Waves } from 'lucide-react';

interface VesselDetailPanelProps {
  vessel: Vessel | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VesselDetailPanel({ vessel, open, onOpenChange }: VesselDetailPanelProps) {
  const { data: assignments = [] } = useAssignments();
  const { data: berths = [] } = useBerths();
  const { data: tugboats = [] } = useTugboats();

  if (!vessel) return null;

  const assignment = assignments.find((a) => a.vesselId === vessel.id);
  const berth = assignment ? berths.find((b) => b.id === assignment.berthId) : null;
  const assignedTugs = assignment ? tugboats.filter((t) => assignment.tugboatIds.some((id) => id === t.id)) : [];

  return (
    <DetailDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={vessel.name}
      description="Vessel details and current assignment"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ship className="h-5 w-5" />
              Vessel Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-harbor-muted">IMO Number</p>
              <p className="font-mono font-medium">{vessel.imo}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-harbor-muted">Length</p>
                <p className="font-medium">{vessel.length.toString()}m</p>
              </div>
              <div>
                <p className="text-sm text-harbor-muted">Beam</p>
                <p className="font-medium">{vessel.beam.toString()}m</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {assignment && berth && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Anchor className="h-5 w-5" />
                Berthing Assignment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-harbor-muted">Assigned Berth</p>
                <p className="font-medium">{berth.name}</p>
              </div>
              <div>
                <p className="text-sm text-harbor-muted">Assignment Status</p>
                <StatusBadge status={assignment.status} type="assignment" />
              </div>
            </CardContent>
          </Card>
        )}

        {assignedTugs.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Waves className="h-5 w-5" />
                Assigned Tugboats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {assignedTugs.map((tug) => (
                  <li key={tug.id.toString()} className="flex items-center justify-between rounded-md border border-harbor-steel/30 p-3">
                    <span className="font-medium">{tug.name}</span>
                    <span className="text-sm text-harbor-muted">{tug.capacity.toString()} kW</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </DetailDrawer>
  );
}
