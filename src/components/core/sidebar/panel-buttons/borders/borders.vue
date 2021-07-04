<template>
  <section>
    <div class="sidebar-button-panel text-accent-600">
      <icon-select
        :buttonIconClassList="borderDirectionButton"
        @selectChange="onItemChange($event, 'border')"
      >
      </icon-select>
      <icon-select
        :buttonIconClassList="borderStyleButton"
        @selectChange="onItemChange($event, 'border')"
      ></icon-select>
      <icon-select
        :buttonIconClassList="shadowButton"
        @selectChange="onItemChange($event, 'shadow')"
      ></icon-select>
      <plus-minus-icon
        :thisIconButton="buttonIconDimension"
        @onChange="onItemChange($event, 'border')"
      >
      </plus-minus-icon>
      <numeric-input-dropdown
        :thisIconButton="borderRadiusButton"
        @onChange="onItemChange($event, 'border')"
      >
      </numeric-input-dropdown>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Border } from '@/classes/sidebar/border-attributes/border-attributes';
import { ImpactedAttributeTypes, SidebarButtonEventManager } from '@/classes/sidebar/button-event-manager/button-event-manager';
import { Style } from '@/classes/base/style/style';
import { ButtonIconDimension } from '@classes/buttons/sidebar-panel/button-types/button-icon-dimensions/button-icon-dimension';
import { ButtonIconClassList } from '@classes/buttons/sidebar-panel/button-types/button-icon-class-list/button-icon-class-list';
import { ButtonIconNumeric } from '@classes/buttons/sidebar-panel/button-types/button-icon-numeric/button-icon-numeric';
import { shadowIconList, lineStyleIconList, borderEdgeIconList } from '@/components/core/sidebar/panel-buttons/data';
import PlusMinusIcon from '@/components/base/icon-buttons/plus-minus-icon/plus-minus-icon.vue';
import DropDown from '@/components/pickers/drop-down/drop-down.vue';
import NumericInputDropdown from '@/components/base/icon-buttons/numeric-input-dropdown/numeric-input-dropdown.vue';
import IconSelect from '@/components/pickers/icon-select/icon-select.vue';
import { ButtonFactory } from '@/classes/buttons/sidebar-panel/factory';

@Options({
  components: {
    "icon-select": IconSelect,
    "drop-down": DropDown,
    "plus-minus-icon": PlusMinusIcon,
    "numeric-input-dropdown": NumericInputDropdown
  }
})
export default class BorderButtons extends Vue {
  name = "border-buttons";
  shadowIconList = shadowIconList;
  lineStyleIconList = lineStyleIconList;
  borderEdgeIconList = borderEdgeIconList;
  borderRadius = 0;
  borderDefinition: Border = Border.getInstance();
  borderUnits = ["em", "px", "%"];
  buttonIconDimension: ButtonIconDimension = new ButtonFactory().createButton(
    "dimension",
    "border-thickness"
  ) as ButtonIconDimension;
  shadowButton: ButtonIconClassList = new ButtonFactory().createButton(
    "class-list",
    "Shadow"
  ) as ButtonIconClassList;
  borderDirectionButton: ButtonIconClassList = new ButtonFactory().createButton(
    "class-list",
    "border-direction"
  ) as ButtonIconClassList;
  borderStyleButton: ButtonIconClassList = new ButtonFactory().createButton(
    "class-list",
    "border-styles"
  ) as ButtonIconClassList;
  borderRadiusButton: ButtonIconNumeric = new ButtonFactory().createButton(
    "numeric",
    "border-radius"
  ) as ButtonIconNumeric;

  onItemChange(style: Style, itemType: ImpactedAttributeTypes) {
    const eventManager = SidebarButtonEventManager.getInstance();
    eventManager.applyValue(itemType, style);
    eventManager.updateEditedComponent();
  }
}
</script>
