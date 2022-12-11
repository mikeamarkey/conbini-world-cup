import { z } from 'zod';
import { config, createRequest, createResponseSchema } from './base.server';
import type { Item } from './items.server';
import { getItems } from './items.server';

export type BaseMatchup = {
  id: string;
  date: string;
  itemId1?: string;
  itemId2?: string;
};

export type Matchup = Omit<BaseMatchup, 'itemId1' | 'itemId2'> & {
  item1?: Item;
  item2?: Item;
};

const fieldsSchema = z.object({
  Date: z.string(),
  Items: z.tuple([z.string().optional(), z.string().optional()]),
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
      itemId1: fields.Items[0],
      itemId2: fields.Items[1],
    };
  });
  return baseMatchups;
}

export async function getMatchups({
  airtableToken,
}: {
  airtableToken: unknown;
}): Promise<Matchup[]> {
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
