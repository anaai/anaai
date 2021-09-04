import {
  createAddUserBoughtTokenEntitiesAction,
  createAddUserGeneratedTokenEntitiesAction
} from 'contexts/WalletContext/WalletContext.actions';
import { GalleryType } from 'models/ImageGallery.model';

export const mapGalleryTypeToTokenCollectionInjector = (
  galleryType: GalleryType
):
  | typeof createAddUserGeneratedTokenEntitiesAction
  | typeof createAddUserBoughtTokenEntitiesAction => {
  switch (galleryType) {
    case 'generated':
      return createAddUserGeneratedTokenEntitiesAction;
    case 'bought':
      return createAddUserBoughtTokenEntitiesAction;
  }
};
