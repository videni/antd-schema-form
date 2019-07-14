import * as React from 'react';
import { Switch } from 'antd';
import { GetFieldDecoratorOptions, WrappedFormUtils } from 'antd/lib/form/Form';
import { Schema, BooleanSchema } from '../../types';

// switch组件
function SwitchWidget(props: {
  schema: BooleanSchema;
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
  const { id }: BooleanSchema = schema;

  return getFieldDecorator(id, option)(<Switch />);
}

export default SwitchWidget;