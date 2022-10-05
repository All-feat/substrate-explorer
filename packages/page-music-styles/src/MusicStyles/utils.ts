// Copyright 2017-2022 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { MusicStyle, MusicStylesRaw } from './types';

export function unwrapMusicStyles (raw?: MusicStylesRaw): MusicStyle[] {
  if (typeof raw === 'undefined') {
    return [];
  }

  return [...raw.entries()].map((style) => ({
    children: [...style[1]],
    parent: style[0]
  }));
}

export function countMusicStyles (styles: MusicStyle[]): number {
  return styles.reduce((acc, curr) => {
    return acc + 1 + curr.children.length;
  }, 0);
}
