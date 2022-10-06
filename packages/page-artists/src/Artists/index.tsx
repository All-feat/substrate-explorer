// Copyright 2017-2022 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useRef } from 'react';
import styled from 'styled-components';

import { CardSummary, Columar, SummaryBox, Table } from '@polkadot/react-components';
import { useApi, useMapEntries } from '@polkadot/react-hooks';

import { useTranslation } from '../translate';
import Artist from './Artist';
import { ArtistsRaw } from './types';
import { unwrapStorageMapValues } from './utils';

interface Props {
  className?: string;
}

function Overview ({ className = '' }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const artistHeader = useRef([[t('artists'), 'start', 2]]);
  const candidateHeader = useRef([[t('candidates'), 'start', 2]]);
  const artistsRaw = useMapEntries<ArtistsRaw>(api.query.artists.artists);
  const candidatesRaw = useMapEntries<ArtistsRaw>(api.query.artists.candidates);
  const artists = unwrapStorageMapValues(artistsRaw);
  const candidates = unwrapStorageMapValues(candidatesRaw);

  return (
    <div className={className}>
      <SummaryBox>
        <div className='flex-1' />
        <CardSummary label={t<string>('candidate count')}>
          {candidates.length}
        </CardSummary>
        <CardSummary label={t<string>('artist count')}>
          {artists.length}
        </CardSummary>
      </SummaryBox>
      <Columar>
        <Columar.Column>
          <Table header={candidateHeader.current}>
            {candidates.map(([key, candidate], i) => (
              <Artist
                accountId={key}
                artist={candidate}
                key={i}
              />
            ))}
          </Table>
        </Columar.Column>
        <Columar.Column>
          <Table header={artistHeader.current}>
            {artists.map(([key, artist], i) => (
              <Artist
                accountId={key}
                artist={artist}
                key={i}
              />
            ))}
          </Table>
        </Columar.Column>
      </Columar>
    </div>
  );
}

export default React.memo(styled(Overview)``);
