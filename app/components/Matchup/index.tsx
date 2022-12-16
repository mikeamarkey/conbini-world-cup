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
  if (!hours) {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'full',
      timeStyle: 'short',
    }).format(new Date(date));
  }

  if (hours > 0) {
    return `${hours} hours remaining`;
  }

  return 'Match complete';
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

  return (
    <div className="matchup">
      <div className="matchupDetails">
        <h3 className="matchupDetailsDate">{dateDisplay}</h3>
        <p className="matchupDetailsRound">{round}</p>
      </div>

      <div className="matchupItems">
        <Item
          position="left"
          isWinner={winner ? item1?.id === winner.id : false}
          item={item1}
        />
        <div className="matchupItemsVs">VS</div>
        <Item
          position="right"
          isWinner={winner ? item2?.id === winner.id : false}
          item={item2}
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
                <span className="emphasis">Cast your vote now!</span>
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
