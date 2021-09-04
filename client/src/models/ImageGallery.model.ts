export const galleryTypes = ['generated', 'bought'] as const;
export type GalleryTypes = typeof galleryTypes;
export type GalleryType = typeof galleryTypes[number];
