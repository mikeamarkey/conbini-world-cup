import type { LinksFunction } from '@remix-run/cloudflare';
import type { Matchup as MatchupModel } from '~/models/matchup.server';
import { Item, itemStyles } from '../Item';
import styles from './styles.css';

type MatchupProps = {
  matchup: MatchupModel;
};

export const matchupStyles: LinksFunction = () => [
  ...itemStyles(),
  {
    rel: 'stylesheet',
    href: styles,
  },
];

export const Matchup = ({ matchup }: MatchupProps) => {
  return (
    <div className="matchup">
      <p>Date: {matchup.date}</p>
      <div className="matchupWrapper">
        <Item item={matchup.item1} />
        <Item item={matchup.item2} />
      </div>
    </div>
  );
};
