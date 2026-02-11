import { DetailDrawer } from '../../components/common/DetailDrawer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Anchor, MapPin, Ruler, Ship } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { BerthingPoint } from '../../types/temaPort';

interface BerthDetailPanelProps {
  berth: BerthingPoint | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BerthDetailPanel({ berth, open, onOpenChange }: BerthDetailPanelProps) {
  if (!berth) return null;

  return (
    <DetailDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={berth.name}
      description="Berthing point details and specifications"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Anchor className="h-5 w-5" />
              Berth Identification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-harbor-muted">Berth ID</p>
              <p className="font-mono font-medium">{berth.id}</p>
            </div>
            <div>
              <p className="text-sm text-harbor-muted">Berth Name</p>
              <p className="font-medium">{berth.name}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Location Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-harbor-muted">Location</p>
              <p className="font-medium">{berth.location}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ruler className="h-5 w-5" />
              Technical Specifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-harbor-muted">Draft (m)</p>
              <p className="text-lg font-semibold">{berth.draft_m.toFixed(1)} meters</p>
            </div>
            <div className="pt-2">
              <p className="text-sm text-harbor-muted mb-2">Use / Category</p>
              <Badge variant="outline" className="text-base">
                {berth.use}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ship className="h-5 w-5" />
              Operational Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-harbor-muted">
              <p>
                This berthing point is designated for <strong className="text-harbor-light">{berth.use}</strong> operations
                at <strong className="text-harbor-light">{berth.location}</strong>.
              </p>
              <p>
                Maximum draft capacity: <strong className="text-harbor-light">{berth.draft_m.toFixed(1)}m</strong>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DetailDrawer>
  );
}
