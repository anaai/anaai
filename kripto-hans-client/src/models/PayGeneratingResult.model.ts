export interface PayGeneratingResult {
  blockHash: string;
  blockNumber: number;
  contractAddress?: null;
  cumulativeGasUsed: number;
  effectiveGasPrice: string;
  from: string;
  gasUsed: number;
  logsBloom: string;
  status: boolean;
  to: string;
  transactionHash: string;
  transactionIndex: number;
  type: string;
  events: Events;
}

interface Events {
  ImageGenerationPaid: ImageGenerationPaid;
}

interface ImageGenerationPaid {
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
  sender: string;
  value: string;
  imageURL: string;
}

interface Raw {
  data: string;
  topics?: string[] | null;
}
