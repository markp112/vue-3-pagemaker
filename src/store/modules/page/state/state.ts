import { PageElementClasses } from '@/classes/page-elements/factory/page-elements-factory';

export type State = {
  pageId: string;
  pageElements: PageElementClasses[];
  editedComponent: PageElementClasses | undefined;
  showEditDelete: boolean;
  panFlag: boolean;
  dragFlag: boolean;
};

export const state: State = {
  pageId: '',
  pageElements: [],
  editedComponent: undefined,
  showEditDelete: false,
  panFlag: false,
  dragFlag: false,
};
