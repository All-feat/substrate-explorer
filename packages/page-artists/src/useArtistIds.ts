// Copyright 2017-2022 @polkadot/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { StorageKey } from '@polkadot/types';

import { createNamedHook, useApi, useMapKeys } from '@polkadot/react-hooks';
import {AccountId} from "@polkadot/types/interfaces";

const OPT_KEY = {
  transform: (keys: StorageKey<[AccountId]>[]): AccountId[] =>
    keys.map(({ args: [id] }) => id)
};

function useArtistIdsImpl (): AccountId[] | undefined {
  const { api } = useApi();
  return useMapKeys(api.query.artists.artists, OPT_KEY);
}

export default createNamedHook('useArtistIds', useArtistIdsImpl);
