import type { LinksFunction } from '@remix-run/cloudflare';
import type { ItemProps } from '../Item';
import { Item, itemStyles } from '../Item';
import styles from './styles.css';
import twitter from '~/assets/twitter.png';

export type MatchupProps = {
  id: string;
  date: string;
  item1?: Omit<ItemProps, 'isWinner'>;
  item2?: Omit<ItemProps, 'isWinner'>;
  matchState: 'complete' | 'ongoing' | 'scheduled';
  remainingHours?: number;
  round: string;
  tweet?: string;
  winner?: {
    id: ItemProps['id'];
    name: ItemProps['name'];
    percent: number;
  };
};

export const matchupStyles: LinksFunction = () => [
  ...itemStyles(),
  {
    rel: 'stylesheet',
    href: styles,
  },
];

const getDateDisplay = (
  date: MatchupProps['date'],
  hours: MatchupProps['remainingHours']
) => {
  if (typeof hours === 'undefined') {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'full',
      timeStyle: 'short',
    }).format(new Date(date));
  }

  if (hours < 0) {
    return 'Match complete';
  }

  if (hours <= 1) {
    return 'Match ending soon!';
  }

  return `${hours} hours remaining`;
};

const getOrderedItems = (
  item1: MatchupProps['item1'],
  item2: MatchupProps['item2']
) => {
  if (!item1 && !item2) {
    return [item1, item2];
  }

  if (!item1) {
    return [item2, item1];
  }

  if (!item2) {
    return [item1, item2];
  }

  if (item2.seed < item1.seed) {
    return [item2, item1];
  }

  return [item1, item2];
};

export const Matchup = ({
  date,
  item1,
  item2,
  remainingHours,
  round,
  tweet,
  winner,
}: MatchupProps) => {
  const dateDisplay = getDateDisplay(date, remainingHours);
  const [left, right] = getOrderedItems(item1, item2);

  return (
    <div className="card matchup">
      <div className="matchupDetails">
        <h3 className="matchupDetailsDate">{dateDisplay}</h3>
        <p className="matchupDetailsRound">{round}</p>
      </div>

      <div className="matchupItems">
        <Item
          position="left"
          isWinner={winner ? left?.id === winner.id : false}
          item={left}
        />
        <div className="matchupItemsVs">VS</div>
        <Item
          position="right"
          isWinner={winner ? right?.id === winner.id : false}
          item={right}
        />
      </div>

      {tweet && (
        <a
          className="matchupActions"
          href={tweet}
          target="_blank"
          rel="noreferrer"
        >
          {winner ? (
            <>
              <span className="matchupActionsText">
                <span className="emphasis">{winner.name}</span> wins with {` `}
                <span className="emphasis">{winner.percent}%</span> of the vote!
              </span>
              <img
                className="matchupActionsIcon"
                src={twitter}
                alt="See the result"
              />
            </>
          ) : (
            <>
              <span className="matchupActionsText">
                <span className="emphasis">
                  Click here to cast your vote now!
                </span>
              </span>
              <img
                className="matchupActionsIcon"
                src={twitter}
                alt="Cast your vote"
              />
            </>
          )}
        </a>
      )}
    </div>
  );
};
