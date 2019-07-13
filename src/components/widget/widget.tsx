import * as React from 'react';
import { Input, Select, Radio, DatePicker, InputNumber, Checkbox, Switch } from 'antd';
import { GetFieldDecoratorOptions, WrappedFormUtils } from 'antd/lib/form/Form';
import omit from 'lodash-es/omit';
import selectOptionsRender from '../../utils/selectOptionsRender';
import styleName from '../../utils/styleName';
import TableComponent from '../fields/ArrayField/TableComponent';
import OneOfField from '../fields/OneOfField';
import { Schema, StringSchema, NumberSchema, BooleanSchema, ArratSchema } from '../../types';

/* string类型组件 */
// 默认组件
export function defaultString(
  schema: StringSchema,
  option: GetFieldDecoratorOptions,
  form: WrappedFormUtils,
  required: boolean
): React.ReactNode {
  const { getFieldDecorator }: WrappedFormUtils = form;
  const { id, $readOnly, $placeholder }: StringSchema = schema;

  return getFieldDecorator(id, option)(<Input readOnly={ $readOnly } placeholder={ $placeholder } />);
}

// 文本域
export function textArea(
  schema: StringSchema,
  option: GetFieldDecoratorOptions,
  form: WrappedFormUtils,
  required: boolean
): React.ReactNode {
  const { getFieldDecorator }: WrappedFormUtils = form;
  const { id, $readOnly, $placeholder }: StringSchema = schema;

  return getFieldDecorator(id, option)(
    <Input.TextArea rows={ 6 } readOnly={ $readOnly } placeholder={ $placeholder } />
  );
}

// select
export function select(
  schema: StringSchema,
  option: GetFieldDecoratorOptions,
  form: WrappedFormUtils,
  required: boolean
): React.ReactNode {
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

// radio（string类型和number类型都能用）
export function radio(
  schema: StringSchema,
  option: GetFieldDecoratorOptions,
  form: WrappedFormUtils,
  required: boolean
): React.ReactNode {
  const { getFieldDecorator }: WrappedFormUtils = form;
  const { id, $options = [] }: StringSchema | NumberSchema = schema;

  return getFieldDecorator(id, option)(<Radio.Group options={ $options } />);
}

// date
export function date(
  schema: StringSchema,
  option: GetFieldDecoratorOptions,
  form: WrappedFormUtils,
  required: boolean
): React.ReactNode {
  const { getFieldDecorator }: WrappedFormUtils = form;
  const { id, $placeholder }: StringSchema = schema;

  return getFieldDecorator(id, option)(
    <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime={ true } placeholder={ $placeholder } />
  );
}

// password
export function password(
  schema: StringSchema,
  option: GetFieldDecoratorOptions,
  form: WrappedFormUtils,
  required: boolean
): React.ReactNode {
  const { getFieldDecorator }: WrappedFormUtils = form;
  const { id, $readOnly, $placeholder }: StringSchema = schema;

  return getFieldDecorator(id, option)(<Input.Password readOnly={ $readOnly } placeholder={ $placeholder } />);
}

/* number类型组件 */
// 默认组件
export function defaultNumber(
  schema: NumberSchema,
  option: GetFieldDecoratorOptions,
  form: WrappedFormUtils,
  required: boolean
): React.ReactNode {
  const { getFieldDecorator }: WrappedFormUtils = form;
  const { id, $readOnly, $placeholder }: NumberSchema = schema;

  return getFieldDecorator(id, option)(
    <InputNumber className={ styleName('number-input') } readOnly={ $readOnly } placeholder={ $placeholder } />
  );
}

/* boolean类型组件 */
// 默认组件
export function defaultBoolean(
  schema: BooleanSchema,
  option: GetFieldDecoratorOptions,
  form: WrappedFormUtils,
  required: boolean
): React.ReactNode {
  const { getFieldDecorator }: WrappedFormUtils = form;
  const { id }: BooleanSchema = schema;

  return getFieldDecorator(id, option)(<Checkbox />);
}

// switch组件
export function switchComponent(
  schema: BooleanSchema,
  option: GetFieldDecoratorOptions,
  form: WrappedFormUtils,
  required: boolean
): React.ReactNode {
  const { getFieldDecorator }: WrappedFormUtils = form;
  const { id }: BooleanSchema = schema;

  return getFieldDecorator(id, option)(<Switch />);
}

/* Array类型组件 */
// 默认组件
export function defaultArray(
  schema: ArratSchema,
  option: GetFieldDecoratorOptions,
  form: WrappedFormUtils,
  required: boolean
): React.ReactNode {
  // @ts-ignore
  const { getFieldProps }: WrappedFormUtils = form;
  const { id }: ArratSchema = schema;
  const props: any = omit(getFieldProps(id, option), ['ref']);

  return <TableComponent schema={ schema } { ...props } />;
}

// checkbox group
export function checkboxGroup(
  schema: ArratSchema,
  option: GetFieldDecoratorOptions,
  form: WrappedFormUtils,
  required: boolean
): React.ReactNode {
  const { getFieldDecorator }: WrappedFormUtils = form;
  const { id, $options = [] }: ArratSchema = schema;

  return getFieldDecorator(id, option)(<Checkbox.Group options={ $options } />);
}

// multiple and tags
export function multipleOrTags(
  schema: ArratSchema,
  option: GetFieldDecoratorOptions,
  form: WrappedFormUtils,
  required: boolean
): React.ReactNode {
  const { getFieldDecorator }: WrappedFormUtils = form;
  const { id, $options = [], $widget }: ArratSchema = schema;

  return getFieldDecorator(id, option)(
    <Select className={ styleName('array-multiple') } mode={ $widget }>
      { selectOptionsRender($options) }
    </Select>
  );
}