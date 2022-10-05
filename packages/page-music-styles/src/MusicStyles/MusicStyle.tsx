// Copyright 2017-2022 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';

import { ExpandButton, Icon } from '@polkadot/react-components';
import { useToggle } from '@polkadot/react-hooks';

interface Props {
  name: string
  className?: string;
}

function MusicStyle ({ className = '', name }: Props): React.ReactElement<Props> {
  const [isExpanded, toggleIsExpanded] = useToggle(false);

  return (
    <>
      <tr className={`${className}${isExpanded ? ' noBorder' : ''}`}>
        <td className='favorite'>
          <Icon
            color='grey'
            icon='music'
          />
        </td>
        <td>
          {name}
        </td>
        <td className='td-full'></td>
        <td className=''>
          <ExpandButton
            expanded={isExpanded}
            onClick={toggleIsExpanded}
          />
        </td>
      </tr>
      <tr className={`${className} ${isExpanded ? 'isExpanded' : 'isCollapsed'}`}>
        <td colSpan={2} />
        <td>
          Hello world
        </td>
        <td colSpan={2} />
      </tr>
    </>
  );
}

export default React.memo(styled(MusicStyle)`
  &.isCollapsed {
    visibility: collapse;
  }

  &.isExpanded {
    visibility: visible;
  }
`);
