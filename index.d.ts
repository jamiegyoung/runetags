import { EventNames, EventParams } from '@/api/gtag';

export {};

type GtagFn = (
  command: string,
  action: EventNames,
  params: EventParams,
) => void;

declare global {
  // noinspection JSUnusedGlobalSymbols
  interface Window {
    gtag: undefined | GtagFn;
  }
}
