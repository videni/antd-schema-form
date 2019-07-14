import * as React from 'react';
import { Input } from 'antd';
import { GetFieldDecoratorOptions, WrappedFormUtils } from 'antd/lib/form/Form';
import { Schema, StringSchema } from '../../types';

// 文本域
function TextAreaWidget(props: {
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

  return getFieldDecorator(id, option)(
    <Input.TextArea rows={ 6 } readOnly={ $readOnly } placeholder={ $placeholder } />
  );
}

export default TextAreaWidget;