import { Tab } from '@headlessui/react';
import type { LinksFunction } from '@remix-run/cloudflare';
import { Outlet, useNavigate } from '@remix-run/react';
import styles from './styles.css';

export const tabsStyles: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: styles,
  },
];

const tabs: {
  route: string;
  name: string;
}[] = [
  {
    route: '',
    name: 'Matchups',
  },
  { route: 'brackets', name: 'Brackets' },
  {
    route: 'information',
    name: 'Information',
  },
];

export const Tabs = () => {
  const navigate = useNavigate();
  return (
    <Tab.Group onChange={(index) => navigate(tabs[index].route)}>
      <Tab.List className="tablist">
        {tabs.map(({ route, name }) => (
          <Tab key={route} className="tablistItem">
            {name}
          </Tab>
        ))}
      </Tab.List>

      <Tab.Panels>
        {tabs.map(({ route }) => (
          <Tab.Panel key={route} className="tabpanel">
            <Outlet />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};
