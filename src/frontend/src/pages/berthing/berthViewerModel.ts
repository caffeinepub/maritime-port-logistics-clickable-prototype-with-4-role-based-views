// Frontend-only berth viewer model with occupancy and schedule data
import type { BerthingPoint } from '../../types/temaPort';

export type VesselType = 'Container' | 'Tanker' | 'Bulk' | 'Ro-Ro' | 'General Cargo' | 'Specialized';
export type BerthSize = 'Small' | 'Medium' | 'Large' | 'Extra Large';

export interface BerthWithSchedule extends BerthingPoint {
  size: BerthSize;
  occupancy: 'Available' | 'Occupied' | 'Reserved';
  vessel_type?: VesselType;
  arrival_time?: string;
  departure_time?: string;
  vessel_name?: string;
}

// Determine berth size based on draft depth
function determineBerthSize(draft_m: number): BerthSize {
  if (draft_m >= 15) return 'Extra Large';
  if (draft_m >= 12) return 'Large';
  if (draft_m >= 10) return 'Medium';
  return 'Small';
}

// Map use category to vessel type
function mapUseToVesselType(use: string): VesselType {
  const useLower = use.toLowerCase();
  if (useLower.includes('container')) return 'Container';
  if (useLower.includes('tanker') || useLower.includes('petroleum') || useLower.includes('oil') || useLower.includes('crude')) return 'Tanker';
  if (useLower.includes('bulk') || useLower.includes('clinker') || useLower.includes('alumina')) return 'Bulk';
  if (useLower.includes('ro-ro')) return 'Ro-Ro';
  if (useLower.includes('general')) return 'General Cargo';
  return 'Specialized';
}

// Generate mock schedule data for demonstration
function generateMockSchedule(id: string): { occupancy: BerthWithSchedule['occupancy']; vessel_type?: VesselType; arrival_time?: string; departure_time?: string; vessel_name?: string } {
  // Deterministic mock data based on berth ID
  const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const isOccupied = hash % 3 === 0;
  const isReserved = hash % 3 === 1;
  
  if (isOccupied) {
    const vesselTypes: VesselType[] = ['Container', 'Tanker', 'Bulk', 'Ro-Ro', 'General Cargo'];
    const vesselType = vesselTypes[hash % vesselTypes.length];
    const vesselNames = ['MV Atlantic Star', 'MSC Harmony', 'Maersk Explorer', 'CMA CGM Neptune', 'COSCO Fortune'];
    const vesselName = vesselNames[hash % vesselNames.length];
    
    const arrivalHour = 6 + (hash % 12);
    const departureHour = arrivalHour + 4 + (hash % 8);
    
    return {
      occupancy: 'Occupied',
      vessel_type: vesselType,
      vessel_name: vesselName,
      arrival_time: `2026-02-11T${String(arrivalHour).padStart(2, '0')}:00:00`,
      departure_time: `2026-02-11T${String(departureHour).padStart(2, '0')}:30:00`,
    };
  } else if (isReserved) {
    const vesselTypes: VesselType[] = ['Container', 'Tanker', 'Bulk'];
    const vesselType = vesselTypes[hash % vesselTypes.length];
    const vesselNames = ['MV Pacific Dawn', 'Ever Given', 'Seaspan Trader'];
    const vesselName = vesselNames[hash % vesselNames.length];
    
    const arrivalHour = 14 + (hash % 8);
    const departureHour = arrivalHour + 6;
    
    return {
      occupancy: 'Reserved',
      vessel_type: vesselType,
      vessel_name: vesselName,
      arrival_time: `2026-02-11T${String(arrivalHour).padStart(2, '0')}:00:00`,
      departure_time: `2026-02-12T${String(departureHour % 24).padStart(2, '0')}:00:00`,
    };
  }
  
  return { occupancy: 'Available' };
}

// Augment berthing points with schedule data
export function augmentBerthingPoints(berthingPoints: BerthingPoint[]): BerthWithSchedule[] {
  return berthingPoints.map((berth) => {
    const size = determineBerthSize(berth.draft_m);
    const schedule = generateMockSchedule(berth.id);
    
    return {
      ...berth,
      size,
      ...schedule,
    };
  });
}

// Filter helpers
export function filterAvailableOnly(berths: BerthWithSchedule[], availableOnly: boolean): BerthWithSchedule[] {
  if (!availableOnly) return berths;
  return berths.filter((b) => b.occupancy === 'Available');
}

export function filterBySize(berths: BerthWithSchedule[], sizes: BerthSize[]): BerthWithSchedule[] {
  if (sizes.length === 0) return berths;
  return berths.filter((b) => sizes.includes(b.size));
}

export function filterByVesselType(berths: BerthWithSchedule[], vesselTypes: VesselType[]): BerthWithSchedule[] {
  if (vesselTypes.length === 0) return berths;
  return berths.filter((b) => {
    const berthVesselType = mapUseToVesselType(b.use);
    return vesselTypes.includes(berthVesselType);
  });
}

export function filterByDateRange(berths: BerthWithSchedule[], startDate?: Date, endDate?: Date): BerthWithSchedule[] {
  if (!startDate && !endDate) return berths;
  
  return berths.filter((b) => {
    if (!b.arrival_time && !b.departure_time) return true; // Include available berths
    
    const arrival = b.arrival_time ? new Date(b.arrival_time) : null;
    const departure = b.departure_time ? new Date(b.departure_time) : null;
    
    if (startDate && endDate) {
      // Check if berth schedule overlaps with date range
      if (arrival && departure) {
        return (arrival <= endDate && departure >= startDate);
      }
    } else if (startDate) {
      // Check if berth is available after start date
      if (departure) {
        return departure >= startDate;
      }
    } else if (endDate) {
      // Check if berth is available before end date
      if (arrival) {
        return arrival <= endDate;
      }
    }
    
    return true;
  });
}
