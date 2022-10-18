// Copyright 2017-2022 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useRef } from 'react';
import styled from 'styled-components';

import { Button, CardSummary, Columar, SummaryBox, Table } from '@polkadot/react-components';
import { useApi, useEventTrigger, useMapEntries } from '@polkadot/react-hooks';

import { useTranslation } from '../translate';
import Artist from './Artist';
import Candidate from './Candidate';
import SubmitCandidate from './SubmitCandidate';
import { OwnedArtist, OwnedCandidate } from './types';
import { OPT_ENTRIES } from './utils';

interface Props {
  className?: string;
}

function Overview ({ className = '' }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const artistHeader = useRef([[t('artists'), 'start', 2]]);
  const candidateHeader = useRef([[t('candidates'), 'start', 2]]);
  const trigger = useEventTrigger([
    api.events.artists?.CandidateAdded,
    api.events.artists?.CandidateWithdrew
  ]);
  const artists = useMapEntries<OwnedArtist[]>(api.query.artists.artists, OPT_ENTRIES, trigger.blockHash);
  const candidates = useMapEntries<OwnedCandidate[]>(api.query.artists.candidates, OPT_ENTRIES, trigger.blockHash);

  return (
    <div className={className}>
      <SummaryBox>
        <div className='flex-1' />
        <CardSummary label={t<string>('candidate count')}>
          {candidates?.length || 0}
        </CardSummary>
        <CardSummary label={t<string>('artist count')}>
          {artists?.length || 0}
        </CardSummary>
      </SummaryBox>
      <Button.Group>
        <SubmitCandidate />
      </Button.Group>
      <Columar>
        <Columar.Column>
          <Table header={candidateHeader.current}>
            {candidates && candidates.map((candidate, i) => (
              <Candidate
                key={i}
                {...candidate}
              />
            ))}
          </Table>
        </Columar.Column>
        <Columar.Column>
          <Table header={artistHeader.current}>
            {artists && artists.map((artist, i) => (
              <Artist
                {...artist}
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
