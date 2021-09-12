import { RootState } from '@/store';
import { ActionContext, ActionTree } from 'vuex';
import { State } from '../state/state';
import { Mutations, MutationTypes } from '../mutations/mutations';
import Paragraph from '@/modules/text-editor/classes/paragraph/paragraph';
import getId from '../helpers/helpers';

export enum ActionTypes {
  ADD_PARARGRAPH = 'addParagraph',
  CREATE_PARAGRAPH = 'createParagraph',
  REMOVE_PARAGRAPH = 'removeParagraph',
  DELETE_ALL_PARAGRAPHS = 'deleteAllParagraphs',
  BUILD_PARAGRAPHS = 'buildParagraphs',
};

type ActionArguments = Omit<ActionContext<State, RootState>, 'commit'> & {
  commit<K extends keyof Mutations> (
    key: K,
    payload: Parameters<Mutations[K]>[1]
    ): ReturnType <Mutations[K]>
};

export type Actions = { 
  [ActionTypes.ADD_PARARGRAPH](context: ActionArguments, paragraph: Paragraph): void,
  [ActionTypes.BUILD_PARAGRAPHS](context: ActionArguments, htmlContent: string): void,
  [ActionTypes.CREATE_PARAGRAPH](context: ActionArguments, dummy: boolean): Promise<string>,
  [ActionTypes.DELETE_ALL_PARAGRAPHS](context: ActionArguments, dummy: boolean): void,
  [ActionTypes.REMOVE_PARAGRAPH](context: ActionArguments, id: string): void,
};

export const actions: ActionTree<State, RootState> & Actions = {

  [ActionTypes.ADD_PARARGRAPH]({commit}, paragraph) {
    commit(MutationTypes.ADD, paragraph);
  },

  [ActionTypes.BUILD_PARAGRAPHS]({commit}, htmlContent) {
    commit(MutationTypes.CLEAR, true);
    const paras = htmlContent.split('<p');
    paras.forEach(para => {
      const hasUnderline = para.includes('underline');
      if (para !== '') {
        const id = getId(para);
        const paragraph = new Paragraph(hasUnderline, id);
        commit(MutationTypes.ADD, paragraph);
      }
    })
  },

  [ActionTypes.CREATE_PARAGRAPH]({commit},boolean) {
    return new Promise((resolve) => {
      const paragraph = new Paragraph(false);
      commit(MutationTypes.ADD, paragraph);
      resolve(paragraph.id);
    })
  },

  [ActionTypes.DELETE_ALL_PARAGRAPHS]({commit}, paragraph) {
    commit(MutationTypes.CLEAR, true);
  },

  [ActionTypes.REMOVE_PARAGRAPH]({commit}, id) {
    commit(MutationTypes.DELETE, id);
  },

}