import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Anchor, Calendar, Gauge, Ruler, Ship, Wrench, Shield } from 'lucide-react';
import type { TemaFleetData } from './tugboatListTypes';

interface TugboatListProps {
  fleetData: TemaFleetData;
}

export function TugboatList({ fleetData }: TugboatListProps) {
  const { port, authority, fleet_last_updated, tugboats } = fleetData;

  return (
    <div className="space-y-6">
      {/* Fleet Header */}
      <div className="rounded-lg border border-harbor-border bg-harbor-card p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-harbor-light">{port} Tugboat Fleet</h2>
            <p className="text-harbor-muted mt-1">{authority}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-harbor-muted">Fleet Last Updated</p>
            <p className="font-medium text-harbor-light">{fleet_last_updated}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <Ship className="h-5 w-5 text-harbor-accent" />
          <p className="text-harbor-light">
            <span className="font-bold">{tugboats.length}</span> Active Tugboats
          </p>
        </div>
      </div>

      {/* Tugboat Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tugboats.map((tugboat) => (
          <Card key={tugboat.id} className="hover:border-harbor-accent transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Anchor className="h-5 w-5 text-harbor-accent" />
                  <span className="text-lg">{tugboat.name}</span>
                </CardTitle>
                <Badge variant={tugboat.status === 'Active' ? 'default' : 'secondary'}>
                  {tugboat.status}
                </Badge>
              </div>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-harbor-muted">ID: {tugboat.id}</p>
                <p className="text-sm text-harbor-muted">IMO: {tugboat.imo_number}</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Type and Year */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-harbor-muted">Type</p>
                  <p className="font-medium text-harbor-light">{tugboat.type}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-harbor-muted" />
                  <div>
                    <p className="text-sm text-harbor-muted">Built</p>
                    <p className="font-medium text-harbor-light">{tugboat.year_built}</p>
                  </div>
                </div>
              </div>

              {/* Specifications */}
              <div className="space-y-3 pt-2 border-t border-harbor-border">
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-harbor-accent" />
                  <p className="text-sm font-semibold text-harbor-light">Specifications</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-harbor-muted">Bollard Pull</p>
                    <p className="font-medium text-harbor-light">{tugboat.specifications.bollard_pull_tonnes}t</p>
                  </div>
                  <div>
                    <p className="text-xs text-harbor-muted">Gross Tonnage</p>
                    <p className="font-medium text-harbor-light">{tugboat.specifications.gross_tonnage}</p>
                  </div>
                  <div>
                    <p className="text-xs text-harbor-muted">Length</p>
                    <p className="font-medium text-harbor-light">{tugboat.specifications.length_m}m</p>
                  </div>
                  <div>
                    <p className="text-xs text-harbor-muted">Beam</p>
                    <p className="font-medium text-harbor-light">{tugboat.specifications.beam_m}m</p>
                  </div>
                  {tugboat.specifications.max_draught_m && (
                    <div>
                      <p className="text-xs text-harbor-muted">Max Draught</p>
                      <p className="font-medium text-harbor-light">{tugboat.specifications.max_draught_m}m</p>
                    </div>
                  )}
                  {tugboat.specifications.engine_power_kw && (
                    <div>
                      <p className="text-xs text-harbor-muted">Engine Power</p>
                      <p className="font-medium text-harbor-light">{tugboat.specifications.engine_power_kw} kW</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Capabilities */}
              <div className="space-y-2 pt-2 border-t border-harbor-border">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-harbor-accent" />
                  <p className="text-sm font-semibold text-harbor-light">Capabilities</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tugboat.capabilities.map((capability, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {capability}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Last Maintenance (if available) */}
              {tugboat.last_maintenance && (
                <div className="pt-2 border-t border-harbor-border">
                  <div className="flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-harbor-muted" />
                    <div>
                      <p className="text-xs text-harbor-muted">Last Maintenance</p>
                      <p className="text-sm font-medium text-harbor-light">{tugboat.last_maintenance}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
