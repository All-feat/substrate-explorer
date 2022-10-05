// Copyright 2017-2022 @polkadot/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { Route } from './types';

import Component from '@polkadot/app-music-styles';

export default function create (t: TFunction): Route {
  return {
    Component,
    display: {
      needsApi: []
    },
    group: 'allfeat',
    icon: 'music',
    name: 'music styles',
    text: t('nav.accounts', 'Music styles', { ns: 'apps-routing' })
  };
}
