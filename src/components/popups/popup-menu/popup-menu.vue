<template>
  <div
    class="flex flex-col border-siteLight shadow-lg border w-24 h-auto absolute top bg-white"
    :class="getPosition()"
  >
    <div class="h-8 border-gray-200 border-b-2 flex flex-row justify-end">
      <close-button @onClick="closeClick()"/>
    </div>
    <ul class="p-1 text-sm">
      <li
        v-for="menuItem in $props.menuItems"
        :key="menuItem"
        class="hover:cursor-pointer hover:bg-sitePrimary hover:text-onPrimary px-2"
        @click="menuItemClick($event, menuItem)"
      >
        {{ menuItem }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import CloseButton from '@/components/base/base-button/close-button/close-button.vue';
import { Vue,Options } from 'vue-class-component';

@Options({
    props: {
      menuItems: {
        default: (): string[] => {
        return [];
      }
    },
    top: { default: '0' },
    left: { default: '0' }
  },
  components: {
    'close-button': CloseButton,
  }
})
export default class PopupMenu extends Vue {
  name = 'popupmenu';
  menuItems!: string[];
  top!: string;
  left!: string;

  menuItemClick(event: MouseEvent, menuItem: string) {
    event.stopPropagation();
    this.$emit('menuItemClicked', menuItem);
  }

  closeClick() {
    this.$emit('closeClicked');
    return;
  }

  getPosition(): string {
    return `top-${this.top} left-${this.left}`;
  }

}
</script>
