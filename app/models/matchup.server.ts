import { z } from 'zod';
import type { MatchupProps } from '~/components';
import { config, createRequest, createResponseSchema } from './base.server';
import { getItems } from './items.server';

type BaseMatchup = {
  id: string;
  date?: string;
  itemId1?: string;
  itemId2?: string;
  round: string;
  tweet?: string;
};

const fieldsSchema = z.object({
  'Date': z.string().optional(),
  'Item 1': z.array(z.string()).optional(),
  'Item 2': z.array(z.string()).optional(),
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
    const { itemId1, itemId2, ...baseMatchupValues } = baseMatchup;
    return {
      ...baseMatchupValues,
      item1: items.find((item) => item.id === itemId1),
      item2: items.find((item) => item.id === itemId2),
    };
  });

  return matchups;
}
