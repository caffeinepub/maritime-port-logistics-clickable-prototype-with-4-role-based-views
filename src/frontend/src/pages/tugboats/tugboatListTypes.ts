export interface TugboatSpecifications {
  bollard_pull_tonnes: number;
  gross_tonnage: number;
  length_m: number;
  beam_m: number;
  max_draught_m?: number;
  engine_power_kw?: number;
}

export interface TugboatData {
  id: string;
  name: string;
  imo_number: string;
  year_built: number;
  type: string;
  specifications: TugboatSpecifications;
  capabilities: string[];
  status: string;
  last_maintenance?: string;
}

export interface TemaFleetData {
  port: string;
  authority: string;
  fleet_last_updated: string;
  tugboats: TugboatData[];
}
