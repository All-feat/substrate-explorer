// Copyright 2017-2022 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Bytes, Option, StorageKey, u32 } from '@polkadot/types';
import { Codec } from '@polkadot/types-codec/types';

export type StorageMap<T extends Codec> = [StorageKey, Option<T>]

export type ArtistsRaw = StorageMap<Artist>[];

export interface Artist extends Codec {
  name: Bytes
  createdAt: u32
}
