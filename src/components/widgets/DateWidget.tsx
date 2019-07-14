import * as React from 'react';
import { DatePicker } from 'antd';
import { GetFieldDecoratorOptions, WrappedFormUtils } from 'antd/lib/form/Form';
import { Schema, StringSchema } from '../../types';

// date
function DateWidget(props: {
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
  const { id, $placeholder }: StringSchema = schema;

  return getFieldDecorator(id, option)(
    <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime={ true } placeholder={ $placeholder } />
  );
}

export default DateWidget;