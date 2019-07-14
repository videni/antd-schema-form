import * as React from 'react';
import { Checkbox } from 'antd';
import { GetFieldDecoratorOptions, WrappedFormUtils } from 'antd/lib/form/Form';
import { Schema, BooleanSchema } from '../../types';

/* boolean类型组件 */
// 默认组件
function BooleanWidget(props: {
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

  return getFieldDecorator(id, option)(<Checkbox />);
}

export default BooleanWidget;