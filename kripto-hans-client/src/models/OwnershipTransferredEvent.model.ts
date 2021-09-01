export interface OwnershipTransferredEvent {
  address: string;
  blockHash: string;
  blockNumber: number;
  logIndex: number;
  removed: boolean;
  transactionHash: string;
  transactionIndex: number;
  id: string;
  returnValues: ReturnValues;
  event: string;
  signature: string;
  raw: Raw;
}

interface ReturnValues {
  0: string;
  1: string;
  2: string;
  from: string;
  to: string;
  tokenId: string;
}

interface Raw {
  data: string;
  topics?: string[] | null;
}
