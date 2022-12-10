import type { LoaderArgs } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { Matchup } from '~/components';
import { getMatchups } from '~/models/matchup.server';

export const loader = async ({ context }: LoaderArgs) => {
  const matchups = await getMatchups({ airtableToken: context.AIRTABLE_TOKEN });
  return json(matchups);
};

export default function Index() {
  const matchups = useLoaderData<typeof loader>();

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
        {matchups.map((matchup) => (
          <div key={matchup.id}>
            <Matchup matchup={matchup} />
          </div>
        ))}
      </div>
    </div>
  );
}
