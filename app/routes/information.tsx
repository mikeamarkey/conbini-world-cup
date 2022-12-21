import type { LinksFunction } from '@remix-run/cloudflare';
import twitter from '~/assets/twitter.png';
import styles from '~/styles/information.css';

export const informationStyles: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export default function Information() {
  return (
    <div className="information">
      <h2>What Is This?</h2>
      <div className="card informationContent">
        <p>
          In 2020, we held the first ever Conbini Tournament, pitting 64 conbini
          items in 4 different divisions against one another to decide the best
          item at the conbini. The winner of that tournament was none other than
          the legendary <span className="emphasis">Famichiki.</span>
        </p>
        <br />
        <p>
          Now, in 2022, to coincide with the FIFA World Cup and to celebrate 100
          episodes of our podcast, we have decided to hold another tournament:
          the <span className="emphasis">Conbini World Cup</span>
        </p>
        <br />
        <p>
          Each day for the next couple of weeks we will release a number
          matches, and we need <span className="emphasis">YOUR</span> help to
          decide the winners! All matches will be decided through polls on
          twitter, so please click on the links, add your votes, and help us
          crown the champion of the Conbini World Cup 2022!
        </p>

        <a
          className="informationContentLink"
          href="https://twitter.com/conbiniboys"
          target="_blank"
          rel="noreferrer"
        >
          <span className="informationContentLinkText">
            Conbini Boys Twitter Page
          </span>
          <img
            className="informationContentLinkIcon"
            src={twitter}
            alt="See the result"
          />
        </a>
      </div>
    </div>
  );
}
