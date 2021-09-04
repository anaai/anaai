import { Box } from '@material-ui/core';
import { useWallet } from 'contexts/WalletContext/WalletContext';
import { GalleryType, galleryTypes } from 'models/ImageGallery.model';
import { tokenIdsAscendingSorter } from 'utils/sorters';
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component';
import { useStyles } from './ImageGallery.styles';
import { useCallback, useEffect } from 'react';
import { resolveTokenByTokenId } from 'utils/resolvers';
import { mapGalleryTypeToTokenCollectionInjector } from 'utils/mappers';

interface ImageGalleryProps {
  galleryType: GalleryType;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ galleryType }) => {
  const {
    state: { tokens }
  } = useWallet();

  const tokenCollection = tokens[galleryType];
  const sortedTokenIds = Object.keys(tokenCollection).sort(tokenIdsAscendingSorter);

  const classes = useStyles();

  return (
    <Box className={classes.root} data-testid="root-container">
      {sortedTokenIds.map((tokenId) => (
        <Box
          key={tokenId + (tokenCollection[tokenId] ? '1' : '2')}
          className={classes.imageContainer}
        >
          {tokenCollection[tokenId] ? (
            <LazyLoadImage
              className={classes.image}
              alt={tokenCollection[tokenId]?.name}
              effect="blur"
              src={tokenCollection[tokenId]?.image}
            />
          ) : (
            <LazyLoadComponent>
              <TokenResolver tokenId={tokenId} galleryType={galleryType} />
            </LazyLoadComponent>
          )}
        </Box>
      ))}
    </Box>
  );
};

interface TokenResolverProps {
  tokenId: string;
  galleryType: GalleryType;
}

const TokenResolver: React.FC<TokenResolverProps> = ({ tokenId, galleryType }) => {
  const {
    state: { contract },
    dispatch
  } = useWallet();

  const resolveToken = useCallback(async () => {
    if (contract) {
      const resolvedToken = await resolveTokenByTokenId(contract, tokenId);
      const resolvedTokenInjector = mapGalleryTypeToTokenCollectionInjector(galleryType);
      dispatch(resolvedTokenInjector({ [tokenId]: resolvedToken }));
    }
  }, [contract, dispatch, galleryType, tokenId]);

  useEffect(() => {
    resolveToken();
  }, [resolveToken]);

  return null;
};
