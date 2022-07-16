import Paragraph from "../paragraph/paragraph";

/**..
 * @description maintains a list of the paragraphs in the text editor each paragraph is given a unique id 
 */
export class Paragraphs {
  paragraphs: Paragraph[] = [];

  length(): number {
    return this.paragraphs.length;
  }

  constructor(htmlContent: string) {
    this.build(htmlContent);
  }

  add(paragraph: Paragraph): void {
    const doesParagraphExist = this.getParagraph(paragraph.id);
    if (!doesParagraphExist) {
      this.paragraphs.push(paragraph);
    }
  }

  private build(htmlContent: string) {
    const paras = htmlContent.split('<p');
    console.log('%c⧭', 'color: #364cd9', paras);
    paras.forEach(para => {
      if (para !== '') {
        const paragraph = new Paragraph(`<p${para}`);
        this.add(paragraph);
      }
    })
  }

  clear() {
    this.paragraphs = [];
  }

  remove(id: string): void {
    this.paragraphs = this.paragraphs.filter(para => para.id !== id);
  }

  getParagraph(id: string): Paragraph {
    return this.paragraphs.filter(para => para.id === id)[0];
  }

  getParagraphs(): Paragraph[] {
    return this.paragraphs;
  }

  getParagraphsAsString(): string {
    return this.paragraphs.map(para => para.content).join('');
  }

};
