
import * as React from 'react';
import { Select } from 'antd';
import { GetFieldDecoratorOptions, WrappedFormUtils } from 'antd/lib/form/Form';
import selectOptionsRender from '../../utils/selectOptionsRender';
import styleName from '../../utils/styleName';
import { Schema, ArraySchema } from '../../types';

// multiple and tags
function MultipleSelect(props: {
  schema: ArraySchema;
  option: GetFieldDecoratorOptions;
  form: WrappedFormUtils;
  required: boolean;
}): React.ReactNode {
  const {
    schema,
    form,
    option,
  } = props;

  const { getFieldDecorator }: WrappedFormUtils = form;
  const { id, $options = [], $widget }: ArraySchema = schema;

  return getFieldDecorator(id, option)(
    <Select className={ styleName('array-multiple') } mode={ $widget }>
      { selectOptionsRender($options) }
    </Select>
  );
}

export default MultipleSelect;