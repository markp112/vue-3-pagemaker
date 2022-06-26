import { HTMLTags } from "../../../range-base";

export  class NodeUtilities {

  public createWrapperNode(htmlTag: HTMLTags): Node;
  public createWrapperNode(htmlTag: HTMLTags, textContent: string): Node;
  public createWrapperNode(htmlTag: HTMLTags, childNode: Node): Node;

  public createWrapperNode(htmlTag: HTMLTags, childNode?: Node | string): Node {
    const node = document.createElement(htmlTag);
    if (typeof childNode === 'object') {
      node.appendChild(childNode);
    }
    if (typeof childNode === 'string') {
      node.textContent = childNode;
    }
    return node;
  }

  public insertNode(range: Range, wrapperNode: Node,) {
    range.insertNode(wrapperNode);
  }
}