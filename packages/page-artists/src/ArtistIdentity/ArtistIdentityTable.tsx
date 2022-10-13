// Copyright 2017-2022 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { CSSProperties, useMemo } from 'react';
import styled from 'styled-components';

import { Table } from '@polkadot/react-components';
import { Bytes } from '@polkadot/types';

import { useTranslation } from '../translate';
import { PalletArtistIdentityMetadata } from '../types';
import EditArtistIdentityBytesField from './EditArtistIdentity';

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
  const trStyle: CSSProperties = { backgroundColor: 'transparent' };
  const tdStyle: CSSProperties = { border: 'none', paddingLeft: 0, wordBreak: 'break-all' };

  return (
    <section>
      <div className='ui--AddressMenu-sectionHeader'>
        {t<string>('Artist identity')}
      </div>
      <Table
        className='mini'
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
            <td style={{ width: '100%', ...tdStyle }}>
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
