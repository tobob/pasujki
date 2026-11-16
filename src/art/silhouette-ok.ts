import type { ItemId } from '@/game/types';

/**
 * Items whose flat silhouette (<ItemArt silhouette />) is clearly recognisable on its own — safe
 * for shadow rounds. Reviewed on tools/art/silhouette-sheet.png.
 *
 * Deliberately EXCLUDED (ambiguous as a shadow): plain round/oval fruit & veg (orange, lemon,
 * tomato, plum, egg, ball, blueberries), round-head animals (pig, tiger, lion, monkey, owl, zebra,
 * ladybug, bee, chick, calf, lamb, octopus), generic lumps (bread, honey, hay, sandwich, cheese,
 * peas, soap, pillow, book, block, crayon, watermelon), house-like homes (doghouse, barn, hutch,
 * beehive, nest, pond, iceberg, kennel_bowl), and look-alike pairs: kitten≈cat, puppy≈dog,
 * duckling≈duck, teddy≈bear, crow≈bird/parrot, fox≈cat.
 */
export const SILHOUETTE_CLEAR: ItemId[] = [
  // animals
  'cat', 'dog', 'cow', 'horse', 'hen', 'duck', 'frog', 'fish', 'elephant', 'giraffe', 'butterfly',
  'bear', 'rabbit', 'mouse', 'penguin', 'snail', 'turtle', 'squirrel', 'flamingo', 'whale', 'parrot',
  'worm', 'bird', 'hedgehog', 'dinosaur',
  // food & nature
  'strawberry', 'banana', 'apple', 'pear', 'grapes', 'carrot', 'bone', 'leaf', 'acorn', 'milk', 'corn',
  'cherry', 'mushroom', 'cake', 'pumpkin', 'tree', 'sea',
  // things
  'sun', 'moon', 'star', 'cloud', 'umbrella', 'raindrop', 'snowflake', 'snowman', 'scarf', 'sunglasses',
  'boot', 'hat', 'mitten', 'cup', 'spoon', 'toothbrush', 'bed', 'car', 'boat', 'airplane', 'train',
  'bicycle', 'flower', 'house', 'key', 'drum', 'balloon', 'sock', 'shoe', 'clock', 'lamp', 'heart_toy',
  'gift', 'party_hat', 'kite', 'rainbow', 'bucket', 'shovel',
];
