// Copyright 2017-2022 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AppProps as Props } from '@polkadot/react-components/types';

import React, { useEffect, useRef } from 'react';
import { Route, Switch } from 'react-router';

import { Tabs } from '@polkadot/react-components';
import { useApi } from '@polkadot/react-hooks';

import Artists from './Artists';
import { useTranslation } from './translate';
import { convertToAllfeatAddress, getAccounts, useInjectedAccounts } from './utils';

function ArtistsApp ({ basePath, onStatusChange }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const injectedAccounts = useInjectedAccounts();

  const tabsRef = useRef([
    {
      isRoot: true,
      name: 'overview',
      text: t<string>('Overview')
    }
  ]);

  // Dev: example how to fetch injected account and translate to allfeat address
  useEffect(() => {
    getAccounts(api).then((accounts) => console.log({ accounts })).catch(console.error);

    console.log({ injectedAccounts });

    if (injectedAccounts[0].length) {
      const address = convertToAllfeatAddress(injectedAccounts[0][0].address);

      console.log(`injected allfeat address: ${address}`);
    }
  }, [api, injectedAccounts]);

  return (
    <main>
      <Tabs
        basePath={basePath}
        items={tabsRef.current}
      />
      <Switch>
        <Route>
          <Artists
            basePath={basePath}
            onStatusChange={onStatusChange}
          />
        </Route>
      </Switch>
    </main>
  );
}

export default React.memo(ArtistsApp);
