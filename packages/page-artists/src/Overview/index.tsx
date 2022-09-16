// Copyright 2017-2022 @polkadot/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { Button } from '@polkadot/react-components';

import Summary from './Summary';
import {AccountId} from "@polkadot/types/interfaces";

interface Props {
  className?: string;
  ids_candidates?: AccountId[];
  ids_artists?: AccountId[];
}

function Overview ({ className, ids_candidates, ids_artists }: Props): React.ReactElement<Props> {
  return (
    <div className={className}>
      <Summary numCandidates={ids_candidates?.length} numArtists={ids_artists?.length} />
      <Button.Group>

      </Button.Group>
    </div>
  );
}

export default React.memo(Overview);
