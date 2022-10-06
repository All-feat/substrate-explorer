// Copyright 2017-2022 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';

import { MusicStyle as Style } from './types';

interface Props {
  style: Style
  className?: string;
}

function MusicStyle ({ className = '', style }: Props): React.ReactElement<Props> {
  return (
    <tr className={`${className} row`}>
      <td colSpan={1}>
        {style.parent.toUtf8()}
      </td>
      <td
        className='align-end'
        colSpan={1}
      >
        <p>
          {style.children ? style.children.map((v) => v.toUtf8()).join(', ') : ''}
        </p>
      </td>
    </tr>
  );
}

export default React.memo(styled(MusicStyle)`
  .align-end {
    text-align: end;
  }

  &.row td {
    padding: 1rem 0;
  }
`);
