import type { LinksFunction, LoaderArgs } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { Matchup, matchupStyles } from '~/components';
import { getMatchups } from '~/models/matchup.server';
import indexStyles from '~/styles/index.css';

export const loader = async ({ context }: LoaderArgs) => {
  const matchups = await getMatchups({ airtableToken: context.AIRTABLE_TOKEN });
  return json(matchups);
};

export const links: LinksFunction = () => [
  ...matchupStyles(),
  {
    rel: 'stylesheet',
    href: indexStyles,
  },
];

export default function Index() {
  const matchups = useLoaderData<typeof loader>();

  return (
    <div className="index">
      <h1>Conbini World Cup 2022</h1>
      <div className="indexLink">
        <a href="https://twitter.com/conbiniboys/status/1599411940358438913?s=20&t=TrVXXdz6UPGXZUHToYEXYg">
          Information
        </a>
      </div>

      <div className="indexLink">
        <a href="https://docs.google.com/spreadsheets/u/3/d/1kyKhbq6h-8Qe_RWgavOBb34pHgVkIr2nznjbp8eeszY/copy#gid=0">
          Download link for Brackets
        </a>
      </div>

      <div className="indexMatchups">
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
