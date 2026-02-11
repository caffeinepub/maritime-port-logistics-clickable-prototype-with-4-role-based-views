// Legacy types for pages that reference old backend structure
// These are stubs since the backend has been replaced with Port of Tema data
export interface Vessel {
  id: bigint;
  name: string;
  imo: string;
  length: bigint;
  beam: bigint;
}

export interface Berth {
  id: bigint;
  name: string;
  maxLength: bigint;
  maxBeam: bigint;
}

export interface Tugboat {
  id: bigint;
  name: string;
  capacity: bigint;
}

export interface Assignment {
  id: bigint;
  vesselId: bigint;
  berthId: bigint;
  tugboatIds: bigint[];
  status: string;
}

export interface Alert {
  id: bigint;
  message: string;
  urgent: boolean;
}
