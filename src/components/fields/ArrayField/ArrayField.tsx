import * as React from 'react';
import { useContext, PropsWithChildren } from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form, Tooltip } from 'antd';
import { GetFieldDecoratorOptions, ValidationRule } from 'antd/lib/form/Form';
import FormContext from '../../../context';
import styleName from '../../../utils/styleName';
import createArrayRules from './createArrayRules';
import createElement from '../../../utils/createElement';
import { ArratSchema, ContextValue } from '../../../types';

/**
 * 当类型为array时的组件渲染
 * json schema的属性包括：id, type, title, description, items, minItems, maxItems
 *
 * 扩展属性前必须加上"$"
 * 扩展属性包括：componentType, options, addDataInReverseOrder
 */
interface ArrayFieldProps {
  schema: ArratSchema;
  required: boolean;
}

function ArrayField(props: PropsWithChildren<ArrayFieldProps>): React.ReactElement | null {
  const context: ContextValue | {} = useContext(FormContext);

  if (!('form' in context)) return null; // 类型判断

  const { form, registry, languagePack }: ContextValue = context;
  const { schema, required }: ArrayFieldProps = props;
  const { title, description, $widget, $defaultValue, $hidden }: ArratSchema = schema;
  const rules: Array<ValidationRule> = createArrayRules(languagePack, schema, required);
  const option: GetFieldDecoratorOptions = { rules };
  let isTableComponent: boolean = false; // 判断是否为table组件

  // 表单默认值
  if ($defaultValue) option.initialValue = $defaultValue;

  let widget: React.ReactNode = null;

  if (registry) {
    // TODO: 此处渲染的是CheckBox.Group，但是组件名称是"checkbox"
    const cType: string | undefined = $widget === 'checkbox' ? 'checkboxGroup' : $widget;

    if (cType && cType in registry.widgets) {
      widget = registry.widgets[cType](schema, option, form, required);
    } else {
      widget = createElement(registry.widgets.defaultArray, [schema, option, form, required]);
      isTableComponent = true;
    }
  }

  const classname: string = classNames({
    [styleName('array-table-form-item')]: isTableComponent,
    [styleName('hidden')]: $hidden
  });

  return (
    <Form.Item className={ classname } label={ title }>
      <Tooltip title={ description } placement="topRight">
        { widget }
      </Tooltip>
    </Form.Item>
  );
}

ArrayField.propTypes = {
  schema: PropTypes.object,
  required: PropTypes.bool
};

export default ArrayField;