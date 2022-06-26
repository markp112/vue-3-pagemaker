<template>
  <div class="flex justify-center items-center flex-row h-auto mt-32 mx-4 ">
    <div class="flex flex-row justify-center w-full h-full">
      <slot name="image-content"> </slot>
      <div class="border-2 rounded-md p-5 text-left w-2/6 h-100 flex flex-col justify-start"      >
        <slot name="text-content"> </slot>
      </div>
    </div>
  </div>
</template>

<script>
import {Options, Vue} from "vue-class-component";

@Options()
export default class HorizontalImageText extends Vue {
  name = "HorizontalImageText";
}
</script>
