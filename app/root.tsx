import type { LinksFunction, MetaFunction } from '@remix-run/cloudflare';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import reset from '~/styles/reset.css';
import global from '~/styles/global.css';

function linksFn() {
  return [
    {
      rel: 'stylesheet',
      href: reset,
    },
    {
      rel: 'stylesheet',
      href: global,
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Poppins:Medium|Noto+Sans:Regular"',
    },
  ];
}

// FIXME: re-exporting function because of issue with arrow function
// https://github.com/remix-run/remix/issues/4155
export const links: LinksFunction = linksFn;

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Conbini World Cup',
  viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div id="app">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
