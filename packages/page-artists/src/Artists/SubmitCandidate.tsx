// Copyright 2017-2022 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { Button, Input, InputAddress, Modal, TxButton } from '@polkadot/react-components';
import { useApi, useToggle } from '@polkadot/react-hooks';
import { BalanceFree } from '@polkadot/react-query';

import { useTranslation } from '../translate';

function SubmitCandidate (): React.ReactElement {
  const { t } = useTranslation();
  const { api } = useApi();
  const [isOpen, toggleIsOpen] = useToggle();
  const [accountId, setAccountId] = useState<string | null>(null);
  const [name, setName] = useState<string>('');

  const _onChangeName = useCallback(
    (value: string) => setName(value), []
  );

  return (
    <>
      <Button
        icon='plus'
        label={t<string>('Submit candidature')}
        onClick={toggleIsOpen}
      />
      {isOpen && (
        <Modal
          header={t<string>('Submit a candidature to become an artist')}
          onClose={toggleIsOpen}
          size='large'
        >
          <Modal.Content>
            <Modal.Columns hint={t<string>('The account you want to submit a candidature from.')}>
              <InputAddress
                label={t<string>('submit from account')}
                labelExtra={
                  <BalanceFree
                    label={<label>{t<string>('free balance')}</label>}
                    params={accountId}
                  />
                }
                onChange={setAccountId}
                type='account'
              />
            </Modal.Columns>
            <Modal.Columns hint={t<string>('The wanted artist name.')}>
              <Input
                autoFocus
                label={t<string>('artist name')}
                onChange={_onChangeName}
                value={name}
              />
            </Modal.Columns>
          </Modal.Content>
          <Modal.Actions>
            <TxButton
              accountId={accountId}
              icon='sign-in-alt'
              isDisabled={!name || !accountId}
              label={t<string>('Submit Transaction')}
              onStart={toggleIsOpen}
              params={[name]}
              tx={api.tx.artists.submitCandidacy}
              withSpinner
            />
          </Modal.Actions>
        </Modal>
      )}
    </>
  );
}

export default React.memo(styled(SubmitCandidate)``);
