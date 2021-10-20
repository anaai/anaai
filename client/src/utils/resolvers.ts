import axios from 'axios';
import { MintedToken } from 'models/MintedToken.model';
import { Contract } from 'web3-eth-contract';

import { Transformations, Transformation } from 'models/Transformations.model';
import { TransformationName } from 'config/transformations/transformations';

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

export const resolveTransformationByTransformationName = (
  transformations: Transformations,
  transformationName: TransformationName
): Transformation => {
  return transformations.find(
    (transformation) => transformation.name === transformationName
  ) as Transformation;
};
