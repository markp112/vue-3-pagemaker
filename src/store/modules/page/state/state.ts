import { PageElementClasses, PageElementFactory } from '@/classes/page-elements/factory/page-elements-factory';

export type State = {
  pageId: string;
  pageElements: PageElementClasses[];
  editedComponent: PageElementClasses;
  showEditDelete: boolean;
};

export const state: State = {
  pageId: '',
  pageElements: [],
  editedComponent: new PageElementFactory().createElement('rootContainer','ROOT'),
  showEditDelete: false,
};
