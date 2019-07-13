import {
  defaultString,
  textArea,
  select,
  radio,
  date,
  password,
  defaultNumber,
  defaultBoolean,
  switchComponent,
  defaultArray,
  checkboxGroup,
  multipleOrTags,
  defaultOneOf
} from './components/widget/widget';

const registry: object = {
  defaultString,
  textArea,
  select,
  radio,
  date,
  password,
  defaultNumber,
  defaultBoolean,
  switch: switchComponent,
  defaultArray,
  checkboxGroup,
  multiple: multipleOrTags,
  tags: multipleOrTags,
  defaultOneOf
};

export default registry;