/**
 * The ONE dominant fill colour each illustration uses (exact COLORS value). Must agree with
 * src/game/item-attributes.ts (levels agent). tools/art/render.mjs verifies every drawing
 * actually contains this hex as a fill.
 */
import type { ColorId, ItemId } from '@/game/types';

export const ITEM_DOMINANT: Record<ItemId, ColorId> = {
  // animals
  cat: 'orange', dog: 'brown', cow: 'white', pig: 'pink', sheep: 'white', horse: 'brown', hen: 'white',
  duck: 'yellow', frog: 'green', fish: 'orange', elephant: 'grey', lion: 'yellow', giraffe: 'yellow',
  zebra: 'white', tiger: 'orange', ladybug: 'red', bee: 'yellow', butterfly: 'purple', bear: 'brown',
  rabbit: 'grey', mouse: 'grey', owl: 'brown', penguin: 'black', monkey: 'brown', snail: 'orange',
  turtle: 'green', squirrel: 'orange', flamingo: 'pink', whale: 'blue', parrot: 'red',
  // babies
  chick: 'yellow', kitten: 'orange', puppy: 'brown', lamb: 'white', calf: 'white', duckling: 'yellow',
  // food
  strawberry: 'red', banana: 'yellow', lemon: 'yellow', orange: 'orange', apple: 'red', pear: 'green',
  grapes: 'purple', carrot: 'orange', cheese: 'yellow', bone: 'white', honey: 'orange', leaf: 'green',
  acorn: 'brown', milk: 'white', watermelon: 'red', blueberries: 'blue', corn: 'yellow', bread: 'brown',
  egg: 'white', worm: 'pink',
  // homes
  doghouse: 'red', beehive: 'yellow', nest: 'brown', pond: 'blue', barn: 'red', iceberg: 'white',
  tree: 'green', sea: 'blue', hutch: 'brown', kennel_bowl: 'blue',
  // things
  ball: 'blue', sun: 'yellow', moon: 'yellow', star: 'yellow', cloud: 'white', umbrella: 'purple',
  raindrop: 'blue', snowflake: 'blue', snowman: 'white', scarf: 'red', sunglasses: 'black', boot: 'yellow',
  hat: 'blue', mitten: 'purple', cup: 'blue', spoon: 'grey', toothbrush: 'green', soap: 'pink', bed: 'blue',
  pillow: 'white', car: 'red', boat: 'orange', airplane: 'blue', train: 'green', bicycle: 'green',
  flower: 'pink', house: 'yellow', key: 'grey', drum: 'red', balloon: 'red', book: 'green', crayon: 'purple',
  sock: 'green', shoe: 'blue', teddy: 'brown', clock: 'blue', lamp: 'orange', tomato: 'red', pumpkin: 'orange',
  heart_toy: 'pink',
  // v0.2
  gift: 'red', block: 'blue', party_hat: 'purple', crow: 'black', hay: 'yellow', bird: 'blue', kite: 'orange',
  rainbow: 'red', sandwich: 'brown', cake: 'pink', bucket: 'yellow', shovel: 'red', mushroom: 'red',
  cherry: 'red', plum: 'purple', peas: 'green', fox: 'orange', hedgehog: 'brown', octopus: 'purple',
  dinosaur: 'green',
};
