// Copyright 2017-2022 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

import { useEffect, useState } from 'react';

import { ApiPromise, Keyring } from '@polkadot/api';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import { encodeAddress } from '@polkadot/util-crypto';

export function useInjectedAccounts (): [InjectedAccountWithMeta[], boolean, string | null] {
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const extensionSetup = async () => {
    const extensions = await web3Enable('origin-name');

    if (extensions.length === 0) {
      setError('No extension installed!');
      setLoading(false);

      return;
    }

    const accounts = await web3Accounts();

    if (accounts.length === 0) {
      setError('No account found!');
      setLoading(false);

      return;
    }

    setAccounts(accounts);
    setLoading(false);
  };

  useEffect(() => {
    if (accounts.length) {
      convertToAllfeatAddress(accounts[0].address);
    }
  }, [accounts]);

  useEffect(() => {
    // eslint-disable-next-line no-void
    void (async () => await extensionSetup())();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [accounts, loading, error];
}

export function convertToAllfeatAddress (address: string) {
  const keyring = new Keyring({ ss58Format: 440, type: 'sr25519' });
  const pair = keyring.addFromAddress(address);

  return pair.address;
}

export async function getAccounts (api: ApiPromise) {
  const limit = 50;
  const result = [];
  let lastKey: any;

  while (true) {
    const query = await api.query.system.account.entriesPaged({ args: [], pageSize: limit, startKey: lastKey as string });

    if (query.length === 0) {
      break;
    }

    for (const user of query) {
      const userKey = user[0].slice(-32);
      const accountId = encodeAddress(userKey);
      const freeBalance = user[1].data.free.toString();
      const reservedBalance = user[1].data.reserved.toString();

      result.push({ accountId, freeBalance, reservedBalance, userKey });
      lastKey = user[0];
    }
  }

  return result;
}
