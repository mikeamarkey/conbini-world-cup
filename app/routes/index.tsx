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
  const ongoingMatches = matchups.filter(
    (matchup) => matchup.matchState === 'ongoing'
  );
  const completedMatches = matchups
    .filter((matchup) => matchup.matchState === 'complete')
    .reverse()
    .slice(0, 5);
  const futureMatches = matchups.filter(
    (matchup) => matchup.matchState === 'scheduled'
  );

  return (
    <div className="index">
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
        <h2>Ongoing Matches</h2>
        {ongoingMatches.map((matchup) => (
          <div key={matchup.id}>
            <Matchup {...matchup} />
          </div>
        ))}
      </div>

      <div className="indexMatchups">
        <h2>Recent Matches</h2>
        {completedMatches.map((matchup) => (
          <div key={matchup.id}>
            <Matchup {...matchup} />
          </div>
        ))}
      </div>

      <div className="indexMatchups">
        <h2>Future Matches</h2>
        {futureMatches.map((matchup) => (
          <div key={matchup.id}>
            <Matchup {...matchup} />
          </div>
        ))}
      </div>
    </div>
  );
}
