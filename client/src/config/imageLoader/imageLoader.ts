import baseDogo from 'assets/images/transformations/base/dogo.jpg';
import baseGril from 'assets/images/transformations/base/gril.jpg';
import baseLake from 'assets/images/transformations/base/lake.jpg';
import baseNature from 'assets/images/transformations/base/nature.jpg';

import candyDogo from 'assets/images/transformations/candy/dogo.jpg';
import candyGril from 'assets/images/transformations/candy/gril.jpg';
import candyLake from 'assets/images/transformations/candy/lake.jpg';
import candyNature from 'assets/images/transformations/candy/nature.jpg';

import feathersDogo from 'assets/images/transformations/feathers/dogo.jpg';
import feathersGril from 'assets/images/transformations/feathers/gril.jpg';
import feathersLake from 'assets/images/transformations/feathers/lake.jpg';
import feathersNature from 'assets/images/transformations/feathers/nature.jpg';

import sketchDogo from 'assets/images/transformations/sketch/dogo.jpg';
import sketchGril from 'assets/images/transformations/sketch/gril.jpg';
import sketchLake from 'assets/images/transformations/sketch/lake.jpg';
import sketchNature from 'assets/images/transformations/sketch/nature.jpg';

export const images = {
  base: {
    dogo: baseDogo,
    gril: baseGril,
    lake: baseLake,
    nature: baseNature
  },
  candy: {
    dogo: candyDogo,
    gril: candyGril,
    lake: candyLake,
    nature: candyNature
  },
  feathers: {
    dogo: feathersDogo,
    gril: feathersGril,
    lake: feathersLake,
    nature: feathersNature
  },
  sketch: {
    dogo: sketchDogo,
    gril: sketchGril,
    lake: sketchLake,
    nature: sketchNature
  },
  ascii: {
    dogo: sketchDogo,
    gril: sketchGril,
    lake: sketchLake,
    nature: sketchNature
  },
  cartoonification: {
    dogo: sketchDogo,
    gril: sketchGril,
    lake: sketchLake,
    nature: sketchNature
  }
} as const;
