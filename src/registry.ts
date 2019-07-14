import React from 'react';

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
  multipleOrTags
} from './components/widget/widget';

export interface Registry {
  widgets: {
    [key: string]: any;
  };
  fields: {
    [key: string]: React.ReactElement;
  }
}

const registry: Registry = {
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
    tags: multipleOrTags
  },
  fields: require('./components/fields').default
};

export default registry;