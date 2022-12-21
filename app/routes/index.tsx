import { Tab } from '@headlessui/react';
import type { LinksFunction, LoaderArgs } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { useLoaderData, useSearchParams } from '@remix-run/react';
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

const tabKeys = ['matchups', 'brackets', 'information'] as const;

const tabs: {
  tab: typeof tabKeys[number];
  name: string;
  Component: (props: MatchupsProps) => JSX.Element;
}[] = [
  {
    tab: 'matchups',
    name: 'Matchups',
    Component: (props) => <Matchups matchups={props.matchups} />,
  },
  { tab: 'brackets', name: 'Brackets', Component: () => <Brackets /> },
  {
    tab: 'information',
    name: 'Information',
    Component: () => <Information />,
  },
];

export default function Index() {
  const matchups = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const activeTab = tabs.findIndex((tab) => tab.tab === tabParam);
  const activeTabIndex = activeTab >= 0 ? activeTab : 0;

  return (
    <div className="index">
      <Tab.Group
        defaultIndex={activeTabIndex}
        onChange={(index) => setSearchParams({ tab: tabs[index].tab })}
      >
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
