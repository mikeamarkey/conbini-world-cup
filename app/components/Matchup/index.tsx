import type { LinksFunction } from '@remix-run/cloudflare';
import type { ItemProps } from '../Item';
import { Item, itemStyles } from '../Item';
import styles from './styles.css';

export type MatchupProps = {
  id: string;
  date: string;
  item1?: ItemProps;
  item2?: ItemProps;
};

export const matchupStyles: LinksFunction = () => [
  ...itemStyles(),
  {
    rel: 'stylesheet',
    href: styles,
  },
];

export const Matchup = ({ date, item1, item2 }: MatchupProps) => {
  return (
    <div className="matchup">
      <p>Date: {date}</p>
      <div className="matchupWrapper">
        <Item item={item1} />
        <Item item={item2} />
      </div>
    </div>
  );
};
