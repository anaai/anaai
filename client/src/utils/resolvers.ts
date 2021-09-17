import axios from 'axios';
import { MintedToken } from 'models/MintedToken.model';
import { Transformation, Transformations } from 'models/Transformations.model';
import { Contract } from 'web3-eth-contract';

export const resolveTokenByTokenId = async (
  contract: Contract,
  tokenId: string
): Promise<MintedToken> => {
  try {
    const tokenURI = await contract.methods.tokenURI(tokenId).call();
    const tokenMetadata = (await axios.get<MintedToken>(tokenURI)).data;
    return tokenMetadata;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const resolveTransformationById = (
  transformations: Transformations,
  transformationId: string
): Transformation | undefined =>
  transformations.find((transformation) => transformation.id === transformationId);
