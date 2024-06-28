/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { NextRequest, NextResponse } from "next/server";
import {
  MOCK_ONEREP_TIME,
  MOCK_ONEREP_MAGIC_NUM_1,
  MOCK_ONEREP_MAGIC_NUM_2,
} from "../../../config/config";
import { errorIfProduction } from "../../../../utils/errorThrower";

function extractProfileId(req: NextRequest) {
  const idFromUrl = Number(req.url.match(/profiles\/([0-9]+)\/scans/)![1]);
  return idFromUrl;
}

function getScanId(profileId: number) {
  return (profileId * MOCK_ONEREP_MAGIC_NUM_1()) % MOCK_ONEREP_MAGIC_NUM_2();
}

export function POST(req: NextRequest) {
  const prodError = errorIfProduction();
  if (prodError) return prodError;

  const profileId: number = extractProfileId(req);
  if (!profileId || isNaN(profileId)) {
    return NextResponse.json({ error: "Invalid profile ID" });
  }

  const scanId = getScanId(profileId);

  const mockResponse = {
    id: scanId,
    profile_id: profileId,
    status: "finished",
    reason: "manual",
    created_at: MOCK_ONEREP_TIME(),
    updated_at: MOCK_ONEREP_TIME(),
    url: `${process.env.ONEREP_API_BASE}/profiles/${profileId}/scans/${scanId}`,
  };

  return NextResponse.json(mockResponse);
}

export function GET(req: NextRequest) {
  const prodError = errorIfProduction();
  if (prodError) return prodError;

  const profileId: number = extractProfileId(req);

  if (!profileId || isNaN(profileId)) {
    return NextResponse.json({ error: "Invalid profile ID" });
  }

  const scandId = getScanId(profileId);

  const responseData = {
    data: [
      {
        id: scandId,
        profile_id: profileId,
        status: "finished",
        reason: "manual",
        created_at: MOCK_ONEREP_TIME(),
        updated_at: MOCK_ONEREP_TIME(),
        url: `${process.env.ONEREP_API_BASE}/profiles/${profileId}/scans/${scandId}`,
      },
    ],
    links: {
      first: `${process.env.ONEREP_API_BASE}/profiles/${profileId}/scans?page=1`,
      last: `${process.env.ONEREP_API_BASE}/profiles/${profileId}/scans?page=1`,
      prev: null,
      next: null,
    },
    meta: {
      current_page: 1,
      from: 1,
      last_page: 1,
      path: `${process.env.ONEREP_API_BASE}/profiles/${profileId}/scans`,
      per_page: 20,
      to: 1,
      total: 1,
    },
  };
  return NextResponse.json(responseData);
}
