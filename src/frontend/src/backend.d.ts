import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Port {
    id: bigint;
    region: string;
    country: string;
    name: string;
    size: string;
    geoPoints: Array<PortGeoLocation>;
    coordinates: string;
    warehouses: Array<string>;
}
export interface PortGeoLocation {
    latitude: string;
    name: string;
    type: string;
    description: string;
    longitude: string;
}
export interface Tugboat {
    id: bigint;
    year_built: bigint;
    engine_power_hp: bigint;
    length_m: bigint;
    flag: string;
    name: string;
    port: string;
    bollard_pull_ton: bigint;
}
export interface backendInterface {
    addGeoPoint(portId: bigint, name: string, description: string, type: string, latitude: string, longitude: string): Promise<void>;
    addPort(name: string, country: string, region: string, size: string, coordinates: string, geoPoints: Array<PortGeoLocation>, warehouses: Array<string>): Promise<bigint>;
    addPortOfTemaData(): Promise<void>;
    addTugboatsForTemaPort(): Promise<void>;
    addWarehouse(portId: bigint, warehouseName: string): Promise<void>;
    cleanUpBerthingData(): Promise<void>;
    getAllPorts(): Promise<Array<Port>>;
    getAllTugboats(): Promise<Array<Tugboat>>;
    getPortById(id: bigint): Promise<Port | null>;
    getPortOfTemaData(): Promise<Port>;
    getTugboatById(id: bigint): Promise<Tugboat | null>;
    getTugboatsByPort(portName: string): Promise<Array<Tugboat>>;
}
