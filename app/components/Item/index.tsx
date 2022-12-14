import type { LinksFunction } from '@remix-run/cloudflare';
import styles from './styles.css';

export const divisions = ['Hot Box', 'Snack', 'Meal', 'Beverage'] as const;
type Division = typeof divisions[number];

export type ItemProps = {
  division: Division;
  id: string;
  image: string;
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
}: ItemProps) => (
  <div className={`item item--${position}`}>
    <img className="itemImage" src={image} alt={name} />

    <div className="itemDetails">
      <p className="itemDetailsDivision">
        {division} Divison {`#${seed}`}
      </p>
      <p className="itemDetailsName">{name}</p>
    </div>
  </div>
);

const UndecidedItem = ({ position = 'left' }: Pick<ItemProps, 'position'>) => (
  <div className={`item item--${position}`}>
    <p>Name: TBA</p>
    <p>Division: TBA</p>
    <p>Seed: TBA</p>
  </div>
);

export const Item = ({
  item,
  position,
}: {
  item?: ItemProps;
  position: ItemProps['position'];
}) => {
  if (item) {
    return <DecidedItem {...item} position={position} />;
  }
  return <UndecidedItem position={position} />;
};
