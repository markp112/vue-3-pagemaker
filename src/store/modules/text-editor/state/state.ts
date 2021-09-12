import { Paragraphs } from "@/modules/text-editor/classes/paragraphs/paragraphs";

export type State = {
  textEditorParagraphs: Paragraphs;
};

export const state: State = {
  textEditorParagraphs: new Paragraphs(),
};
