import type { LinksFunction } from '@remix-run/cloudflare';
import styles from './styles.css';

export const divisions = ['Hot Box', 'Snack', 'Meal', 'Beverage'] as const;
type Division = typeof divisions[number];

export type ItemProps = {
  division: Division;
  id: string;
  image: string;
  name: string;
  seed: number;
};

export const itemStyles: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: styles,
  },
];

const DecidedItem = ({ division, image, name, seed }: ItemProps) => (
  <div className="item">
    <p>Name: {name}</p>
    <p>Division: {division}</p>
    <p>Seed: {seed}</p>
    <img className="itemImage" src={image} alt={name} />
  </div>
);

const UndecidedItem = () => (
  <div className="item">
    <p>Name: TBA</p>
    <p>Division: TBA</p>
    <p>Seed: TBA</p>
  </div>
);

export const Item = ({ item }: { item?: ItemProps }) => {
  return item ? <DecidedItem {...item} /> : <UndecidedItem />;
};
