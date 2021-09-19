import Guid from "@/common/guid/guid";

export default class Paragraph {
  newLine() {
    throw new Error('Method not implemented.');
  }
  #hasUnderline: boolean;
  #id = '';

  constructor(hasUnderline: boolean, id = Guid.newSmallGuid()) {
    this.#hasUnderline = hasUnderline;
    this.#id = id;
  }

  get hasUnderline(): boolean {
    return this.#hasUnderline;
  }

  set hasUnderline(hasUnderline: boolean) {
    this.#hasUnderline = hasUnderline;
  }

  get id(): string {
    return this.#id;
  }

  set id(id: string) {
    this.#id = id;
  }
};
