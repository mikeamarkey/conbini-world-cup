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
  const completedMatches = matchups
    .filter((matchup) => matchup.matchState === 'complete')
    .reverse();
  const futureMatches = matchups.filter(
    (matchup) => matchup.matchState === 'scheduled'
  );

  return (
    <div className="matchups">
      <div className="matchupsGroup">
        <h2>Ongoing Matches</h2>
        {ongoingMatches.map((matchup) => (
          <div key={matchup.id}>
            <Matchup {...matchup} />
          </div>
        ))}
      </div>

      <div className="matchupsGroup">
        <h2>Recent Matches</h2>
        {completedMatches.map((matchup) => (
          <div key={matchup.id}>
            <Matchup {...matchup} />
          </div>
        ))}
      </div>

      <div className="matchupsGroup">
        <h2>Future Matches</h2>
        {futureMatches.map((matchup) => (
          <div className="matchupsGroupDisabled" key={matchup.id}>
            <Matchup {...matchup} />
          </div>
        ))}
      </div>
    </div>
  );
};
