import { z } from 'zod';

const airtable = {
  baseUrl: 'https://api.airtable.com/v0/appy4ar57OXD2UHpz',
  matchupsQuery: 'tblbPELOSCf0HguCJ?sort%5B0%5D%5Bfield%5D=Date',
  itemsQuery: 'tblD6OT0Zms4OeRkn',
};

export const config = {
  airtable: {
    matchupsUrl: `${airtable.baseUrl}/${airtable.matchupsQuery}`,
    itemsUrl: `${airtable.baseUrl}/${airtable.itemsQuery}`,
  },
};

export const createRequest = async (token: unknown, url: string) => {
  const result = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return result.json();
};

export const createResponseSchema = <T>(
  fieldsSchema: z.ZodObject<T extends z.ZodRawShape ? T : never>
) => {
  const recordSchema = z.object({
    id: z.string(),
    fields: fieldsSchema,
  });

  return z.object({
    records: z.preprocess((inputRecords) => {
      const result = z.array(z.any()).parse(inputRecords);
      return result.filter((record) => recordSchema.safeParse(record).success);
    }, z.array(recordSchema)),
  });
};
