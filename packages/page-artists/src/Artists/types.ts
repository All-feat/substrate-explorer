// Copyright 2017-2022 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Bytes, Option, StorageKey, Struct, u32, Vec } from '@polkadot/types';
import { Codec } from '@polkadot/types-codec/types';

export type StorageMap<T extends Codec> = [StorageKey, Option<T>]

// interface copied from allfeat.js
interface PalletArtistsArtistInfo extends Struct {
  readonly name: Bytes;
  readonly createdAt: u32;
}

// `Base` means `raw` as it comes from the blockchain
export type BaseArtist = PalletArtistsArtistInfo

// `Owned` means transformed
export interface OwnedBaseArtist {
  accountId: string
  name: string
  createdAt: u32
}

export type OwnedCandidate = OwnedBaseArtist
export type OwnedArtist = OwnedBaseArtist

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
