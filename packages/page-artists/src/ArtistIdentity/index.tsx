// Copyright 2017-2022 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';

import { useArtistIdentity, useIsArtist, useIsCandidate } from '@polkadot/react-hooks';

import ArtistIdentityTable from './ArtistIdentityTable';

interface ArtistIdentityProps {
  address: string
}

function ArtistIdentity ({ address }: ArtistIdentityProps) {
  const metadata = useArtistIdentity(address);
  const isArtist = useIsArtist(address);
  const isCandidate = useIsCandidate(address);

  return (isArtist() || isCandidate()) && metadata
    ? <ArtistIdentityTable {...{ address, metadata }} />
    : null;
}

export default React.memo(styled(ArtistIdentity)``);
