import { ComponentCounter } from '@/classes/base/component-counter/component-counter';
describe('ComponentCounter', () => {

  const componentCounter = ComponentCounter.getInstance();;

  it('should instantiate a single instance of ComponentCounter with an initial value of zero', () => {
    expect(componentCounter.getCounter()).toEqual(0);
  });

  it('should when getNextCounter is called return one more then the previous value of counter', () => {
    const currentValue = componentCounter.getCounter();
    componentCounter.getNextCounter();
    expect(componentCounter.getCounter()).toEqual(currentValue + 1);
  });

})
