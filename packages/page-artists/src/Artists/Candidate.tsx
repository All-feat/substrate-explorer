// Copyright 2017-2022 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';

import { AddressSmall, ExpandButton, TxButton } from '@polkadot/react-components';
import { useApi, useToggle } from '@polkadot/react-hooks';
import { isFunction } from '@polkadot/util';

import { useTranslation } from '../translate';
import { OwnedCandidate } from './types';

interface Props extends OwnedCandidate {
  className?: string;
}

function Candidate ({ accountId, className = '', name }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const [isExpanded, toggleIsExpanded] = useToggle(false);

  return (
    <>
      <tr className={`${className}${isExpanded ? ' noBorder' : ''}`}>
        <td className=''>
          <AddressSmall
            overrideName={name}
            value={accountId}
            withShortAddress
          />
        </td>
        <td>
          <div className='actions'>
            {isFunction(api.tx.artists?.withdrawCandidacy) && (
              <TxButton
                accountId={accountId}
                icon='trash'
                label={t<string>('Withdraw candidacy')}
                tx={api.tx.artists.withdrawCandidacy}
              />
            )}
            <ExpandButton
              expanded={isExpanded}
              onClick={toggleIsExpanded}
            />
          </div>
        </td>
      </tr>
      <tr className={`${className} ${isExpanded ? 'isExpanded' : 'isCollapsed'}`}>
        <td colSpan={2}>
          Candidate info [...]
        </td>
      </tr>
    </>
  );
}

export default React.memo(styled(Candidate)`
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
