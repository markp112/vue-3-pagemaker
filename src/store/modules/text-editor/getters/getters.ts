import Paragraph from "@/modules/text-editor/classes/paragraph/paragraph";
import { RootState } from "@/store";
import { GetterTree } from "vuex";
import { State } from "../state/state";

export type Getters = {
  getParagraph(state: State): (id: string) => Paragraph,
};

export const getters: GetterTree<State, RootState> & Getters = {

  getParagraph:(state: State) => (id: string): Paragraph => {
    return state.textEditorParagraphs.getParagraph(id);
  },
};
