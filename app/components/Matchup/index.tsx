import type { LinksFunction } from '@remix-run/cloudflare';
import type { ItemProps } from '../Item';
import { Item, itemStyles } from '../Item';
import styles from './styles.css';
import twitter from '~/assets/twitter.png';

export type MatchupProps = {
  id: string;
  date: string;
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
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(new Date(date));

  return (
    <div className="matchup">
      <div className="matchupDetails">
        <h3 className="matchupDetailsDate">{formattedDate}</h3>
        <p className="matchupDetailsRound">{round}</p>
      </div>

      <div className="matchupItems">
        <Item position="left" item={item1} />
        <div className="matchupItemsVs">VS</div>
        <Item position="right" item={item2} />
      </div>

      {tweet && (
        <a
          className="matchupActions"
          href={tweet}
          target="_blank"
          rel="noreferrer"
        >
          <span className="matchupActionsText">Cast your vote!</span>
          <img
            className="matchupActionsIcon"
            width="24"
            src={twitter}
            alt="Cast your vote!"
          />
        </a>
      )}
    </div>
  );
};
