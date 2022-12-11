import { z } from 'zod';
import { config, createRequest, createResponseSchema } from './base.server';

const division = ['Hot Box', 'Snack', 'Meal', 'Beverage'] as const;
type Division = typeof division[number];

export type Item = {
  division: Division;
  id: string;
  image: string;
  name: string;
  seed: number;
};

const fieldsSchema = z.object({
  'Division': z.enum(division),
  'Image': z
    .array(
      z.object({
        url: z.string(),
      })
    )
    .min(1),
  'Item Name': z.string(),
  'Seed': z.number(),
});

export async function getItems({
  airtableToken,
}: {
  airtableToken: unknown;
}): Promise<Item[]> {
  const itemsData = await createRequest(
    airtableToken,
    config.airtable.itemsUrl
  );
  const responseSchema = createResponseSchema(fieldsSchema);
  const parsedItems = responseSchema.parse(itemsData);
  const items = parsedItems.records.map((item) => {
    const { fields } = item;
    return {
      id: item.id,
      name: fields['Item Name'],
      seed: fields.Seed,
      division: fields.Division,
      image: fields.Image[0].url,
    };
  });
  return items;
}
