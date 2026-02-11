// Frontend types for Port of Tema dataset
export interface PortMetadata {
  port: string;
  location: string;
  last_updated: string;
}

export interface Infrastructure {
  commercial_berths: number;
  specialized_berths: number;
  offshore_facilities: number;
  dry_docks: number;
}

export interface BerthingPoint {
  id: string;
  name: string;
  location: string;
  draft_m: number;
  use: string;
}

export interface DryDockingStation {
  station_id: string;
  name: string;
  facility: string;
  length_m: number;
  width_m: number;
  max_capacity_dwt: number;
  suitable_for: string;
}

// Grouped infrastructure types
export interface Terminal3MPSBerth {
  berth: string;
  draft: number;
  type: string;
}

export interface MainHarbourQuayBerth {
  berth: string;
  quay: string;
  draft: number;
}

export interface SpecializedIndustrialBerth {
  name: string;
  location: string;
  draft: number;
  cargo: string;
}

export interface TemaShipyardDock {
  dock: string;
  dimensions: string;
  capacity: string;
  primary_use: string;
}

export interface GroupedInfrastructure {
  terminal_3_mps: Terminal3MPSBerth[];
  main_harbour_quays: MainHarbourQuayBerth[];
  specialized_industrial: SpecializedIndustrialBerth[];
  tema_shipyard: TemaShipyardDock[];
}

export interface PortOfTemaData {
  metadata: PortMetadata;
  infrastructure: Infrastructure;
  berthing_points: BerthingPoint[];
  dry_docking_stations: DryDockingStation[];
  grouped_infrastructure: GroupedInfrastructure;
}
