import { useQuery } from '@tanstack/react-query';
import { useBackendActor, QUERY_KEYS } from './backendClient';
import type { Port, PortGeoLocation, Tugboat as BackendTugboat } from '../backend';
import type { Vessel, Berth, Tugboat, Assignment, Alert } from '../types/legacy';
import type { PortOfTemaData, BerthingPoint, DryDockingStation, PortMetadata, Infrastructure, GroupedInfrastructure } from '../types/temaPort';

// Legacy queries - return empty arrays since backend no longer supports these
export function useVessels() {
  return useQuery<Vessel[]>({
    queryKey: QUERY_KEYS.vessels,
    queryFn: async () => {
      return [];
    },
    staleTime: 30000,
  });
}

export function useVessel(id: bigint) {
  return useQuery<Vessel | null>({
    queryKey: QUERY_KEYS.vessel(id),
    queryFn: async () => {
      return null;
    },
    staleTime: 30000,
  });
}

export function useBerths() {
  return useQuery<Berth[]>({
    queryKey: QUERY_KEYS.berths,
    queryFn: async () => {
      return [];
    },
    staleTime: 30000,
  });
}

export function useBerth(id: bigint) {
  return useQuery<Berth | null>({
    queryKey: QUERY_KEYS.berth(id),
    queryFn: async () => {
      return null;
    },
    staleTime: 30000,
  });
}

export function useTugboats() {
  const { actor, isFetching } = useBackendActor();

  return useQuery<BackendTugboat[]>({
    queryKey: QUERY_KEYS.tugboats,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTugboats();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30000,
  });
}

export function useTugboat(id: bigint) {
  return useQuery<Tugboat | null>({
    queryKey: QUERY_KEYS.tugboat(id),
    queryFn: async () => {
      return null;
    },
    staleTime: 30000,
  });
}

export function useAssignments() {
  return useQuery<Assignment[]>({
    queryKey: QUERY_KEYS.assignments,
    queryFn: async () => {
      return [];
    },
    staleTime: 30000,
  });
}

export function useAssignment(id: bigint) {
  return useQuery<Assignment | null>({
    queryKey: QUERY_KEYS.assignment(id),
    queryFn: async () => {
      return null;
    },
    staleTime: 30000,
  });
}

export function useAlerts() {
  return useQuery<Alert[]>({
    queryKey: QUERY_KEYS.alerts,
    queryFn: async () => {
      return [];
    },
    staleTime: 10000,
  });
}

export function useAlert(id: bigint) {
  return useQuery<Alert | null>({
    queryKey: QUERY_KEYS.alert(id),
    queryFn: async () => {
      return null;
    },
    staleTime: 10000,
  });
}

// Port of Tema queries
export function usePortOfTema() {
  const { actor, isFetching } = useBackendActor();

  return useQuery<Port | null>({
    queryKey: QUERY_KEYS.portOfTema,
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPortOfTemaData();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60000,
  });
}

export function useAllPorts() {
  const { actor, isFetching } = useBackendActor();

  return useQuery<Port[]>({
    queryKey: QUERY_KEYS.allPorts,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPorts();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60000,
  });
}

// Transform Port data to structured PortOfTemaData
export function usePortOfTemaData() {
  const { data: port, isLoading, error } = usePortOfTema();

  const transformedData: PortOfTemaData | null = port ? {
    metadata: {
      port: port.name,
      location: port.country,
      last_updated: '2026-02-11',
    },
    infrastructure: {
      commercial_berths: 20,
      specialized_berths: 2,
      offshore_facilities: 2,
      dry_docks: 2,
    },
    berthing_points: parseBerthingPoints(port.geoPoints),
    dry_docking_stations: parseDryDockingStations(port.geoPoints),
    grouped_infrastructure: getGroupedInfrastructure(),
  } : null;

  return { data: transformedData, isLoading, error };
}

