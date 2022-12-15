import { z } from 'zod';
import type { ItemProps } from '~/components';
import { divisions } from '~/components';
import { config, createRequest, createResponseSchema } from './base.server';

const fieldsSchema = z.object({
  'Division': z.enum(divisions),
  'Image': z
    .array(
      z.object({
        url: z.string(),
      })
    )
    .min(1),
  'Item Name': z.string(),
  'Seed 2022': z.number(),
});

export async function getItems({
  airtableToken,
}: {
  airtableToken: unknown;
}): Promise<Omit<ItemProps, 'isWinner'>[]> {
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
      seed: fields['Seed 2022'],
      division: fields.Division,
      image: fields.Image[0].url,
    };
  });
  return items;
}
