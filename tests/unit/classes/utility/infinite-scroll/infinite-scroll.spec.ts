import  ScrollInfinite  from "@/classes/utility/infinite-scroll/infinite-scroll";

type DataElement = {
  id: number;
  value: string;
}

function setUpData(): DataElement[] {
  const elements: DataElement[] = [];
  for (let index = 0; index < 15; index++) {
    const newElement: DataElement = {
      id: index,
      value: `value ${index}`
    }; elements.push(newElement)
  }
  return elements;
}

describe('infinite-scroll', () => {
  
  const pageSize = 12;
  let scroller: ScrollInfinite<DataElement>;

  beforeEach(() => {
    const elementsToScroll:DataElement[] = setUpData();
    scroller = new ScrollInfinite<DataElement>(pageSize, elementsToScroll)

  })

  it('should when items is called for the first time return the first pageSize elements', () => {
    const items: DataElement[] = scroller.items;
    expect(items.length).toBe(pageSize);
    expect(items[0].id).toBe(0);
    expect(items[0].value).toBe('value 0');
    expect(items[pageSize - 1].id).toBe(pageSize - 1);
  });

  it('should when scrollForward is called, scroll the list by 1 row', () => {
    let items: DataElement[] = scroller.items;
    const currentId = items[pageSize - 1].id;
    scroller.scrollForward();
    items = scroller.items;
    expect(items[pageSize - 1].id).toBe(currentId + 1);
    scroller.scrollForward();
    items = scroller.items;
    expect(items[pageSize - 1].id).toBe(currentId + 2);
  });

  it('should when scrollBackward is called scroll the list one element backwards', () => {
    scroller.scrollForward();
    let items: DataElement[] = scroller.items;
    const startId = items[0].id;
    const endId = items[pageSize - 1].id;
    scroller.scrollBackward();
    items = scroller.items;
    expect(items[0].id).toBe(startId - 1);
    expect(items[pageSize - 1].id).toBe(endId - 1);
  });

  it('should not scroll beyond the end of the last element', () => {
    scroller.scrollForward();
    let items: DataElement[] = scroller.items;
    expect(items[pageSize - 1].id).toBe(pageSize);
    scroller.scrollForward();
    scroller.scrollForward();
    scroller.scrollForward();
    items = scroller.items;
    expect(items[items.length - 1].id).toBe(pageSize + 2);
    scroller.scrollForward();
    expect(items[items.length - 1].id).toBe(pageSize + 2);
  });

  it('should not scroll beyond the start of the array', () => {
    let items: DataElement[] = scroller.items;
    expect(items[0].id).toBe(0);
    scroller.scrollBackward();
    items = scroller.items;
    expect(items[0].id).toBe(0);
    scroller.scrollForward();
    scroller.scrollBackward();
    scroller.scrollBackward();
    items = scroller.items;
    expect(items[0].id).toBe(0);
  })

})