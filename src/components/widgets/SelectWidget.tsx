import * as React from 'react';
import { Select } from 'antd';
import { GetFieldDecoratorOptions, WrappedFormUtils } from 'antd/lib/form/Form';
import selectOptionsRender from '../../utils/selectOptionsRender';
import styleName from '../../utils/styleName';
import { Schema, StringSchema } from '../../types';

// select
function SelectWidget(props: {
  schema: StringSchema;
  option: GetFieldDecoratorOptions;
  form: WrappedFormUtils;
  required: boolean;
}): React.ReactNode {
  const {
    schema,
    form,
    option,
    required
  } = props;

  const { getFieldDecorator }: WrappedFormUtils = form;
  const { id, $required, $options = [], $placeholder }: StringSchema = schema;

  return getFieldDecorator(id, option)(
    <Select className={ styleName('string-select') }
      placeholder={ $placeholder }
      allowClear={ !($required || required) }
    >
      { selectOptionsRender($options) }
    </Select>
  );
}

export default SelectWidget;