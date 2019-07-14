import * as React from 'react';
import { Input } from 'antd';
import { GetFieldDecoratorOptions, WrappedFormUtils } from 'antd/lib/form/Form';
import { Schema, StringSchema } from '../../types';

function TextWidget(props: {
  schema: StringSchema;
  option: GetFieldDecoratorOptions;
  form: WrappedFormUtils;
  required: boolean;
}): React.ReactNode {

  const {
    schema,
    option,
    form,
    required,
  } = props;

  const { getFieldDecorator }: WrappedFormUtils = form;
  const { id, $readOnly, $placeholder }: StringSchema = schema;

  return getFieldDecorator(id, option)(<Input readOnly={ $readOnly } placeholder={ $placeholder } />);
}


export default TextWidget;