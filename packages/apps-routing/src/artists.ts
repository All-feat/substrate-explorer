// Copyright 2017-2022 Allfeat
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { Route } from './types';

import Component from '@polkadot/app-artists';

export default function create (t: TFunction): Route {
  return {
    Component,
    display: {
      needsApi: [
        'tx.artists.submitCandidacy',
      ]
    },
    group: 'network',
    icon: 'shopping-basket',
    name: 'artists',
    text: t('nav.artists', 'Artists', { ns: 'apps-routing' })
  };
}
