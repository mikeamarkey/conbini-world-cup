import type { LinksFunction } from '@remix-run/cloudflare';
import bracketsImage from '~/assets/brackets.png';
import bracketsMattImage from '~/assets/brackets-matt.png';
import bracketsMikeImage from '~/assets/brackets-mike.png';
import styles from '~/styles/brackets.css';

export const bracketsStyles: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export default function Brackets() {
  return (
    <div className="brackets">
      <div className="bracketsGroup">
        <h2>Official Brackets</h2>
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
      <div className="bracketsGroup">
        <h2>Matt's Bracket</h2>
        <div className="bracketsContent card">
          <img src={bracketsMattImage} alt="brackets" />
        </div>
      </div>
      <div className="bracketsGroup">
        <h2>Mike's Bracket</h2>
        <div className="bracketsContent card">
          <img src={bracketsMikeImage} alt="brackets" />
        </div>
      </div>
    </div>
  );
}
