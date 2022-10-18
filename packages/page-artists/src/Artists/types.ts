// Copyright 2017-2022 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Bytes, Option, StorageKey, u32 } from '@polkadot/types';
import { Codec } from '@polkadot/types-codec/types';

export type StorageMap<T extends Codec> = [StorageKey, Option<T>]

// `Base` means `raw` as it comes from the blockchain
export interface BaseArtist extends Codec {
  name: Bytes
  createdAt: u32
}

// `Owned` means transformed
export interface OwnedBaseArtist {
  accountId: string
  name: string
  createdAt: u32
}

export type OwnedCandidate = OwnedBaseArtist
export type OwnedArtist = OwnedBaseArtist
