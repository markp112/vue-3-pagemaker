<template>
  <div class="flex flex-row justify-start">
    <img src="@/assets/icons/align_left-32.png" 
          class=" cursor-pointer hover:bg-gray-800"
          @click="alignClick('left')"
    />
    <img src="@/assets/icons/align_center-text-32.png" 
        class=" cursor-pointer hover:bg-gray-800"
        @click="alignClick('center')"
    />
    <img src="@/assets/icons/align_right-32.png" 
        class=" cursor-pointer hover:bg-gray-800"
        @click="alignClick('right')"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

type TextAlignmentTypes = 'left' | 'center' | 'justify' | 'right';

@Options({})
export default class TextAlignment extends Vue {
  name = 'text-alignment';

  alignClick(align: TextAlignmentTypes) {
    const style = `text-${align}`;
    this.$emit('alignClick', style)
  }
}

</script>