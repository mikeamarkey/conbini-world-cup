import type { LoaderArgs } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { getItems } from '~/models/items.server';
import { getMatchups } from '~/models/matchup.server';

export const loader = async ({ context }: LoaderArgs) => {
  const matchups = await getMatchups({ airtableToken: context.AIRTABLE_TOKEN });
  const items = await getItems({ airtableToken: context.AIRTABLE_TOKEN });
  return json({ matchups, items });
};

export default function Index() {
  const { matchups, items } = useLoaderData<typeof loader>();
  console.log(items);

  return (
    <div>
      <h1>Conbini World Cup 2022</h1>
      <div>
        <a href="https://twitter.com/conbiniboys/status/1599411940358438913?s=20&t=TrVXXdz6UPGXZUHToYEXYg">
          Information
        </a>
      </div>

      <div>
        <a href="https://docs.google.com/spreadsheets/u/3/d/1kyKhbq6h-8Qe_RWgavOBb34pHgVkIr2nznjbp8eeszY/copy#gid=0">
          Download link for Brackets
        </a>
      </div>

      <div>
        <h2>Matchups</h2>
        {matchups.map(({ id, date, items }) => (
          <div
            key={id}
            style={{
              padding: 8,
              margin: 8,
              borderRadius: 4,
              background: 'lightgray',
              whiteSpace: 'pre',
            }}
          >
            <p>Date: {date}</p>
            <p>Items: {items.join('  ///  ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
