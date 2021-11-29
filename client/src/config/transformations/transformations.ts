import { images } from 'config/imageLoader/imageLoader';

export const transformationNames = [
  'ascii',
  'sketch',
  'candy',
  'feathers',
  'mosaic',
  'theScream',
  'udnie',
  'celebaDistill',
  'facePaint',
  'paprika'
] as const;

export const transformationDescriptions = {
  ascii:
    "Text art, also called ASCII art or keyboard art is a copy-pasteable digital age art form. It's about making text pictures with text symbols. Among the oldest known examples of ASCII art are the creations by computer-art pioneer Kenneth Knowlton from around 1966. ASCII art was invented, in large part, because early printers often lacked graphics ability and thus characters were used in place of graphic marks. Early computer games played on terminals frequently used ASCII art to simulate graphics, most notably the roguelike genre using ASCII art to visually represent dungeons and monsters within them.",
  sketch:
    'A sketch is traditionally a rough drawing or painting in which an artist notes down his preliminary ideas for a work that will eventually be realized with greater precision and detail. The term also applies to brief creative pieces that per se may have artistic merit. From the 18th century, however, sketch came to take on a new meaning, which has almost come to supersede the traditional one. The emphasis on freshness and spontaneity, which was an integral part of the Romantic attitude, the fact that there was a great increase in the number of amateur artists, and the growing appreciation of nature, accompanied by an expansion of facilities for travel, transformed the sketch into something regarded as an end in itself—a slight and unpretentious picture, in some simple medium (pen and ink, pencil, wash, or watercolour) recording a visual experience.',
  candy:
    'In fine art, especially painting, humans have mastered the skill to create unique visual experiences through composing a complex interplay between the content and style of an image. Neural Style Transfer is an artificial system based on a Deep Neural Network that creates artistic images of high perceptual quality. The system uses neural representations to separate and recombine content and style of arbitrary images, providing a neural algorithm for the creation of artistic images. Neural style transfer is an optimization technique used to take two images, a content image and a style reference image (such as an artwork by a famous painter) — and blend them together to create a new image from a content image by copying the style of the style image. The purpose of this algorithm is to transfer the textures, lines, shapes and other low level details of the image on to the content image, while keeping the high level details of the content image such as objects and their arrangements. This transformation allows you to explore abstract contemporary art for styling for your input image.',
  feathers:
    'In fine art, especially painting, humans have mastered the skill to create unique visual experiences through composing a complex interplay between the content and style of an image. Neural Style Transfer is an artificial system based on a Deep Neural Network that creates artistic images of high perceptual quality. The system uses neural representations to separate and recombine content and style of arbitrary images, providing a neural algorithm for the creation of artistic images. Neural style transfer is an optimization technique used to take two images, a content image and a style reference image (such as an artwork by a famous painter) — and blend them together to create a new image from a content image by copying the style of the style image. The purpose of this algorithm is to transfer the textures, lines, shapes and other low level details of the image on to the content image, while keeping the high level details of the content image such as objects and their arrangements. This transformation allows you to transform your input image into a cluster of many colored feathers.',
  mosaic:
    'In fine art, especially painting, humans have mastered the skill to create unique visual experiences through composing a complex interplay between the content and style of an image. Neural Style Transfer is an artificial system based on a Deep Neural Network that creates artistic images of high perceptual quality. The system uses neural representations to separate and recombine content and style of arbitrary images, providing a neural algorithm for the creation of artistic images. Neural style transfer is an optimization technique used to take two images, a content image and a style reference image (such as an artwork by a famous painter) — and blend them together to create a new image from a content image by copying the style of the style image. The purpose of this algorithm is to transfer the textures, lines, shapes and other low level details of the image on to the content image, while keeping the high level details of the content image such as objects and their arrangements. This transformation allows you to create beautiful mosaics.',
  theScream:
    'In fine art, especially painting, humans have mastered the skill to create unique visual experiences through composing a complex interplay between the content and style of an image. Neural Style Transfer is an artificial system based on a Deep Neural Network that creates artistic images of high perceptual quality. The system uses neural representations to separate and recombine content and style of arbitrary images, providing a neural algorithm for the creation of artistic images. Neural style transfer is an optimization technique used to take two images, a content image and a style reference image (such as an artwork by a famous painter) — and blend them together to create a new image from a content image by copying the style of the style image. The purpose of this algorithm is to transfer the textures, lines, shapes and other low level details of the image on to the content image, while keeping the high level details of the content image such as objects and their arrangements. The Scream is the popular name given to a composition created by Norwegian Expressionist artist Edvard Munch in 1893. Munch recalled that he had been out for a walk at sunset when suddenly the setting sun\'s light turned the clouds "a blood red". He sensed an "infinite scream passing through nature". Scholars have located the spot to a fjord overlooking Oslo and have suggested other explanations for the unnaturally orange sky, ranging from the effects of a volcanic eruption to a psychological reaction by Munch to his sister’s commitment at a nearby lunatic asylum. This transformation allows you to create content with infinite scream passed through it.',
  udnie:
    "In fine art, especially painting, humans have mastered the skill to create unique visual experiences through composing a complex interplay between the content and style of an image. Neural Style Transfer is an artificial system based on a Deep Neural Network that creates artistic images of high perceptual quality. The system uses neural representations to separate and recombine content and style of arbitrary images, providing a neural algorithm for the creation of artistic images. Neural style transfer is an optimization technique used to take two images, a content image and a style reference image (such as an artwork by a famous painter) — and blend them together to create a new image from a content image by copying the style of the style image. The purpose of this algorithm is to transfer the textures, lines, shapes and other low level details of the image on to the content image, while keeping the high level details of the content image such as objects and their arrangements. Udnie (Young American Girl, The Dance) is an oil on canvas painting made by Francis Picabia in 1913. It is currently held at Musée National d'Art Moderne, Paris. Udnie is thought to have been inspired by a ballerina. Strangely, in Picabia’s bid to escape reality, the bounds to this work seem set by its title. But “Udnie,” perhaps an anagram of “Nudie,” has a distinct erotic overtone which is seen later in more overtly sexual works such as I See Again in Memory My Dear Udnie. This transformation allows you to transform your input image with mesmerising abstract art.",
  celebaDistill:
    'Transforming photos of real-world scenes into anime style images is a meaningful and challenging task in terms of computer vision and artistic style transfer. This transformation uses a model initialy trained for transforming images into anime images. These kind of models can be trained on different data sets to create different results.',
  facePaint:
    'Transforming photos of real-world scenes into anime style images is a meaningful and challenging task in terms of computer vision and artistic style transfer. This transformation uses a model initialy trained for transforming images into anime images. These kind of models can be trained on different data sets to create different results.',
  paprika:
    'Transforming photos of real-world scenes into anime style images is a meaningful and challenging task in terms of computer vision and artistic style transfer. This transformation uses a model initialy trained for transforming images into anime images. These kind of models can be trained on different data sets to create different results.Transforming photos of real-world scenes into anime style images is a meaningful and challenging task in terms of computer vision and artistic style transfer. This transformation uses a model initialy trained for transforming images into anime images. These kind of models can be trained on different data sets to create different results.'
} as const;

export type TransformationName = typeof transformationNames[number];

export type ImageName = keyof typeof images[TransformationName];
