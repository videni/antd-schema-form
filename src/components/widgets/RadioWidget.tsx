import * as React from 'react';
import { Radio } from 'antd';
import { GetFieldDecoratorOptions, WrappedFormUtils } from 'antd/lib/form/Form';
import { Schema, StringSchema, NumberSchema } from '../../types';

// radio（string类型和number类型都能用）
function RadioWidget(props: {
  schema: StringSchema | NumberSchema;
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
  const { id, $options = [] }: StringSchema | NumberSchema = schema;

  return getFieldDecorator(id, option)(<Radio.Group options={ $options } />);
}

export default RadioWidget;