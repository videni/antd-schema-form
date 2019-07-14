import * as React from 'react';
import { useContext, PropsWithChildren } from 'react';
import * as PropTypes from 'prop-types';
import { Form, Tooltip } from 'antd';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import FormContext from '../../../context';
import { ContextProps, BooleanSchema } from '../../../types';
import styleName from '../../../utils/styleName';
import createElement from '../../../utils/createElement';
import { getWidget } from '../../../utils/widgetMap';

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
  const context: ContextProps | {} = useContext(FormContext);

  if (!('form' in context)) return null; // 类型判断

  const { form, registry }: ContextProps = context;
  const { schema, required }: BooleanFieldProps = props;
  const { title,
    description,
    $widget = 'boolean',
    $defaultValue,
    $hidden }: BooleanSchema = schema;
  const option: GetFieldDecoratorOptions = {
    valuePropName: 'checked'
  };

  // 表单默认值
  if ($defaultValue) option.initialValue = $defaultValue;

  const Widget: React.ReactElement = getWidget($widget, registry.widgets);

  return (
    <Form.Item className={ $hidden ? styleName('hidden') : undefined } label={ title }>
      <Tooltip title={ description } placement="topRight">
        <Widget schema={schema}
          option={option}
          form={form}
          required={required}
        />
      </Tooltip>
    </Form.Item>
  );
}

BooleanField.propTypes = {
  schema: PropTypes.object
};

export default BooleanField;