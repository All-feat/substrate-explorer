// Copyright 2017-2022 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { OverrideBundleDefinition } from '@polkadot/types/types';

/* eslint-disable sort-keys */
const definitions: OverrideBundleDefinition = {
  types: [
    {
      // on all versions
      minmax: [0, undefined],
      types: {
        PalletArtistsCandidate: {
          accountId: 'AccountId',
          name: 'Text',
          created_at: 'u32'
        }
      }
    }
  ]
};

export default definitions;
