import { images } from 'config/imageLoader/imageLoader';

export const transformationNames = [
  'ascii',
  'candy',
  'cartoonification',
  'feathers',
  'sketch'
] as const;

export type TransformationName = typeof transformationNames[number];

export type ImageName = keyof typeof images[TransformationName];
