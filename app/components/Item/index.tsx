import type { Item as ItemModel } from '~/models/items.server';

type ItemProps = {
  item: ItemModel | undefined;
};

export const Item = ({ item }: ItemProps) => {
  return item ? (
    <div style={{ maxWidth: 300 }}>
      <p>Name: {item.name}</p>
      <p>Division: {item.division}</p>
      <p>Seed: {item.seed}</p>
      <img
        style={{ maxHeight: 200, maxWidth: '100%' }}
        src={item.image}
        alt={item.name}
      />
    </div>
  ) : (
    <div style={{ maxWidth: 300 }}>
      <p>Name: TBA</p>
      <p>Division: TBA</p>
      <p>Seed: TBA</p>
    </div>
  );
};
