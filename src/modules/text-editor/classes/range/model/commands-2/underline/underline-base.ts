export class  UnderlineBase {

  getParentNodeWithUnderline(node: Node | null): Node | null {
    if (!node) return null;
    if (node.nodeName === 'P') return null;
    if (node.nodeName === 'SPAN') {
      if ((node as HTMLSpanElement).innerHTML.includes('underline')) {
        return node;
      }
    }
    return this.getParentNodeWithUnderline(node.parentNode);
  }

}