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

export async function getMatchups({
  airtableToken,
}: {
  airtableToken: unknown;
}): Promise<Matchup[]> {
  const matchupsData = await createRequest(
    airtableToken,
    config.airtable.matchupsUrl
  );
  const responseSchema = createResponseSchema(fieldsSchema);
  const parsedMatchups = responseSchema.parse(matchupsData);
  const matchups = parsedMatchups.records.map((matchup) => {
    const { fields } = matchup;
    return {
      date: fields.Date,
      id: matchup.id,
      itemId1: fields.Items[0],
      itemId2: fields.Items[1],
    };
  });

  const items = await getItems({ airtableToken });
  const matchupsWithItems = matchups.map((matchup) => {
    const { itemId1, itemId2, ...baseMatchup } = matchup;
    return {
      ...baseMatchup,
      item1: items.find((item) => item.id === itemId1),
      item2: items.find((item) => item.id === itemId2),
    };
  });
  return matchupsWithItems;
}
