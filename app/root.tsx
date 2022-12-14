import type { LinksFunction, MetaFunction } from '@remix-run/cloudflare';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from '@remix-run/react';
import reset from '~/styles/reset.css';
import global from '~/styles/global.css';
import { Header, headerStyles, Tabs, tabsStyles } from '~/components';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Poppins:Medium|Noto+Sans:Regular"',
    },
    {
      rel: 'stylesheet',
      href: reset,
    },
    {
      rel: 'stylesheet',
      href: global,
    },
    ...headerStyles(),
    ...tabsStyles(),
  ];
};

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Conbini World Cup',
  viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
  const { pathname } = useLocation();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div id="app">
          <Header />
          <Tabs route={pathname}>
            <Outlet />
          </Tabs>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
