import type { LinksFunction } from '@remix-run/cloudflare';
import styles from './styles.css';
import conbiniboys from '~/assets/conbiniboys.jpeg';

export const headerStyles: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: styles,
  },
];

export const Header = () => {
  return (
    <div className="header">
      <div className="headerIcon">
        <img src={conbiniboys} alt="conbiniboys" />
      </div>

      <h1 className="headerHeading">Conbini World Cup 2022</h1>
    </div>
  );
};
