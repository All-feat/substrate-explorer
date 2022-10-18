// Copyright 2017-2022 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';

import { AddressSmall, ExpandButton } from '@polkadot/react-components';
import { useToggle } from '@polkadot/react-hooks';

import { OwnedArtist } from './types';

interface Props extends OwnedArtist {
  className?: string;
}

function Artist ({ accountId, className = '', name }: Props): React.ReactElement<Props> {
  const [isExpanded, toggleIsExpanded] = useToggle(false);

  return (
    <>
      <tr className={`${className}${isExpanded ? ' noBorder' : ''}`}>
        <td colSpan={1}>
          <AddressSmall
            overrideName={name}
            value={accountId}
            withShortAddress
          />
        </td>
        <td>
          <div className='actions'>
            <ExpandButton
              expanded={isExpanded}
              onClick={toggleIsExpanded}
            />
          </div>
        </td>
      </tr>
      <tr className={`${className} ${isExpanded ? 'isExpanded' : 'isCollapsed'}`}>
        <td colSpan={2}>
          Artist info [...]
        </td>
      </tr>
    </>
  );
}

export default React.memo(styled(Artist)`
  &.isCollapsed {
    visibility: collapse;
  }

  &.isExpanded {
    visibility: visible;
  }

  .actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    & > * + * {
      margin-left: 0.35rem;
    }
  }
`);
