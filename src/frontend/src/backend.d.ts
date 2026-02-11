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
export interface backendInterface {
    addGeoPoint(portId: bigint, name: string, description: string, type: string, latitude: string, longitude: string): Promise<void>;
    addPort(name: string, country: string, region: string, size: string, coordinates: string, geoPoints: Array<PortGeoLocation>, warehouses: Array<string>): Promise<bigint>;
    addPortOfTemaData(): Promise<void>;
    addWarehouse(portId: bigint, warehouseName: string): Promise<void>;
    cleanUpBerthingData(): Promise<void>;
    getAllPorts(): Promise<Array<Port>>;
    getPortById(id: bigint): Promise<Port | null>;
    getPortOfTemaData(): Promise<Port>;
}
