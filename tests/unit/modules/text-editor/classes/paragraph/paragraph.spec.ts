import Paragraph from "@/modules/text-editor/classes/paragraph/paragraph"
import { setup } from "vue-class-component";
import { stringifyQuery } from "vue-router";

const testDataP1 = '<p id="e673k" class="text-editor">Lorem ipsum But I must explain to you <span class="textDecoration underline">how all this mistaken idea of denouncing pleasure and praising pain was born</span></p>'
const testDataP2 = '<p id="e673g" class="text-editor">Lorem ipsum But I must explain to you <span class="textDecoration">how all this mistaken idea of denouncing pleasure and praising pain was born</span></p>'

describe('Paragraph', () => {

  let paragraph: Paragraph;

  function setup(para: string) {
    paragraph = new Paragraph(para);
  }

  it('should store a single html Paragraph', () => {
    setup(testDataP1);
    expect(paragraph.content).toEqual(testDataP1);
  });
  
  it('should return true if there is an underline class somewhere in the paragraph', () => {
    setup(testDataP1);
    expect(paragraph.hasUnderline).toBe(true);
  });
  
  it('should return false if there is an underline class somewhere in the paragraph', () => {
    setup(testDataP2);
    expect(paragraph.hasUnderline).toBe(false);
  });
  
  it('should return the id of the paragraph when get Id is called', () => {
    setup(testDataP1);
    const id = paragraph.id;
    expect(id).toEqual('e673k');
  })


})