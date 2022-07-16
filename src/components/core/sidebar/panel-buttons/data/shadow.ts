import { IconPickerInterface } from '../models/icon-picker';

export const shadowIconList: IconPickerInterface[] = [
  {
    icon: 'check_box-32.png',
    class: 'shadow-xs',
    tooltip: 'extra small shadow',
    domEquivalent: '0 0 0 1px rgba(0, 0, 0, 0.05)'
  },
  {
    icon: 'check_box-32.png',
    class: 'shadow-sm',
    tooltip: 'small shadow',
    domEquivalent: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
  },
  {
    icon: 'check_box-32.png',
    class: 'shadow-md',
    tooltip: 'medium shadow',
    domEquivalent:
      '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
  },
  {
    icon: 'check_box-32.png',
    class: 'shadow-lg',
    tooltip: 'large shadow',
    domEquivalent:
      '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
  },
  {
    icon: 'check_box-32.png',
    class: 'shadow-xl',
    tooltip: 'extra large shadow',
    domEquivalent:
      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
  },
  {
    icon: 'check_box-32.png',
    class: 'shadow-2xl',
    tooltip: '2XL shadow',
    domEquivalent:
      '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  },
  {
    icon: 'check_box-32.png',
    class: 'shadow-inner',
    tooltip: 'inner shadow',
    domEquivalent: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
  },
  {
    icon: 'check_box-32.png',
    class: 'shadow-outline',
    tooltip: 'outline shadow',
    domEquivalent: 'box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5)'
  },
  {
    icon: 'uncheck_box-32.png',
    class: 'shadow-none',
    tooltip: 'remove shadow',
    domEquivalent: 'none'
  }
];
