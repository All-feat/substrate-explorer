// Copyright 2017-2022 @polkadot/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { PalletArtistIdentityMetadata } from '@polkadot/app-artists/types';

import { createNamedHook } from './createNamedHook';
import { useApi } from './useApi';
import { useCall } from './useCall';

function useArtistIdentityImpl (accountId: string): PalletArtistIdentityMetadata | undefined {
  const { api } = useApi();
  const query = api.query.artistIdentity.artistMetadata;
  const params = [accountId];

  return useCall<PalletArtistIdentityMetadata>(query, params);
}

export const useArtistIdentity = createNamedHook('useArtistIdentity', useArtistIdentityImpl);
