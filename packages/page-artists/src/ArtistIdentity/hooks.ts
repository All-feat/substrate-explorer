// Copyright 2017-2022 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ApiPromise } from '@polkadot/api';
import { useCall, useMapEntries } from '@polkadot/react-hooks';

import { PalletArtistIdentityMetadata, PalletArtistsArtistInfo, StorageMap } from './types';

export function useArtistIdentity (api: ApiPromise, address: string) {
  return useCall<PalletArtistIdentityMetadata>(api.query.artistIdentity.artistMetadata, [address]);
}

export function useArtists (api: ApiPromise): StorageMap<PalletArtistsArtistInfo>[] | undefined {
  return useMapEntries(api.query.artists.artists);
}
