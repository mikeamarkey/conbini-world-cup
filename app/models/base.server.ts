import { z } from 'zod';
import type { Context } from '~/types/remix';

const airtable = {
  baseUrl: 'https://api.airtable.com/v0/appy4ar57OXD2UHpz',
  matchupsQuery:
    'tblPkBoemy1L6Y7ba?sort%5B0%5D%5Bfield%5D=Date&sort%5B0%5D%5Bdirection%5D=asc',
  itemsQuery: 'tblD6OT0Zms4OeRkn',
};

export const config = {
  airtable: {
    matchupsUrl: `${airtable.baseUrl}/${airtable.matchupsQuery}`,
    itemsUrl: `${airtable.baseUrl}/${airtable.itemsQuery}`,
  },
};

export const createRequest = async (
  token: Context['AIRTABLE_TOKEN'],
  url: string
) => {
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
