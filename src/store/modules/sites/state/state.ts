import { ASite } from '@/classes/base/sites/ASite';

export type State = {
  sites: ASite[],
  currentSiteId: string,
  currentSite: ASite,
};

export const state: State = {
  sites: [],
  currentSiteId: '',
  currentSite: new ASite(),
};
