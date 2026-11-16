/** STUB — replaced by the levels agent. Keep `export const WORLDS: World[]`. */
import { WORLD_TINTS } from './palette';
import type { World } from './types';

export const WORLDS: World[] = [
  {
    id: 1, title_pl: 'Takie same', title_en: 'The same', tint: WORLD_TINTS[0],
    levels: [{
      id: 'w1-l1', world: 1, title_pl: 'Pierwsze kroki', title_en: 'First steps', age: '2+',
      rounds: [
        { prompt: { kind: 'item', id: 'cat' }, targets: [{ id: 'cat' }, null, null, { id: 'ball' }], answer: 0, rule: 'same', hint_pl: 'Gdzie jest taki sam kotek?', hint_en: 'Where is the same cat?' },
        { prompt: { kind: 'color', id: 'red' }, targets: [null, { id: 'strawberry' }, { id: 'banana' }, null], answer: 1, rule: 'color', hint_pl: 'Co jest czerwone?', hint_en: 'What is red?' },
      ],
    }],
  },
];
