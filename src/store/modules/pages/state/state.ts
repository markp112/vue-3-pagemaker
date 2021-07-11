import { ASitePage } from '@/classes/page/page';

type Pages = ASitePage[];

export type State = {
  pages: Pages;
  currentPage: ASitePage
};

export const state: State = {
  pages: [],
  currentPage: new ASitePage(),
};
