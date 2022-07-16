import Paragraph from "@/modules/text-editor/classes/paragraph/paragraph";
import { MutationTree } from "vuex";
import { State } from "../state/state";

export enum MutationTypes {
  ADD = 'add',
  DELETE = 'delete',
  CLEAR = 'clear',
};

export type Mutations<S = State> = {
  [MutationTypes.ADD](state: S, paragraph: Paragraph): void;
  [MutationTypes.DELETE](state: S, id: string): void;
  [MutationTypes.CLEAR](state: S, dummy: boolean): void;
};

export const mutations: MutationTree<State> & Mutations = {

  [MutationTypes.ADD](state: State, paragraph: Paragraph) {
    state.textEditorParagraphs.add(paragraph);
  },
  [MutationTypes.DELETE](state: State, id: string) {
    state.textEditorParagraphs.remove(id);
  },
  [MutationTypes.CLEAR](state: State, dummy: boolean) {
    state.textEditorParagraphs.clear();
  },
};
