import * as React from 'react';
import { InputNumber } from 'antd';
import { GetFieldDecoratorOptions, WrappedFormUtils } from 'antd/lib/form/Form';
import styleName from '../../utils/styleName';
import { Schema, NumberSchema } from '../../types';

/* number类型组件 */
// 默认组件
function NumberWidget(props: {
  schema: NumberSchema;
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
  const { id, $readOnly, $placeholder }: NumberSchema = schema;

  return getFieldDecorator(id, option)(
    <InputNumber className={ styleName('number-input') } readOnly={ $readOnly } placeholder={ $placeholder } />
  );
}

export default NumberWidget;