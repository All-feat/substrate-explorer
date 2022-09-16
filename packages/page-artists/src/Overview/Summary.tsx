// Copyright 2017-2022 @polkadot/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { CardSummary, SummaryBox } from '@polkadot/react-components';
import { formatNumber } from '@polkadot/util';

import { useTranslation } from '../translate';

interface Props {
  className?: string;
  numArtists?: number;
  numCandidates?: number;
}

function Summary ({ className, numArtists, numCandidates }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  return (
    <SummaryBox className={className}>
      <section>
        <CardSummary label={t<string>('candidates')}>
          {formatNumber(numCandidates)}
        </CardSummary>
        <CardSummary label={t<string>('artists')}>
          {formatNumber(numArtists)}
        </CardSummary>
      </section>
    </SummaryBox>
  );
}

export default React.memo(Summary);
