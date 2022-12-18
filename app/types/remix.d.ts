import '@remix-run/cloudflare';
import type { DataFunctionArgs } from '@remix-run/cloudflare';

export type Env = {
  AIRTABLE_TOKEN: string;
};

export type Context = {
  CWC_KV: KVNamespace<'matchups'>;
} & Env;

declare module '@remix-run/cloudflare' {
  export interface LoaderArgs extends DataFunctionArgs {
    context: Context;
  }

  export interface ActionArgs extends DataFunctionArgs {
    context: Context;
  }
}
