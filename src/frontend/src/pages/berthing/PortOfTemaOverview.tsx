import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { KpiCard } from '../../components/common/KpiCard';
import { Anchor, Building2, Ship, Wrench } from 'lucide-react';
import type { PortOfTemaData } from '../../types/temaPort';

interface PortOfTemaOverviewProps {
  data: PortOfTemaData;
}

export function PortOfTemaOverview({ data }: PortOfTemaOverviewProps) {
  const { metadata, infrastructure, dry_docking_stations } = data;

  return (
    <div className="space-y-6">
      {/* Port Metadata */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ship className="h-5 w-5" />
            Port Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm text-harbor-muted">Port</p>
              <p className="text-lg font-semibold">{metadata.port}</p>
            </div>
            <div>
              <p className="text-sm text-harbor-muted">Location</p>
              <p className="text-lg font-semibold">{metadata.location}</p>
            </div>
            <div>
              <p className="text-sm text-harbor-muted">Last Updated</p>
              <p className="text-lg font-semibold">{metadata.last_updated}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Infrastructure KPIs */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-harbor-light">Infrastructure Overview</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            title="Commercial Berths"
            value={infrastructure.commercial_berths.toString()}
            icon={Anchor}
            variant="default"
          />
          <KpiCard
            title="Specialized Berths"
            value={infrastructure.specialized_berths.toString()}
            icon={Building2}
            variant="default"
          />
          <KpiCard
            title="Offshore Facilities"
            value={infrastructure.offshore_facilities.toString()}
            icon={Ship}
            variant="default"
          />
          <KpiCard
            title="Dry Docks"
            value={infrastructure.dry_docks.toString()}
            icon={Wrench}
            variant="default"
          />
        </div>
      </div>

      {/* Dry Docking Stations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Dry Docking Stations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Station ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Facility</TableHead>
                <TableHead>Length (m)</TableHead>
                <TableHead>Width (m)</TableHead>
                <TableHead>Max Capacity (DWT)</TableHead>
                <TableHead>Suitable For</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dry_docking_stations.map((station) => (
                <TableRow key={station.station_id}>
                  <TableCell className="font-mono">{station.station_id}</TableCell>
                  <TableCell className="font-medium">{station.name}</TableCell>
                  <TableCell>{station.facility}</TableCell>
                  <TableCell>{station.length_m.toFixed(1)}</TableCell>
                  <TableCell>{station.width_m.toFixed(1)}</TableCell>
                  <TableCell>{station.max_capacity_dwt.toLocaleString()}</TableCell>
                  <TableCell className="text-harbor-muted">{station.suitable_for}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
