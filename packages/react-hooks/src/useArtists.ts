// Copyright 2017-2022 @polkadot/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { PalletArtistsArtistInfo } from '@polkadot/app-artists/types';
import { Option, StorageKey } from '@polkadot/types';

import { createNamedHook } from './createNamedHook';
import { useApi } from './useApi';
import { useMapEntries } from './useMapEntries';

type StorageMap = [StorageKey, Option<PalletArtistsArtistInfo>]

function useArtistsImpl (): StorageMap[] | undefined {
  const { api } = useApi();

  return useMapEntries(api.query.artists.artists);
}

export const useArtists = createNamedHook('useArtists', useArtistsImpl);
