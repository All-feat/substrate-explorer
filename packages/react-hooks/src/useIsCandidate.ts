// Copyright 2017-2022 @polkadot/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useCallback } from 'react';

import { createNamedHook } from './createNamedHook';
import { useCandidates } from './useCandidates';

function useIsCandidateImpl (address?: string | null): () => boolean {
  const candidates = useCandidates();

  const isCandidate = useCallback(() => {
    if (!candidates || !address) {
      return false;
    }

    for (const [{ args: [accountId] }] of candidates) {
      if (accountId.toString() === address) {
        return true;
      }
    }

    return false;
  }, [address, candidates]);

  return isCandidate;
}

export const useIsCandidate = createNamedHook('useIsCandidate', useIsCandidateImpl);
