import { z } from 'zod';
import type { MatchupProps } from '~/components';
import { config, createRequest, createResponseSchema } from './base.server';
import { getItems } from './items.server';

type BaseMatchup = {
  id: string;
  date: string;
  itemId1?: string;
  itemId2?: string;
  vote1?: number;
  vote2?: number;
  remainingMinutes?: number;
  round: string;
  tweet?: string;
};

const fieldsSchema = z.object({
  'Date': z.string(),
  'Item 1': z.array(z.string()).optional(),
  'Item 2': z.array(z.string()).optional(),
  'Vote 1': z.number().optional(),
  'Vote 2': z.number().optional(),
  'Remaining Minutes': z.number().optional(),
  'Round': z.string(),
  'Tweet': z.string().optional(),
});

export async function getBaseMatchups({
  airtableToken,
}: {
  airtableToken: unknown;
}): Promise<BaseMatchup[]> {
  const baseMatchupsData = await createRequest(
    airtableToken,
    config.airtable.matchupsUrl
  );
  const responseSchema = createResponseSchema(fieldsSchema);
  const parsedBaseMatchups = responseSchema.parse(baseMatchupsData);
  const baseMatchups = parsedBaseMatchups.records.map((baseMatchup) => {
    const { fields } = baseMatchup;
    return {
      date: fields.Date,
      id: baseMatchup.id,
      itemId1: fields['Item 1']?.[0] ?? undefined,
      itemId2: fields['Item 2']?.[0] ?? undefined,
      vote1: fields['Vote 1'],
      vote2: fields['Vote 2'],
      remainingMinutes: fields['Remaining Minutes'],
      round: fields.Round,
      tweet: fields.Tweet,
    };
  });
  return baseMatchups;
}

export async function getMatchups({
  airtableToken,
}: {
  airtableToken: unknown;
}): Promise<MatchupProps[]> {
  const [baseMatchups, items] = await Promise.all([
    getBaseMatchups({ airtableToken }),
    getItems({ airtableToken }),
  ]);

  const matchups = baseMatchups.map((baseMatchup) => {
    const {
      itemId1,
      itemId2,
      remainingMinutes,
      vote1,
      vote2,
      ...baseMatchupValues
    } = baseMatchup;

    const item1 = items.find((item) => item.id === itemId1);
    const item2 = items.find((item) => item.id === itemId2);
    const isComplete =
      typeof vote1 !== 'undefined' && typeof vote2 !== 'undefined';

    const winningItem = !isComplete ? undefined : vote1 > vote2 ? item1 : item2;
    const winningPercent = !isComplete ? undefined : Math.max(vote1, vote2);

    const remainingHours =
      typeof remainingMinutes !== 'undefined'
        ? Math.floor(remainingMinutes / 60)
        : undefined;

    const matchState: MatchupProps['matchState'] =
      typeof remainingHours === 'undefined'
        ? 'scheduled'
        : remainingHours < 0
        ? 'complete'
        : 'ongoing';

    return {
      ...baseMatchupValues,
      item1,
      item2,
      matchState,
      remainingHours,
      winner:
        winningItem && winningPercent
          ? {
              id: winningItem.id,
              name: winningItem.name,
              percent: winningPercent,
            }
          : undefined,
    };
  });

  return matchups;
}
