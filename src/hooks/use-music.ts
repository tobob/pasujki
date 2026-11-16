import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

import { setMusic } from '@/game/engine/sound';
import type { MusicId } from '@/game/types';

/** Plays `id` as the background loop while the calling screen is focused. */
export function useMusic(id: MusicId | null) {
  useFocusEffect(
    useCallback(() => {
      setMusic(id);
    }, [id]),
  );
}
