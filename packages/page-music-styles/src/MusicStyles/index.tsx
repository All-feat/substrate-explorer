// Copyright 2017-2022 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';

import { Table } from '@polkadot/react-components';

import MusicStyle from './MusicStyle';

interface Props {
  className?: string;
}

function Overview ({ className = '' }: Props): React.ReactElement<Props> {
  const musicStyles = ['Rap', 'Rock'];

  return (
    <div className={className}>
      <Table withCollapsibleRows>
        {musicStyles.map((name) => (
          <MusicStyle
            key={name}
            name={name}
          />
        ))}
      </Table>
    </div>
  );
}

export default React.memo(styled(Overview)`

`);
