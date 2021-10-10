import Guid from "@/common/guid/guid";

export default class Paragraph {
  _content = '';

  constructor(content: string) {
    this._content = content;
  }

  get hasUnderline(): boolean {
    return this._content.includes('underline');
  }

  get id(): string {
    const startOfId = this._content.indexOf('id') + 4;
    const endOfId = this._content.indexOf('"', startOfId);
    return this._content.substring(startOfId, endOfId)
  }

  get content(): string {
    return this._content;
  }

  set content(content: string) {
    this._content = content;
  }

};
