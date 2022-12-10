import type { LinksFunction } from '@remix-run/cloudflare';
import type { Item as ItemModel } from '~/models/items.server';
import styles from './styles.css';

type ItemProps = {
  item: ItemModel | undefined;
};

export const itemStyles: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: styles,
  },
];

export const Item = ({ item }: ItemProps) => {
  return item ? (
    <div className="item">
      <p>Name: {item.name}</p>
      <p>Division: {item.division}</p>
      <p>Seed: {item.seed}</p>
      <img className="itemImage" src={item.image} alt={item.name} />
    </div>
  ) : (
    <div className="item">
      <p>Name: TBA</p>
      <p>Division: TBA</p>
      <p>Seed: TBA</p>
    </div>
  );
};
