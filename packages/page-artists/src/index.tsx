// Copyright 2017-2022 @polkadot/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0

import '@polkadot/api-augment/substrate';

import React, { useRef } from 'react';
import { Route, Switch } from 'react-router';

import { Tabs } from '@polkadot/react-components';

import Overview from './Overview';
import { useTranslation } from './translate';
import useCandidateIds from "./useCandidateIds";
import useArtistIds from "@polkadot/app-artists/useArtistIds";

interface Props {
  basePath: string;
  className?: string;
}

function ArtistsApp ({ basePath, className }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const ids_candidates = useCandidateIds();
  const ids_artists = useArtistIds();

  const tabsRef = useRef([
    {
      isRoot: true,
      name: 'overview',
      text: t<string>('Overview')
    },
  ]);



  return (
    <main className={className}>
      <Tabs
        basePath={basePath}
        items={tabsRef.current}
      />
      <Switch>
        <Route>
          <Overview
            ids_candidates={ids_candidates}
            ids_artists={ids_artists}
          />
        </Route>
      </Switch>
    </main>
  );
}

export default React.memo(ArtistsApp);
