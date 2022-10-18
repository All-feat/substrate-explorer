// Copyright 2017-2022 @polkadot/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { Route } from './types';

import Component from '@polkadot/app-artists';

export default function create (t: TFunction): Route {
  return {
    Component,
    display: {
      needsApi: [
        'query.artists.artists'
      ]
    },
    group: 'allfeat',
    icon: 'user',
    name: 'artists',
    text: t('nav.accounts', 'Artists', { ns: 'apps-routing' })
  };
}
