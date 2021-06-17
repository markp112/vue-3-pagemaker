import { shallowMount, mount } from '@vue/test-utils';
import TextInput from '@/components/base/form-controls/text-input/text-input.vue';

type ComponentProps = {
  label: string,
  initialValue: number | string,
  type: string,
}

const createTextInput = (propsData: ComponentProps) => mount(TextInput, {props: propsData})
describe('TextInput', () => {
  const props: ComponentProps =  {
    label: 'A label',
    initialValue: 'test',
    type: 'text',
  };

  it('should render an input element of prop type text', () => {
    const wrapper = createTextInput(props);
    expect(wrapper.exists).toBeTruthy();
    const wrapperElement = wrapper.find('input[type=text]');
    expect(wrapperElement).toBeDefined();
  });

  it('should render an input element of prop type number', () => {
    props.type = 'number';
    props.initialValue = 12;
    const wrapper = createTextInput(props);
    expect(wrapper.exists).toBeTruthy();
    const wrapperElement = wrapper.find('input[type=number]');
    expect(wrapperElement).toBeDefined();
  });

  it('should render an input element of prop type text and set its value to be the prop value', async () => {
    props.type = 'text';
    props.initialValue = 'test value';
    const wrapper = createTextInput(props);
    expect(wrapper.exists).toBeTruthy();
    const wrapperElement = await wrapper.find('input[type=text]');
    expect(wrapperElement).toBeDefined();
    const inputElement = wrapperElement.element as HTMLInputElement;
    expect(inputElement.value).toBe('test value');
  });

  it('should render an input element of prop type number and set its value to be the prop value', async () => {
    props.type = 'number';
    props.initialValue = 12;
    const wrapper = createTextInput(props);
    expect(wrapper.exists).toBeTruthy();
    const inputElement = await wrapper.find('input[type=number]').element as HTMLInputElement;
    expect(inputElement.value).toBe('12');
  });

  it('should render an input element of prop type number and set its value to empty string if a non numeric is passed in', async () => {
    props.type = 'number';
    props.initialValue = '12a';
    const wrapper = createTextInput(props);
    expect(wrapper.exists).toBeTruthy();
    const inputElement = await wrapper.find('input[type=number]').element as HTMLInputElement;
    expect(inputElement.value).toBe('');
  });

  it('should emit an event when the value changes', async () => {
    props.type = 'text';
    props.initialValue = 'test';
    const element = createTextInput(props);
    const inputValueChange = element.vm.inputValueChange = jest.fn();
    const wrapperElement = await element.find('input[type=text]');
    await wrapperElement.setValue('test');
    const inputElement = wrapperElement.element as HTMLInputElement;
    expect(inputElement.value).toEqual('test');
    expect(inputValueChange).toBeCalled();
    expect(inputValueChange).toBeCalledTimes(1);
    element.vm.$nextTick(() => {
      expect(element.emitted().onChange[0]).toEqual('test');
    });
  });
})
