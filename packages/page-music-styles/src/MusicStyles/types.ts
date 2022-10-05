// Copyright 2017-2022 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BTreeMap, Bytes, Vec } from '@polkadot/types';

export type MusicStylesRaw = BTreeMap<Bytes, Vec<Bytes>>;

export interface MusicStyle {
  parent: Bytes,
  children: Bytes[]
}
