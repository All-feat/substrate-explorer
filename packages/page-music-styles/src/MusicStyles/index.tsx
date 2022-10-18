// Copyright 2017-2022 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useRef } from 'react';
import styled from 'styled-components';

import { CardSummary, SummaryBox, Table } from '@polkadot/react-components';
import { useApi, useCall } from '@polkadot/react-hooks';

import { useTranslation } from '../translate';
import MusicStyle from './MusicStyle';
import { MusicStylesRaw } from './types';
import { countMusicStyles, unwrapMusicStyles } from './utils';

interface Props {
  className?: string;
}

function Overview ({ className = '' }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const header = useRef([
    [t('music styles')],
    [t('children')]
  ]);
  const stylesRaw = useCall<MusicStylesRaw>(api.query.musicStyles.styles, []);
  const styles = unwrapMusicStyles(stylesRaw);
  const totalMusicCount = countMusicStyles(styles);

  return (
    <div className={className}>

      <SummaryBox>
        <div className='flex-1' />
        <CardSummary label={t<string>('total music styles')}>
          {totalMusicCount}
        </CardSummary>
      </SummaryBox>
      <Table
        header={header.current}
        withCollapsibleRows
      >
        {styles && styles.map((style, i) => (
          <MusicStyle
            key={i}
            style={style}
          />
        ))}
      </Table>
    </div>
  );
}

export default React.memo(styled(Overview)`
  .flex-1 {
    flex: 1;
  }
`);
