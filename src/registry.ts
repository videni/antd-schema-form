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
} from './components/widget/widget';

const registry: object = {
  widgets: {
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
  },
  fields: require('./components/fields').default,
};

export default registry;