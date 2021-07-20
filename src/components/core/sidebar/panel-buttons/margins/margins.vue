<template>
  <section>
    <numeric-input-dropdown
      :thisIconButton="marginLeftButton"
      @onChange="onItemChange($event, 'margin')"
    >
    </numeric-input-dropdown>
    <numeric-input-dropdown
      :thisIconButton="marginRightButton"
      @onChange="onItemChange($event, 'margin')"
    >
    </numeric-input-dropdown>
    <numeric-input-dropdown
      :thisIconButton="marginTopButton"
      @onChange="onItemChange($event, 'margin')"
    >
    </numeric-input-dropdown>
    <numeric-input-dropdown
      :thisIconButton="marginBottomButton"
      @onChange="onItemChange($event, 'margin')"
    >
    </numeric-input-dropdown>
  </section>
</template>

<script lang="ts">
import { Style } from '@/classes/base/style/style';
import { ButtonIconNumeric } from '@/classes/buttons/sidebar-panel/button-types/button-icon-numeric/button-icon-numeric';
import { ButtonFactory } from '@/classes/buttons/sidebar-panel/factory';
import { ImpactedAttributeTypes } from '@/classes/sidebar/button-event-manager/button-event-manager';
import { StyleTags } from '@/common/types/css-element-styles/css-element-styles';
import NumericInputDropdown from '@/components/base/icon-buttons/numeric-input-dropdown/numeric-input-dropdown.vue';
import { Vue, Options } from 'vue-class-component';
import { useStore } from '@/store';

@Options({
  components: {
    'numeric-input-dropdown': NumericInputDropdown,
  },
})
export default class Margins extends Vue {
  name = 'margins';
  store = useStore();
  marginLeftButton: ButtonIconNumeric = new ButtonFactory().createButton(
    'numeric',
    'margin-left'
  ) as ButtonIconNumeric;
  marginRightButton: ButtonIconNumeric = new ButtonFactory().createButton(
    'numeric',
    'margin-right'
  ) as ButtonIconNumeric;
  marginTopButton: ButtonIconNumeric = new ButtonFactory().createButton(
    'numeric',
    'margin-top'
  ) as ButtonIconNumeric;
  marginBottomButton: ButtonIconNumeric = new ButtonFactory().createButton(
    'numeric',
    'margin-bottom'
  ) as ButtonIconNumeric;

  onItemChange(style: Style, itemType: ImpactedAttributeTypes) {
    const styleName = style.style as StyleTags;
    const margin: Style = {
      style: styleName,
      value: style.value,
      unit: style.unit,
    };
    this.store.getters.editedComponent?.addStyle(margin);
  }
}
</script>
