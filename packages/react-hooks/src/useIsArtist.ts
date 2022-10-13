// Copyright 2017-2022 @polkadot/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useCallback } from 'react';

import { createNamedHook } from './createNamedHook';
import { useArtists } from './useArtists';

function useIsArtistImpl (address?: string | null): () => boolean {
  const artists = useArtists();

  const isArtist = useCallback(() => {
    if (!artists || !address) {
      return false;
    }

    for (const [{ args: [accountId] }] of artists) {
      if (accountId.toString() === address) {
        return true;
      }
    }

    return false;
  }, [address, artists]);

  return isArtist;
}

export const useIsArtist = createNamedHook('useIsArtist', useIsArtistImpl);
