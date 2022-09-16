// Copyright 2017-2022 @polkadot/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { PalletAssetsAssetDetails, PalletAssetsAssetMetadata } from '@polkadot/types/lookup';
import type { BN } from '@polkadot/util';
import {AccountId32, BlockNumber} from "@polkadot/types/interfaces";

export interface AssetInfo {
  details: PalletAssetsAssetDetails | null;
  id: BN;
  isAdminMe: boolean;
  isIssuerMe: boolean;
  isFreezerMe: boolean;
  isOwnerMe: boolean;
  key: string;
  metadata: PalletAssetsAssetMetadata | null;
}

export interface AssetInfoComplete extends AssetInfo {
  details: PalletAssetsAssetDetails;
  metadata: PalletAssetsAssetMetadata;
}

export interface CandidateInfo {
  id: AccountId32
  name: string,
  created_at: BlockNumber
}
