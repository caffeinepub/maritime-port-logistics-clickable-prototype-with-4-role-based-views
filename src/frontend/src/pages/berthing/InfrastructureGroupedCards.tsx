import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Anchor, Building2, Ship, Wrench } from 'lucide-react';
import type { GroupedInfrastructure } from '../../types/temaPort';

interface InfrastructureGroupedCardsProps {
  data: GroupedInfrastructure;
}

export function InfrastructureGroupedCards({ data }: InfrastructureGroupedCardsProps) {
  return (
    <div className="space-y-8">
      {/* Terminal 3 MPS */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <Ship className="h-5 w-5 text-harbor-accent" />
          <h2 className="text-xl font-semibold text-harbor-light">Terminal 3 MPS</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {data.terminal_3_mps.map((berth, index) => (
            <Card key={index} className="border-harbor-accent/30">
              <CardHeader>
                <CardTitle className="text-lg">{berth.berth}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-harbor-muted">Draft:</span>
                    <span className="font-medium">{berth.draft.toFixed(1)}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-harbor-muted">Type:</span>
                    <span className="font-medium">{berth.type}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Harbour Quays */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <Anchor className="h-5 w-5 text-harbor-accent" />
          <h2 className="text-xl font-semibold text-harbor-light">Main Harbour Quays</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {data.main_harbour_quays.map((berth, index) => (
            <Card key={index} className="border-harbor-accent/30">
              <CardHeader>
                <CardTitle className="text-lg">{berth.berth}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-harbor-muted">Quay:</span>
                    <span className="font-medium">{berth.quay}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-harbor-muted">Draft:</span>
                    <span className="font-medium">{berth.draft.toFixed(1)}m</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Specialized Industrial */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <Building2 className="h-5 w-5 text-harbor-accent" />
          <h2 className="text-xl font-semibold text-harbor-light">Specialized Industrial</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {data.specialized_industrial.map((facility, index) => (
            <Card key={index} className="border-harbor-accent/30">
              <CardHeader>
                <CardTitle className="text-lg">{facility.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-harbor-muted">Location:</span>
                    <span className="font-medium">{facility.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-harbor-muted">Draft:</span>
                    <span className="font-medium">{facility.draft.toFixed(1)}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-harbor-muted">Cargo:</span>
                    <span className="font-medium">{facility.cargo}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Tema Shipyard */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <Wrench className="h-5 w-5 text-harbor-accent" />
          <h2 className="text-xl font-semibold text-harbor-light">Tema Shipyard</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {data.tema_shipyard.map((dock, index) => (
            <Card key={index} className="border-harbor-accent/30">
              <CardHeader>
                <CardTitle className="text-lg">{dock.dock}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-harbor-muted">Dimensions:</span>
                    <span className="font-medium">{dock.dimensions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-harbor-muted">Capacity:</span>
                    <span className="font-medium">{dock.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-harbor-muted">Primary Use:</span>
                    <span className="font-medium">{dock.primary_use}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
