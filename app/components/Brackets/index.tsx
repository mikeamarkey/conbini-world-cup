import type { LinksFunction } from '@remix-run/cloudflare';
import bracketsImage from '~/assets/brackets.png';
import styles from './styles.css';

export const bracketsStyles: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export const Brackets = () => {
  return (
    <div className="brackets">
      <h2>Check Out the Brackets</h2>
      <div className="card bracketsContent">
        <a
          className="bracketsContentLink"
          href="https://docs.google.com/spreadsheets/d/1NiAOum_dh0k0p4I6IgHyLRtUrEHqHxccBeGcJdHde90/edit#gid=0"
        >
          Click here to see the latest brackets (updated daily)
        </a>

        <a
          className="bracketsContentLink"
          href="https://docs.google.com/spreadsheets/u/3/d/1kyKhbq6h-8Qe_RWgavOBb34pHgVkIr2nznjbp8eeszY/copy#gid=0"
        >
          Click here to download a fresh copy of your own!
        </a>
        <img
          className="bracketsContentImage"
          src={bracketsImage}
          alt="brackets"
        />
      </div>
    </div>
  );
};
