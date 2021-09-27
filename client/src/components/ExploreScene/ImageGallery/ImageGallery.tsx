import { Box } from '@material-ui/core';
import { useWallet } from 'contexts/WalletContext/WalletContext';
import { tokenIdsAscendingSorter } from 'utils/sorters';
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component';
import { useStyles } from './ImageGallery.styles';
import { useCallback, useEffect } from 'react';
import { resolveTokenByTokenId } from 'utils/resolvers';
import { createAddUserGeneratedTokenEntitiesAction } from 'contexts/WalletContext/WalletContext.actions';

export const ImageGallery: React.FC<Record<string, unknown>> = () => {
  const {
    state: {
      tokens: { generated: generatedTokens }
    }
  } = useWallet();

  const sortedTokenIds = Object.keys(generatedTokens).sort(tokenIdsAscendingSorter);

  const classes = useStyles();

  return (
    <Box className={classes.root} data-testid="ImageGallery-root-container">
      {sortedTokenIds.map((tokenId) => (
        <Box key={tokenId} className={classes.imageContainer}>
          {generatedTokens[tokenId] ? (
            <LazyLoadImage
              className={classes.image}
              alt={generatedTokens[tokenId]?.name}
              effect="blur"
              src={generatedTokens[tokenId]?.image}
            />
          ) : (
            <LazyLoadComponent>
              <TokenResolver tokenId={tokenId} />
            </LazyLoadComponent>
          )}
        </Box>
      ))}
    </Box>
  );
};

interface TokenResolverProps {
  tokenId: string;
}

const TokenResolver: React.FC<TokenResolverProps> = ({ tokenId }) => {
  const {
    state: { contract },
    dispatch
  } = useWallet();

  const resolveToken = useCallback(async () => {
    if (contract) {
      const resolvedToken = await resolveTokenByTokenId(contract, tokenId);
      dispatch(createAddUserGeneratedTokenEntitiesAction({ [tokenId]: resolvedToken }));
    }
  }, [contract, dispatch, tokenId]);

  useEffect(() => {
    resolveToken();
  }, [resolveToken]);

  return null;
};
