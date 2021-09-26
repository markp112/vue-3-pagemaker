

export interface Scroller<T> {
  Items(direction: number): T[];
}

export default class ScrollInfinite<T>  {
  
  private listItems: T[] = [];
  private windowList: T[] = [];
  private currentForwardPosition = 0;
  private currentBackPosition = 0;
  private pageSize: number;

  constructor(pageSize: number, listItems: T[]) {
    this.pageSize = pageSize;
    this.listItems = listItems;
    this.windowList = this.listItems.slice(0, pageSize)
    this.currentForwardPosition = this.pageSize;
    
  }

  scrollForward(): void {
    this.currentForwardPosition++;
    if (this.currentForwardPosition === this.listItems.length - 1) {
      this.currentForwardPosition = this.listItems.length - 1;
    }
    this.currentBackPosition++;
    this.windowList = this.listItems.slice(this.currentBackPosition, this.currentForwardPosition)
  }
  
  scrollBackward(): void {
    this.currentBackPosition > 0 ? this.currentBackPosition-- : 0;
    this.currentForwardPosition > this.pageSize ? this.currentForwardPosition-- : this.pageSize;
    this.windowList = this.listItems.slice(this.currentBackPosition, this.currentForwardPosition)
  }

  get items(): T[] {
    return this.windowList;
    }
}
