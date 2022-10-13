// Copyright 2017-2022 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback } from 'react';
import styled from 'styled-components';

import { useApi } from '@polkadot/react-hooks';

import ArtistIdentityTable from './ArtistIdentityTable';
import { useArtistIdentity, useArtists } from './hooks';

interface ArtistIdentityProps {
  address: string
}

function ArtistIdentity ({ address }: ArtistIdentityProps) {
  const { api } = useApi();
  const metadata = useArtistIdentity(api, address);
  const artists = useArtists(api);

  const isArtist = useCallback(() => {
    if (!artists) {
      return false;
    }

    for (const [{ args: [accountId] }] of artists) {
      if (accountId.toString() === address) {
        return true;
      }
    }

    return false;
  }, [address, artists]);

  return isArtist() && metadata
    ? <ArtistIdentityTable {...{ address, metadata }} />
    : null;
}

export default React.memo(styled(ArtistIdentity)``);
