import { Tab } from '@headlessui/react';
import type { LinksFunction, LoaderArgs } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import type { MatchupsProps } from '~/components';
import {
  Brackets,
  bracketsStyles,
  Information,
  informationStyles,
  Matchups,
  matchupsStyles,
} from '~/components';
import { getMatchups } from '~/models/matchup.server';
import indexStyles from '~/styles/index.css';

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
  ...matchupsStyles(),
  ...bracketsStyles(),
  ...informationStyles(),
  {
    rel: 'stylesheet',
    href: indexStyles,
  },
];

const tabs = [
  {
    name: 'Matchups',
    Component: (props: MatchupsProps) => <Matchups matchups={props.matchups} />,
  },
  { name: 'Brackets', Component: () => <Brackets /> },
  { name: 'Information', Component: () => <Information /> },
];

export default function Index() {
  const matchups = useLoaderData<typeof loader>();

  return (
    <div className="index">
      <Tab.Group>
        <Tab.List className="tablist">
          {tabs.map((tab) => (
            <Tab key={tab.name} className="tablistItem">
              {tab.name}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          {tabs.map(({ name, Component }) => (
            <Tab.Panel key={name} className="tabpanel">
              <div className="tabpanelContent">
                <Component matchups={matchups} />
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