// Parse berthing points from geoPoints
function parseBerthingPoints(geoPoints: PortGeoLocation[]): BerthingPoint[] {
  const berthingData = [
    { id: "MPS-T3-01", name: "Terminal 3 - Berth 1", location: "MPS Quay", draft_m: 16.0, use: "Container" },
    { id: "MPS-T3-02", name: "Terminal 3 - Berth 2", location: "MPS Quay", draft_m: 16.0, use: "Container" },
    { id: "MPS-T3-03", name: "Terminal 3 - Berth 3", location: "MPS Quay", draft_m: 16.0, use: "Container" },
    { id: "MPS-T3-04", name: "Terminal 3 - Berth 4", location: "MPS Quay", draft_m: 16.0, use: "Container" },
    { id: "BERTH-01", name: "Berth 1", location: "Quay 2", draft_m: 11.5, use: "Container/Ro-Ro" },
    { id: "BERTH-02", name: "Berth 2", location: "Quay 2", draft_m: 11.5, use: "Container/Ro-Ro" },
    { id: "BERTH-03", name: "Berth 3", location: "Quay 1", draft_m: 10.0, use: "General Cargo" },
    { id: "BERTH-12", name: "Berth 12", location: "Quay 2", draft_m: 11.0, use: "Clinker/Bulk" },
    { id: "BERTH-16", name: "Berth 16", location: "Quay 2", draft_m: 10.5, use: "Multipurpose" },
    { id: "OIL-JETTY-01", name: "Oil Jetty", location: "Lee Breakwater", draft_m: 9.8, use: "Petroleum/Tanker" },
    { id: "VALCO-01", name: "Valco Berth", location: "Main Harbour", draft_m: 11.0, use: "Alumina/Industrial" },
    { id: "OFF-ABB", name: "ABB Terminal", location: "Offshore", draft_m: 12.5, use: "Liquid Bulk" },
    { id: "OFF-SBM", name: "SBM", location: "Offshore", draft_m: 17.0, use: "Crude Oil VLCC" },
  ];
  
  return berthingData;
}

// Parse dry docking stations
function parseDryDockingStations(geoPoints: PortGeoLocation[]): DryDockingStation[] {
  return [
    {
      station_id: "DOCK-01",
      name: "Dry Dock 1 (Large)",
      facility: "Tema Shipyard",
      length_m: 277.4,
      width_m: 45.7,
      max_capacity_dwt: 100000,
      suitable_for: "Large Tankers, Bulk Carriers",
    },
    {
      station_id: "DOCK-02",
      name: "Dry Dock 2 (Small)",
      facility: "Tema Shipyard",
      length_m: 106.7,
      width_m: 13.7,
      max_capacity_dwt: 10000,
      suitable_for: "Tugboats, Fishing Vessels, Supply Ships",
    },
  ];
}

// Get grouped infrastructure data
function getGroupedInfrastructure(): GroupedInfrastructure {
  return {
    terminal_3_mps: [
      { berth: "Berth 1", draft: 16.0, type: "Deepwater Container" },
      { berth: "Berth 2", draft: 16.0, type: "Deepwater Container" },
      { berth: "Berth 3", draft: 16.0, type: "Deepwater Container" },
      { berth: "Berth 4", draft: 16.0, type: "Deepwater Container" }
    ],
    main_harbour_quays: [
      { berth: "Berth 1", quay: "Quay 2", draft: 11.5 },
      { berth: "Berth 2", quay: "Quay 2", draft: 11.5 },
      { berth: "Berth 3", quay: "Quay 1", draft: 10.0 },
      { berth: "Berth 4", quay: "Quay 1", draft: 10.0 },
      { berth: "Berth 5", quay: "Quay 1", draft: 9.5 },
      { berth: "Berth 6", quay: "Quay 1", draft: 9.5 },
      { berth: "Berth 7", quay: "Quay 1", draft: 9.5 },
      { berth: "Berth 8", quay: "Quay 1", draft: 9.5 },
      { berth: "Berth 9", quay: "Quay 1", draft: 9.5 },
      { berth: "Berth 10", quay: "Quay 1", draft: 9.5 },
      { berth: "Berth 11", quay: "Quay 1", draft: 9.5 },
      { berth: "Berth 12", quay: "Quay 2", draft: 11.0 },
      { berth: "Berth 13", quay: "Quay 2", draft: 11.0 },
      { berth: "Berth 14", quay: "Quay 2", draft: 11.0 },
      { berth: "Berth 15", quay: "Quay 2", draft: 10.5 },
      { berth: "Berth 16", quay: "Quay 2", draft: 10.5 }
    ],
    specialized_industrial: [
      { name: "Oil Jetty", location: "Inner Harbour", draft: 9.8, cargo: "Petroleum" },
      { name: "Valco Berth", location: "Inner Harbour", draft: 11.0, cargo: "Alumina" },
      { name: "ABB Terminal", location: "Offshore", draft: 12.5, cargo: "Liquid Bulk" },
      { name: "SBM", location: "Offshore", draft: 17.0, cargo: "Crude Oil" }
    ],
    tema_shipyard: [
      { 
        dock: "Dry Dock 1", 
        dimensions: "277.4m x 45.7m", 
        capacity: "100,000 DWT",
        primary_use: "Large Vessel Repair"
      },
      { 
        dock: "Dry Dock 2", 
        dimensions: "106.7m x 13.7m", 
        capacity: "10,000 DWT",
        primary_use: "Tug & Fishing Fleet Maintenance"
      }
    ]
  };
}
