import type { LinksFunction } from '@remix-run/cloudflare';
import type { MatchupProps } from '../Matchup';
import { Matchup, matchupStyles } from '../Matchup';
import styles from './styles.css';

export type MatchupsProps = {
  matchups: MatchupProps[];
};

export const matchupsStyles: LinksFunction = () => {
  return [
    ...matchupStyles(),
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export const Matchups = ({ matchups }: MatchupsProps) => {
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
    <div className="matchups">
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
};
