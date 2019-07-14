import * as React from 'react';
import { GetFieldDecoratorOptions, WrappedFormUtils } from 'antd/lib/form/Form';
import omit from 'lodash-es/omit';
import TableComponent from '../fields/ArrayField/TableComponent';
import { Schema, ArraySchema } from '../../types';

/* Array类型组件 */
// 默认组件
function ArrayWidget(props: {
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

  // @ts-ignore
  const { getFieldProps }: WrappedFormUtils = form;
  const { id }: ArraySchema = schema;
  const extraProps: any = omit(getFieldProps(id, option), ['ref']);

  return <TableComponent schema={ schema } { ...extraProps } />;
}

export default ArrayWidget;