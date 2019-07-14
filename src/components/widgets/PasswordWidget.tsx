import * as React from 'react';
import { Input } from 'antd';
import { GetFieldDecoratorOptions, WrappedFormUtils } from 'antd/lib/form/Form';
import { Schema, StringSchema } from '../../types';

// password
export function PasswordWidget(props: {
  schema: StringSchema;
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
  const { id, $readOnly, $placeholder }: StringSchema = schema;

  return getFieldDecorator(id, option)(<Input.Password readOnly={ $readOnly } placeholder={ $placeholder } />);
}

export default PasswordWidget;