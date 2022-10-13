// Copyright 2017-2022 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { Button, Input, InputAddress, Modal } from '@polkadot/react-components';
import { useApi, useToggle } from '@polkadot/react-hooks';
import { BalanceFree } from '@polkadot/react-query';
import { Bytes, Struct, Vec } from '@polkadot/types';

import { useTranslation } from '../translate';

// interface copied from allfeat.js
export interface PalletArtistIdentityMetadata extends Struct {
  readonly alias: Bytes;
  readonly bio: Bytes;
  readonly profilePic: Bytes;
  readonly musicStyles: Vec<Bytes>;
  readonly twitter: Bytes;
  readonly facebook: Bytes;
  readonly instagram: Bytes;
  readonly spotify: Bytes;
  readonly appleMusic: Bytes;
}

interface EditArtistIdentityProps {
  name: string
  address: string
  initialValue: string
}

function EditArtistIdentityBytesField ({ address, name, ...props }: EditArtistIdentityProps): React.ReactElement {
  const { t } = useTranslation();
  const { api } = useApi();
  const [isOpen, toggleIsOpen] = useToggle();
  const [accountId, setAccountId] = useState<string | null>(null);
  const [value, setValue] = useState<string>('');
  const methodName = `update${name.slice(0, 1).toUpperCase() + name.slice(1)}`;
  const initialValue = props.initialValue === '0x' ? '' : props.initialValue;

  const _onChangeName = useCallback(
    (v: string) => setValue(v), []
  );

  const submitTx = useCallback(async () => {
    if (!accountId || !value) {
      return;
    }

    await api.tx.artists
      .callAsArtist(api.tx.artistIdentity[methodName](value))
      .signAndSend(accountId);

    toggleIsOpen();
  }, [accountId, api.tx.artists, api.tx.artistIdentity, methodName, toggleIsOpen, value]);

  return (
    <>
      <Button
        icon='edit'
        onClick={toggleIsOpen}
      />
      {isOpen && (
        <Modal
          header={t<string>('Update Artist identity')}
          onClose={toggleIsOpen}
          size='large'
        >
          <Modal.Content>
            <Modal.Columns hint={t<string>('Update from this account.')}>
              <InputAddress
                defaultValue={address}
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
            <Modal.Columns hint={t<string>(`Update artist's ${name}.`)}>
              <Input
                autoFocus
                defaultValue={initialValue}
                label={t<string>(`artist ${name}`)}
                onChange={_onChangeName}
                value={value}
              />
            </Modal.Columns>
          </Modal.Content>
          <Modal.Actions>
            <Button
              icon='sign-in-alt'
              isDisabled={!value || !accountId}
              label={t<string>('Submit Transaction')}
              onClick={submitTx}
            />
          </Modal.Actions>
        </Modal>
      )}
    </>
  );
}

export default React.memo(styled(EditArtistIdentityBytesField)``);
