import { useTugboats } from '../../services/queries';
import { LoadingSkeleton, ErrorState, EmptyState } from '../../components/common/QueryState';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Waves, Anchor, Calendar, Flag } from 'lucide-react';

export function TugboatsPage() {
  const { data: tugboats = [], isLoading, error } = useTugboats();

  if (isLoading) {
    return <LoadingSkeleton rows={6} />;
  }

  if (error) {
    return <ErrorState error={error as Error} />;
  }

  if (tugboats.length === 0) {
    return <EmptyState message="No tugboats available" icon={Waves} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-harbor-light">Tugboat Fleet</h1>
          <p className="text-harbor-muted">Port of Tema tugboat operations</p>
        </div>
        <img src="/assets/generated/tugboat-icon.dim_256x256.png" alt="Tugboat" className="h-16 w-16 opacity-50" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tugboats.map((tugboat) => (
          <Card key={tugboat.id.toString()} className="hover:border-harbor-accent transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Anchor className="h-5 w-5 text-harbor-accent" />
                {tugboat.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-harbor-muted">ID</p>
                  <p className="font-medium text-harbor-light">{tugboat.id.toString()}</p>
                </div>
                <div>
                  <p className="text-sm text-harbor-muted">Type</p>
                  <p className="font-medium text-harbor-light">ASD</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-harbor-muted">Bollard Pull</p>
                  <p className="font-medium text-harbor-light">{tugboat.bollard_pull_ton.toString()}t</p>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-harbor-muted" />
                  <div>
                    <p className="text-sm text-harbor-muted">Built</p>
                    <p className="font-medium text-harbor-light">{tugboat.year_built.toString()}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-harbor-muted">Engine Power</p>
                  <p className="font-medium text-harbor-light">{tugboat.engine_power_hp.toString()} HP</p>
                </div>
                <div>
                  <p className="text-sm text-harbor-muted">Length</p>
                  <p className="font-medium text-harbor-light">{tugboat.length_m.toString()}m</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-harbor-border">
                <Flag className="h-4 w-4 text-harbor-muted" />
                <div className="flex-1">
                  <p className="text-sm text-harbor-muted">Flag</p>
                  <p className="font-medium text-harbor-light">{tugboat.flag}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-harbor-border">
                <p className="text-sm text-harbor-muted">Port</p>
                <p className="font-medium text-harbor-light">{tugboat.port}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
