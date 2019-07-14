import * as React from 'react';
import { Checkbox} from 'antd';
import { GetFieldDecoratorOptions, WrappedFormUtils } from 'antd/lib/form/Form';
import { Schema, ArraySchema } from '../../types';

// checkbox group
function CheckboxGroupWidget(props: {
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
  const { id, $options = [] }: ArraySchema = schema;

  return getFieldDecorator(id, option)(<Checkbox.Group options={ $options } />);
}

export default CheckboxGroupWidget;