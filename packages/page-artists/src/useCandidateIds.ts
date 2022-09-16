// Copyright 2017-2022 @polkadot/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { StorageKey } from '@polkadot/types';

import {createNamedHook, useApi, useCall, useMapKeys} from '@polkadot/react-hooks';
import {AccountId} from "@polkadot/types/interfaces";
import {Option} from "@polkadot/types";
import type {PalletArtistsCandidate} from "@allfeat/types/src/interfaces"

const OPT_KEY = {
  transform: (keys: StorageKey<[AccountId]>[]): AccountId[] =>
    keys.map(({ args: [id] }) => id)
};

function useCandidateIdsImpl (): AccountId[] | undefined {
  const { api } = useApi();
  let test = useCall<Option<PalletArtistsCandidate>>(api.query.artists.candidates, ["qSuyViZEVGD6MWJ3NpuCfdSyY5hb7eDH5tyVyaqjuNkPSdUXW"]);
  //(async () => api.query.artists.candidates)().then((t) => console.log(t));
  console.log(test?.unwrap());
  return useMapKeys(api.query.artists.candidates, OPT_KEY);
}

export default createNamedHook('useCandidateIds', useCandidateIdsImpl);
