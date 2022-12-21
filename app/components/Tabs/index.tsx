import { Tab } from '@headlessui/react';
import type { LinksFunction } from '@remix-run/cloudflare';
import { useNavigate } from '@remix-run/react';
import type { ReactNode } from 'react';
import styles from './styles.css';

type TabsProps = {
  route: string;
  children: ReactNode;
};

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
    route: '/',
    name: 'Matchups',
  },
  { route: '/brackets', name: 'Brackets' },
  {
    route: '/information',
    name: 'Information',
  },
];

export const Tabs = ({ route, children }: TabsProps) => {
  const activeIndex = tabs.findIndex((tab) => tab.route === route);
  const navigate = useNavigate();
  return (
    <Tab.Group
      defaultIndex={activeIndex >= 0 ? activeIndex : 0}
      onChange={(index) => navigate(tabs[index].route)}
    >
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
            <div className="tabpanelContent">{children}</div>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};
