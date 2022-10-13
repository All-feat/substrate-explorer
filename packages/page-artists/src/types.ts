// Copyright 2017-2022 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Bytes, Option, StorageKey, Struct, u32, Vec } from '@polkadot/types';

// interface copied from @allfeat.js/types
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

// interface copied from @allfeat.js/types
export interface PalletArtistsArtistInfo extends Struct {
  readonly name: Bytes;
  readonly createdAt: u32;
}

export type StorageMap<T extends Struct> = [StorageKey, Option<T>]
