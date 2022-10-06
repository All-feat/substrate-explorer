// Copyright 2017-2022 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BaseArtist, OwnedBaseArtist, StorageMap } from './types';

export const OPT_ENTRIES = {
  transform: (entries: StorageMap<BaseArtist>[]): OwnedBaseArtist[] => {
    return entries
      .map(([{ args: [accountId] }, option]): OwnedBaseArtist | null => {
        if (option.isNone) {
          return null;
        }

        const { createdAt, name } = option.unwrap();

        return {
          accountId: accountId.toString(),
          createdAt,
          name: name.toUtf8()
        };
      })
      .filter((value): value is OwnedBaseArtist => !!value);
  }
};
