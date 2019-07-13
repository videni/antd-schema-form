import * as React from 'react';
import { useContext, PropsWithChildren } from 'react';
import * as PropTypes from 'prop-types';
import { isString } from 'lodash-es';
import { Form, Tooltip } from 'antd';
import { ValidationRule } from 'antd/lib/form';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import * as moment from 'moment';
import FormContext from '../../../context';
import styleName from '../../../utils/styleName';
import createStringRules from './createStringRules';
import createElement from '../../../utils/createElement';
import { StringItem, ContextValue } from '../../../types';

/**
 * 当类型为string时的组件渲染
 * json schema的属性包括：id, type, title, description, pattern, minLength, maxLength, enum
 *
 * 扩展属性前必须加上"$"
 * 扩展属性包括：required, componentType, readOnly, length, patternOption, enumMessage, lengthMessage, requiredMessage,
 *   patternMessage, minLengthMessage, maxLengthMessage, options, defaultValue, placeholder
 */
interface StringFieldProps {
  root: StringItem;
  required: boolean;
}

function StringField(props: PropsWithChildren<StringFieldProps>): React.ReactElement | null {
  const context: ContextValue | {} = useContext(FormContext);

  if (!('form' in context)) return null; // 类型判断

  const { form, registry, languagePack }: ContextValue = context;
  const { root, required }: StringFieldProps = props; // type=object时，会判断key是否存在于required数组中
  const {
    title,
    description,
    $componentType,
    $defaultValue,
    $hidden
  }: StringItem = root;
  const rules: Array<ValidationRule> = createStringRules(languagePack, root, required);
  const option: GetFieldDecoratorOptions = { rules };

  // 表单默认值
  if ($defaultValue) option.initialValue = $defaultValue;

  // 格式化日历的日期
  if ($componentType === 'date' && isString($defaultValue)) {
    option.initialValue = moment($defaultValue);
  }

  let element: React.ReactNode = null;

  if (registry) {
    element = ($componentType && $componentType in registry)
      ? registry[$componentType](root, option, form, required)
      : createElement(registry.defaultString, [root, option, form, required]);
  }

  return (
    <Form.Item className={ $hidden ? styleName('hidden') : undefined } label={ title }>
      <Tooltip title={ description } placement="topRight">
        { element }
      </Tooltip>
    </Form.Item>
  );
}

StringField.propTypes = {
  root: PropTypes.object,
  required: PropTypes.bool
};

export default StringField;