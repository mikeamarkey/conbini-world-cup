import type { LinksFunction } from '@remix-run/cloudflare';
import type { ItemProps } from '../Item';
import { Item, itemStyles } from '../Item';
import styles from './styles.css';

export type MatchupProps = {
  id: string;
  date?: string;
  item1?: ItemProps;
  item2?: ItemProps;
  round: string;
  tweet?: string;
};

export const matchupStyles: LinksFunction = () => [
  ...itemStyles(),
  {
    rel: 'stylesheet',
    href: styles,
  },
];

export const Matchup = ({ date, item1, item2, round, tweet }: MatchupProps) => {
  return (
    <div className="matchup">
      <p>Date: {date ?? 'TBD'}</p>
      <p>Round: {round}</p>
      <div className="matchupWrapper">
        <Item item={item1} />
        <Item item={item2} />
      </div>
      {tweet && <p>Cast your vote here! {tweet}</p>}
    </div>
  );
};
