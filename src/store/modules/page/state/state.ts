import { PageElementClasses } from '@/classes/page-elements/factory/page-elements-factory';

export type State = {
  pageId: string;
  pageElements: PageElementClasses[];
  editedComponent: PageElementClasses | undefined;
  showEditDelete: boolean;
};

export const state: State = {
  pageId: '',
  pageElements: [],
  editedComponent: undefined,
  showEditDelete: false,
};
