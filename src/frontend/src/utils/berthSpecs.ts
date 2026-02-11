/**
 * Utility functions for handling berth specifications display and validation.
 * Provides helpers to detect unspecified berth specs and format them appropriately.
 */

/**
 * Checks if a berth specification value is unspecified (0 or empty).
 * Berths created with name-only data will have maxLength and maxBeam set to default values.
 */
export function isSpecUnspecified(value: bigint | number): boolean {
  const numValue = typeof value === 'bigint' ? Number(value) : value;
  return numValue === 0;
}

/**
 * Formats a berth specification value for display.
 * Returns a placeholder "-" if the value is unspecified, otherwise returns the value with unit.
 */
export function formatBerthSpec(value: bigint | number, unit: string = 'm'): string {
  if (isSpecUnspecified(value)) {
    return '-';
  }
  return `${value.toString()}${unit}`;
}

/**
 * Checks if berth has meaningful specifications for compatibility checks.
 * Returns false if either maxLength or maxBeam is unspecified.
 */
export function hasMeaningfulSpecs(berth: { maxLength: bigint; maxBeam: bigint }): boolean {
  return !isSpecUnspecified(berth.maxLength) && !isSpecUnspecified(berth.maxBeam);
}

/**
 * Performs compatibility check between vessel and berth dimensions.
 * Returns null if berth specs are not meaningful, otherwise returns compatibility result.
 */
export function checkCompatibility(
  vessel: { length: bigint; beam: bigint },
  berth: { maxLength: bigint; maxBeam: bigint }
): { lengthOk: boolean; beamOk: boolean } | null {
  if (!hasMeaningfulSpecs(berth)) {
    return null;
  }
  
  return {
    lengthOk: vessel.length <= berth.maxLength,
    beamOk: vessel.beam <= berth.maxBeam,
  };
}
