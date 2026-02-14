import { TugboatList } from './TugboatList';
import { temaFleetData } from '../../data/temaFleet';

export function TugboatsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-harbor-light">Tugboat Fleet</h1>
          <p className="text-harbor-muted">Port of Tema tugboat operations</p>
        </div>
        <img src="/assets/generated/tugboat-icon.dim_256x256.png" alt="Tugboat" className="h-16 w-16 opacity-50" />
      </div>

      <TugboatList fleetData={temaFleetData} />
    </div>
  );
}
