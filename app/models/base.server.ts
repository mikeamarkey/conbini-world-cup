import { z } from 'zod';

const airtable = {
  apiUrl: 'https://api.airtable.com/v0',
  baseId: 'appy4ar57OXD2UHpz',
  matchupsId: 'tblbPELOSCf0HguCJ',
  itemsId: 'tblD6OT0Zms4OeRkn',
};

export const config = {
  airtable: {
    matchupsUrl: [airtable.apiUrl, airtable.baseId, airtable.matchupsId].join(
      '/'
    ),
    itemsUrl: [airtable.apiUrl, airtable.baseId, airtable.itemsId].join('/'),
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
