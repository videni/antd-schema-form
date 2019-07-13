import * as React from 'react';
import { useContext, PropsWithChildren } from 'react';
import * as PropTypes from 'prop-types';
import { Form, Tooltip } from 'antd';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import FormContext from '../../../context';
import { ContextValue, BooleanSchema } from '../../../types';
import styleName from '../../../utils/styleName';
import createElement from '../../../utils/createElement';

/**
 * 当类型为boolean时的组件渲染
 * json schema的属性包括：id, type, title, description
 *
 * 扩展属性前必须加上"$"
 * 扩展属性包括：componentType
 */
interface BooleanFieldProps {
  schema: BooleanSchema;
  required: boolean;
}

function BooleanField(props: PropsWithChildren<BooleanFieldProps>): React.ReactElement | null {
  const context: ContextValue | {} = useContext(FormContext);

  if (!('form' in context)) return null; // 类型判断

  const { form, registry }: ContextValue = context;
  const { schema, required }: BooleanFieldProps = props;
  const { title, description, $widget, $defaultValue, $hidden }: BooleanSchema = schema;
  const option: GetFieldDecoratorOptions = {
    valuePropName: 'checked'
  };

  // 表单默认值
  if ($defaultValue) option.initialValue = $defaultValue;

  let widget: React.ReactNode = null;

  if (registry) {
    widget = ($widget && $widget in registry.widgets)
      ? registry.widgets[$widget](schema, option, form, required)
      : createElement(registry.widgets.defaultBoolean, [schema, option, form, required]);
  }

  return (
    <Form.Item className={ $hidden ? styleName('hidden') : undefined } label={ title }>
      <Tooltip title={ description } placement="topRight">
        { widget }
      </Tooltip>
    </Form.Item>
  );
}

BooleanField.propTypes = {
  schema: PropTypes.object
};

export default BooleanField;