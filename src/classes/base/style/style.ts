export type StyleTags =
  | 'color'
  | 'background-color'
  | 'font-family'
  | 'font-size'
  | 'font-weight'
  | 'font-style'
  | 'text-decoration'
  | 'border-width'
  | 'border-radius'
  | 'border-left'
  | 'border-right'
  | 'border-top'
  | 'border-bottom'
  | 'height'
  | 'width'
  | 'margin-left'
  | 'margin-right'
  | 'margin-top'
  | 'margin-bottom'
  | 'background-image'
  | 'background-position'
  | 'background-position-x'
  | 'background-position-y'
  | 'background-size'
  | 'background-repeat'
  | 'padding'
  | 'transparency'
  | '';


export type Style =  {
  style: StyleTags;
  value: string;
};
