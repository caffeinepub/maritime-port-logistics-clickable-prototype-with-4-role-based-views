import { useActor } from '../hooks/useActor';

export const QUERY_KEYS = {
  vessels: ['vessels'],
  vessel: (id: bigint) => ['vessel', id.toString()],
  berths: ['berths'],
  berth: (id: bigint) => ['berth', id.toString()],
  tugboats: ['tugboats'],
  tugboat: (id: bigint) => ['tugboat', id.toString()],
  assignments: ['assignments'],
  assignment: (id: bigint) => ['assignment', id.toString()],
  alerts: ['alerts'],
  alert: (id: bigint) => ['alert', id.toString()],
  portOfTema: ['portOfTema'],
  allPorts: ['allPorts'],
};

export function useBackendActor() {
  return useActor();
}
