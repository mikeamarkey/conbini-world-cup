import { Tab } from '@headlessui/react';
import type { LinksFunction, LoaderArgs } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { Matchup, matchupStyles } from '~/components';
import { getMatchups } from '~/models/matchup.server';
import indexStyles from '~/styles/index.css';
import brackets from '~/assets/brackets.png';

export const loader = async ({ context }: LoaderArgs) => {
  const cachedMatchups = await context.CWC_KV.get<
    Awaited<ReturnType<typeof getMatchups>>
  >('matchups', {
    type: 'json',
  });
  if (cachedMatchups) {
    return json(cachedMatchups);
  }

  const matchups = await getMatchups({ airtableToken: context.AIRTABLE_TOKEN });
  await context.CWC_KV.put('matchups', JSON.stringify(matchups), {
    expirationTtl: 60,
  });
  return json(matchups);
};

export const links: LinksFunction = () => [
  ...matchupStyles(),
  {
    rel: 'stylesheet',
    href: indexStyles,
  },
];

export default function Index() {
  const matchups = useLoaderData<typeof loader>();
  const ongoingMatches = matchups.filter(
    (matchup) => matchup.matchState === 'ongoing'
  );
  const completedMatches = matchups
    .filter((matchup) => matchup.matchState === 'complete')
    .reverse();
  const futureMatches = matchups.filter(
    (matchup) => matchup.matchState === 'scheduled'
  );

  return (
    <Tab.Group>
      <Tab.List className="tablist">
        <Tab className="tablistItem">Matchups</Tab>
        <Tab className="tablistItem">Brackets</Tab>
        <Tab className="tablistItem">Information</Tab>
      </Tab.List>

      <Tab.Panels>
        <Tab.Panel className="tabpanel">
          <div className="indexMatchups">
            <h2>Ongoing Matches</h2>
            {ongoingMatches.map((matchup) => (
              <div key={matchup.id}>
                <Matchup {...matchup} />
              </div>
            ))}
          </div>

          <div className="indexMatchups">
            <h2>Recent Matches</h2>
            {completedMatches.map((matchup) => (
              <div key={matchup.id}>
                <Matchup {...matchup} />
              </div>
            ))}
          </div>

          <div className="indexMatchups">
            <h2>Future Matches</h2>
            {futureMatches.map((matchup) => (
              <div className="indexMatchupsDisabled" key={matchup.id}>
                <Matchup {...matchup} />
              </div>
            ))}
          </div>
        </Tab.Panel>

        <Tab.Panel className="tabpanel">
          <h2>Check Out the Brackets</h2>
          <div className="brackets">
            <a
              className="bracketsLink"
              href="https://docs.google.com/spreadsheets/d/1kyKhbq6h-8Qe_RWgavOBb34pHgVkIr2nznjbp8eeszY/edit#gid=0"
            >
              Click here to get your own copy of the brackets!
            </a>
            <img className="bracketsImage" src={brackets} alt="brackets" />
          </div>
        </Tab.Panel>

        <Tab.Panel className="tabpanel">
          <h2>What Is This?</h2>
          <div className="information">
            <p>
              In 2020, we held the first ever Conbini Tournament, pitting 64
              conbini items in 4 different divisions against one another to
              decide the best item at the conbini. The winner of that tournament
              was none other than the legendary{' '}
              <span className="emphasis">Famichiki.</span>
            </p>
            <br />
            <p>
              Now, in 2022, to coincide with the FIFA World Cup and to celebrate
              100 episodes of our podcast, we have decided to hold another
              tournament: the{' '}
              <span className="emphasis">Conbini World Cup</span>
            </p>
            <br />
            <p>
              Each day for the next couple of weeks we will release a number
              matches, and we need <span className="emphasis">YOUR</span> help
              to decide the winners! All matches will be decided through polls
              on twitter, so please click on the links, add your votes, and help
              us crown the champion of the Conbini World Cup 2022!
            </p>
          </div>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
