import type { Matchup as MatchupModel } from '~/models/matchup.server';
import { Item } from '../Item';

type MatchupProps = {
  matchup: MatchupModel;
};

export const Matchup = ({ matchup }: MatchupProps) => {
  return (
    <div
      style={{
        padding: 8,
        margin: 8,
        borderRadius: 4,
        background: 'lightgray',
        whiteSpace: 'pre',
      }}
    >
      <p>Date: {matchup.date}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Item item={matchup.item1} />
        <Item item={matchup.item2} />
      </div>
    </div>
  );
};
