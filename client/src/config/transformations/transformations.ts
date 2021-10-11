import { images } from 'config/imageLoader/imageLoader';

export const transformationNames = [
  'ascii',
  'sketch',
  'candy',
  'feathers',
  'mosaic',
  'theScream',
  'udnie'
] as const;

export type TransformationName = typeof transformationNames[number];

export type ImageName = keyof typeof images[TransformationName];
