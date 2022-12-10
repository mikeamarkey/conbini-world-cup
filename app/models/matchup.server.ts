import { z } from 'zod';
import { config, createRequest, createResponseSchema } from './base.server';

export type Matchup = {
  id: string;
  date: string;
  items: string[];
};

const fieldsSchema = z.object({
  Date: z.string(),
  Items: z.array(z.string()),
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
      items: fields.Items,
    };
  });
  return matchups;
}
