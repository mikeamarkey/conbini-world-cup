import type { LinksFunction } from '@remix-run/cloudflare';
import styles from './styles.css';
import comingsoon from '~/assets/comingsoon.jpeg';

export const divisions = ['Hot Box', 'Snack', 'Meal', 'Beverage'] as const;
type Division = typeof divisions[number];

export type ItemProps = {
  division: Division;
  id: string;
  image: string;
  isWinner: boolean;
  name: string;
  position?: 'left' | 'right';
  seed: number;
};

export const itemStyles: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: styles,
  },
];

const DecidedItem = ({
  division,
  image,
  name,
  position = 'left',
  seed,
  isWinner,
}: ItemProps) => {
  const divisionClassName = division.split(' ').join('').toLowerCase();
  return (
    <div className={`item item--${position}`}>
      <img className="itemImage" src={image} alt={name} />

      <div className="itemDetails">
        <p
          className={`itemDetailsDivision itemDetailsDivision--${divisionClassName}`}
        >
          {division} Divison {`#${seed}`}
        </p>
        <div className="itemDetailsName">
          <span>{name}</span>
          {isWinner && <span className="itemDetailsNameWinner">👍</span>}
        </div>
      </div>
    </div>
  );
};

const UndecidedItem = ({ position = 'left' }: Pick<ItemProps, 'position'>) => (
  <div className={`item item--${position}`}>
    <img className="itemImage" src={comingsoon} alt="TBD" />

    <div className="itemDetails">
      <p className="itemDetailsDivision">Divison & Seed TBD</p>
      <div className="itemDetailsName">
        <span>TBD</span>
      </div>
    </div>
  </div>
);

export const Item = ({
  item,
  position,
  isWinner,
}: {
  item?: Omit<ItemProps, 'isWinner'>;
  position: ItemProps['position'];
  isWinner: boolean;
}) => {
  if (item) {
    return <DecidedItem {...item} isWinner={isWinner} position={position} />;
  }
  return <UndecidedItem position={position} />;
};
