<template>
  <div
    :class="getClasses"
    class="relative border-b-2 my-8 focus-within:border-site-secondary-light">
    <input
      :type="type"
      name="text-input"
      v-model="inputValue"
      class="block w-full appearance-none bg-transparent focus:outline-none outline-none"
      placeholder=" "
      @change="inputValueChange($event)"
    />
    <label
      for="text-input"
      class="absolute top-0 -z-1 duration-300 origin-0 w-full text-gray-400 left-0"
    >
      {{ $props.label }}
    </label>
</div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

@Options({
  props: {
    label: '',
    value: '',
    width: '',
    type: {default: (): string => {return 'text'}},
  }
})
export default class TextInput extends Vue {
  name = 'text-input';
  label = '';
  value = '';
  width = '';
  inputValue ='';
  placeholder = '';
  type = 'text';

  created() {
    this.inputValue = this.value;
  }

  inputValueChange(event: KeyboardEvent) {
    const valuetoEmit: number| string = this.type === 'text' ? this.inputValue : parseInt(this.inputValue);
    this.$emit('onChange', valuetoEmit);
  }

  get getClasses(): string {
    return this.width;
  }

}
</script>
