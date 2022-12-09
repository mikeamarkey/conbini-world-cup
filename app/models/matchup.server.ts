import { z } from 'zod';

const BASE_URL = 'https://api.airtable.com/v0/appy4ar57OXD2UHpz';
const MATCHUPS_ID = 'tblbPELOSCf0HguCJ';

export type Matchup = z.infer<typeof matchupsSchema>;

const fieldsSchema = z.object({
  Date: z.string(),
  Division: z.array(z.string()),
  Items: z.array(z.string()),
  Seed: z.array(z.number()),
});

const matchupsResponseSchema = z.object({
  records: z.array(
    z.object({
      id: z.string(),
      fields: fieldsSchema.partial(),
    })
  ),
});

const matchupsSchema = fieldsSchema.extend({
  id: z.string(),
});

export async function getMatchups({
  airtableToken,
}: {
  airtableToken: unknown;
}) {
  const matchupsResponse = await fetch(`${BASE_URL}/${MATCHUPS_ID}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${airtableToken}`,
    },
  });
  const matchupsData = await matchupsResponse.json();
  const parsedMatchups = matchupsResponseSchema.parse(matchupsData);
  const matchups = parsedMatchups.records
    .map((matchup) => {
      return {
        id: matchup.id,
        ...matchup.fields,
      };
    })
    .filter((matchup): matchup is Matchup => {
      return Object.keys(matchup).every(
        (value) => ![undefined, null, ''].includes(value)
      );
    });
  return matchups;
}
