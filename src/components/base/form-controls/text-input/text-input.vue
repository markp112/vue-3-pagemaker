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
      @change="inputValueChange()"
    />
    <label
      for="text-input"
      class="absolute top-0 left-0 -z-1 duration-300 origin-0 w-auto text-gray-400 mr-auto"
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
    initialValue: '',
    width: '',
    type: {default: (): string => {return 'text'}},
  }
})
export default class TextInput extends Vue {
  name = 'text-input';
  label = '';
  initialValue: number | string = '';
  width = '';
  inputValue: number | string = '';
  placeholder = '';
  type = 'text';
  prevValue:  number | string = '';

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

  inputValueChange() {
    const valuetoEmit: number | string = this.type === 'text' ? this.inputValue : (this.inputValue as number);
    this.$emit('onChange', valuetoEmit);
  }

  get getClasses(): string {
    return this.width;
  }

}
</script>
<style scoped>
.form__group {
	 position: relative;
	 padding: 15px 0 0;
	 margin-top: 10px;
	 width: 50%;
}
 .form__field {
	 font-family: inherit;
	 width: 100%;
	 border: 0;
	 border-bottom: 2px solid #9b9b9b;
	 outline: 0;
	 font-size: 1.3rem;
	 color: #fff;
	 padding: 7px 0;
	 background: transparent;
	 transition: border-color 0.2s;
}
 .form__field::placeholder {
	 color: transparent;
}
 .form__field:placeholder-shown ~ .form__label {
	 font-size: 1.3rem;
	 cursor: text;
	 top: 20px;
}
 .form__label {
	 position: absolute;
	 top: 0;
	 display: block;
	 transition: 0.2s;
	 font-size: 1rem;
	 color: #9b9b9b;
}
 .form__field:focus {
	 padding-bottom: 6px;
	 font-weight: 700;
	 border-width: 3px;
	 border-image: linear-gradient(to right, #11998e, #38ef7d);
	 border-image-slice: 1;
}
 .form__field:focus ~ .form__label {
	 position: absolute;
	 top: 0;
	 display: block;
	 transition: 0.2s;
	 font-size: 1rem;
	 color: #11998e;
	 font-weight: 700;
}
/* reset input */
 .form__field:required, .form__field:invalid {
	 box-shadow: none;
}
</style>
