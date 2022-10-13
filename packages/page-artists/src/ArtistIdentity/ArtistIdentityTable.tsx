// Copyright 2017-2022 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo } from 'react';
import styled from 'styled-components';

import EditArtistIdentityBytesField from '@polkadot/app-artists/ArtistIdentity/EditArtistIdentity';
import { Table } from '@polkadot/react-components';
import { Bytes } from '@polkadot/types';

import { useTranslation } from '../../../page-accounts/src/translate';
import { PalletArtistIdentityMetadata } from './types';

function unwrapStringMetadata (metadata?: PalletArtistIdentityMetadata) {
  if (metadata && 'entries' in metadata) {
    const stringFields: {key: string, value: Bytes}[] = [];

    for (const [key, value] of metadata.entries()) {
      if ('isUtf8' in value) {
        stringFields.push({ key, value: value as Bytes });
      }
    }

    return stringFields;
  }

  return [];
}

interface ArtistIdentityTableProps {
  metadata: PalletArtistIdentityMetadata
  address: string
}

function ArtistIdentityTable ({ address, metadata }: ArtistIdentityTableProps) {
  const { t } = useTranslation();
  const stringFields = useMemo(() => unwrapStringMetadata(metadata), [metadata]);
  const trStyle = { backgroundColor: 'transparent' };
  const tdStyle = { border: 'none', paddingLeft: 0 };

  return (
    <section>
      <div className='ui--AddressMenu-sectionHeader'>
        {t<string>('Artist identity')}
      </div>
      <Table
        className='mini allfeat-artist-identity-table'
        isInline
      >
        {stringFields.map(({ key, value }) => (
          <tr
            key={key}
            style={trStyle}
          >
            <td style={tdStyle}>
              <label>
                {key}
              </label>
            </td>
            <td style={tdStyle}>
              {value.toUtf8()}
            </td>
            <td style={tdStyle}>
              <EditArtistIdentityBytesField
                address={address}
                initialValue={value.toUtf8()}
                name={key}
              />
            </td>
          </tr>
        ))}
      </Table>
    </section>
  );
}

export default React.memo(styled(ArtistIdentityTable)``);
