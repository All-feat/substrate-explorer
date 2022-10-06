// Copyright 2017-2022 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';

import { AddressSmall, ExpandButton } from '@polkadot/react-components';
import { useToggle } from '@polkadot/react-hooks';
import { StorageKey } from '@polkadot/types';

import { Artist as IArtist } from './types';

interface Props {
  className?: string;
  artist: IArtist
  accountId: StorageKey
}

function Artist ({ accountId, artist, className = '' }: Props): React.ReactElement<Props> {
  const [isExpanded, toggleIsExpanded] = useToggle(false);

  return (
    <>
      <tr className={`${className}${isExpanded ? ' noBorder' : ''}`}>
        <td colSpan={1}>
          <AddressSmall
            overrideName={artist.name.toUtf8()}
            value={accountId.toHuman()}
            withShortAddress
          />
        </td>
        <td>
          <ExpandButton
            expanded={isExpanded}
            onClick={toggleIsExpanded}
          />
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
`);
