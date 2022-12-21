import type { LinksFunction, LoaderArgs } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { Matchup, matchupStyles } from '~/components';
import { getMatchups } from '~/models/matchup.server';
import styles from '~/styles/index.css';

export const loader = async ({ context }: LoaderArgs) => {
  const cachedMatchups = await context.CWC_KV.get<
    Awaited<ReturnType<typeof getMatchups>>
  >('matchups', {
    type: 'json',
  });
  if (cachedMatchups) {
    return json(cachedMatchups);
  }

  const matchups = await getMatchups({ airtableToken: context.AIRTABLE_TOKEN });
  await context.CWC_KV.put('matchups', JSON.stringify(matchups), {
    expirationTtl: 60,
  });
  return json(matchups);
};

export const links: LinksFunction = () => [
  ...matchupStyles(),
  {
    rel: 'stylesheet',
    href: styles,
  },
];

export default function Index() {
  const matchups = useLoaderData<typeof loader>();

  const ongoingMatches = matchups.filter(
    (matchup) => matchup.matchState === 'ongoing'
  );
  const hasOngoingMatches = ongoingMatches.length > 0;
  const completedMatches = matchups
    .filter((matchup) => matchup.matchState === 'complete')
    .reverse();
  const upcomingMatches = matchups.filter(
    (matchup) => matchup.matchState === 'scheduled'
  );
  const hasUpcomingMatches = upcomingMatches.length > 0;

  return (
    <div className="index">
      <div className="matchupsGroup" id="ongoing">
        <h2>Ongoing Matches</h2>
        {hasOngoingMatches ? (
          ongoingMatches.map((matchup) => (
            <div key={matchup.id}>
              <Matchup {...matchup} />
            </div>
          ))
        ) : (
          <div className="card">
            {hasUpcomingMatches ? (
              <p>
                No ongoing matches at the moment. Check out the{' '}
                <a href="#upcoming">upcoming match schedule</a> for details on
                when the next match begins!
              </p>
            ) : (
              <p>
                That's it for the World Cup 2022. Thanks to everyone who
                followed along and voted!
              </p>
            )}
          </div>
        )}
      </div>

      <div className="matchupsGroup" id="completed">
        <h2>Recent Matches</h2>
        {completedMatches.map((matchup) => (
          <div key={matchup.id}>
            <Matchup {...matchup} />
          </div>
        ))}
      </div>

      <div className="matchupsGroup" id="upcoming">
        <h2>Upcoming Matches</h2>
        {upcomingMatches.map((matchup) => (
          <div className="matchupsGroupDisabled" key={matchup.id}>
            <Matchup {...matchup} />
          </div>
        ))}
      </div>
    </div>
  );
}
