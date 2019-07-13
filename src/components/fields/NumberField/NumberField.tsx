import * as React from 'react';
import { useContext, PropsWithChildren } from 'react';
import * as PropTypes from 'prop-types';
import { Form, Tooltip } from 'antd';
import { ValidationRule } from 'antd/lib/form';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import FormContext from '../../../context';
import styleName from '../../../utils/styleName';
import createNumberRules from './createNumberRules';
import { NumberSchema, ContextValue } from '../../../types';
import createElement from '../../../utils/createElement';

/**
 * 当类型为number和integer时的组件渲染
 * json schema的属性包括：id, type, title, description, minimum, maximum, enum
 *
 * 扩展属性前必须加上"$"
 * 扩展属性包括：required, componentType, readOnly, enumMessage, requiredMessage, minimumMessage、
 *   maximumMessage, options, defaultValue
 */
interface NumberFieldProps {
  schema: NumberSchema;
  required: boolean;
}

function NumberField(props: PropsWithChildren<NumberFieldProps>): React.ReactElement | null {
  const context: ContextValue | {} = useContext(FormContext);

  if (!('form' in context)) return null; // 类型判断

  const { form, registry, languagePack }: ContextValue = context;
  const { schema, required }: NumberFieldProps = props; // type=object时，会判断key是否存在于required数组中
  const {
    type,
    title,
    description,
    $widget,
    $defaultValue,
    $hidden
  }: NumberSchema = schema;
  const rules: Array<ValidationRule> = createNumberRules(languagePack, schema, required, type === 'integer');
  const option: GetFieldDecoratorOptions = { rules };

  // 表单默认值
  if ($defaultValue) option.initialValue = $defaultValue;

  let widget: React.ReactNode = null;

  if (registry) {
    widget = ($widget && $widget in registry.widgets)
      ? registry.widgets[$widget](schema, option, form, required)
      : createElement(registry.widgets.defaultNumber, [schema, option, form, required]);
  }

  return (
    <Form.Item className={ $hidden ? styleName('hidden') : undefined } label={ title }>
      <Tooltip title={ description } placement="topRight">
        { widget }
      </Tooltip>
    </Form.Item>
  );
}

NumberField.propTypes = {
  schema: PropTypes.object,
  required: PropTypes.bool
};

export default NumberField;