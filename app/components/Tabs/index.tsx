import { Tab } from '@headlessui/react';
import type { LinksFunction } from '@remix-run/cloudflare';
import { Outlet, useSearchParams } from '@remix-run/react';
import styles from './styles.css';

export const tabsStyles: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: styles,
  },
];

const tabKeys = ['matchups', 'brackets', 'information'] as const;

const tabs: {
  tab: typeof tabKeys[number];
  name: string;
}[] = [
  {
    tab: 'matchups',
    name: 'Matchups',
  },
  { tab: 'brackets', name: 'Brackets' },
  {
    tab: 'information',
    name: 'Information',
  },
];

export const Tabs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const activeTab = tabs.findIndex((tab) => tab.tab === tabParam);
  const activeTabIndex = activeTab >= 0 ? activeTab : 0;

  return (
    <Tab.Group
      defaultIndex={activeTabIndex}
      onChange={(index) => setSearchParams({ tab: tabs[index].tab })}
    >
      <Tab.List className="tablist">
        {tabs.map(({ tab, name }) => (
          <Tab key={tab} className="tablistItem">
            {name}
          </Tab>
        ))}
      </Tab.List>

      <Tab.Panels>
        {tabs.map(({ tab }) => (
          <Tab.Panel key={tab} className="tabpanel">
            <Outlet />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};
