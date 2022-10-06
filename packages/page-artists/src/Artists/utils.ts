// Copyright 2017-2022 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { StorageKey } from '@polkadot/types';
import { Codec } from '@polkadot/types-codec/types';

import { StorageMap } from './types';

export function unwrapStorageMapValues<T extends Codec> (raw?: StorageMap<T>[]): [StorageKey, T][] {
  if (typeof raw === 'undefined') {
    return [];
  }

  return raw
    .filter(([, option]) => option.isSome)
    .map(([key, option]) => [key, option.unwrap()]);
}
