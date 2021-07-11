<template>
  <div
    class="relative border-b-2 my-8 focus-within:border-site-secondary-light"
  >

    <select
      name="select-control"
      v-model="inputValue"
      class="block w-full bg-transparent focus:outline-none outline-none p-1"
      :class="getClasses"
      placeholder=" "
      @change="selectedOptionChanged($event)"
    >
      <option
        v-for="item in $props.selectOptions"
        :key="item"
        :selected="item === $props.initialValue"
        >{{ item }}</option
      >
    </select>
    <label
      for="select-control"
      class="absolute top-0 left-0 -z-1 duration-300 origin-0 w-auto text-gray-400 mr-auto"
    >
      {{ label }}
    </label>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

@Options({
  props: {
    label: '',
    initialValue: '',
    width: '',
    selectOptions: {
      default:(): string[] => {
        return [];
      }
    }
  }
})
export default class SelectInput extends Vue {
  name = 'select-input';
  label = '';
  initialValue = '';
  width = '';
  inputValue ='';
  placeholder = '';
  prevValue = '';

    created() {
    this.inputValue = this.initialValue;
    this.prevValue = this.initialValue;
  }

  updated() {
    if (this.initialValue !== this.prevValue) {
      this.inputValue = this.initialValue;
      this.prevValue = this.initialValue;
    }
  }

  selectedOptionChanged(event: KeyboardEvent) {
    this.$emit('onChange', this.inputValue);
  }

  get getClasses(): string {
    return this.width;
  }
}
</script>
