import * as React from 'react';
import { Fragment, useState, useEffect, useContext, PropsWithChildren, Dispatch, SetStateAction } from 'react';
import * as PropTypes from 'prop-types';
import isNumber from 'lodash-es/isNumber';
import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import FormContext from '../../context';
import { Schema, ContextValue } from '../../types';
import SchemaField from './SchemaField';

interface OneOfProps {
  schema: Schema;
  $widget?: string;
}

function OneOfField(props: PropsWithChildren<OneOfProps>): React.ReactElement | null {
  const context: ContextValue | {} = useContext(FormContext);

  if (!('form' in context)) return null; // 类型判断

  const { form }: ContextValue = context;

  const { $widget, schema }: OneOfProps = props;
  const { id, oneOf, $oneOfDisabled, $oneOfIndex }: Schema = schema;

  // oneOf选项卡的index
  const [index, setIndex]: [number, Dispatch<SetStateAction<number>>]
    = useState(($oneOfIndex !== undefined && isNumber($oneOfIndex)) ? $oneOfIndex : 0);

  /**
   * 这个情况是type="string"时，下一个控件是date，因为moment的关系，所以要清空组件的值，最好尽量避免这种情况
   * This case is type="string", the next control is date, because of the relationship of the moment,
   * so to clear the value of the component, it is best to avoid this situation
   */
  function resetFieldsForDateWidget(newIndex: number, oldIndex: number): void {
    if (
      oneOf
      && oneOf[newIndex].type === 'string' && oneOf[oldIndex].type === 'string'    // 新旧组件都为string
      && ((oneOf[oldIndex].$widget !== 'date' && oneOf[newIndex].$widget === 'date') // 判断是否为date组件
      || (oneOf[oldIndex].$widget === 'date' && oneOf[newIndex].$widget !== 'date'))
    ) {
      form.resetFields([id]);
    }
  }

  // 切换的callback
  function switchCallback(newIndex: number, oldIndex: number): void {
    resetFieldsForDateWidget(newIndex, oldIndex);

    setIndex(newIndex);
  }

  // 切换指定index
  function onOptionChange(event: RadioChangeEvent): void {
    const value: unknown = event.target.value;

    if (typeof value === 'number') {
      switchCallback(value, index);
    }
  }

  useEffect(function(): void {
    setIndex(($oneOfIndex !== undefined && isNumber($oneOfIndex)) ? $oneOfIndex : 0);
  }, [schema]);

  // 渲染radio
  function radioGroupView(): React.ReactNode {
    const options: { label: string; value: number }[] = [];
    const of: Array<Schema> = oneOf || [];

    for (let i: number = 0, j: number = of.length; i < j; i++) {
      const item: Schema = of[i];

      options.push({ label: item.title, value: i });
    }

    return (
      <Radio.Group key="radio-group"
        size="small"
        options={ options }
        value={ index }
        onChange={ $oneOfDisabled ? undefined : onOptionChange }
      />
    );
  }

  const optionSchema: Schema = oneOf[index];

  return (
    <Fragment>
      { radioGroupView() }
      {optionSchema && (
        <SchemaField schema={ optionSchema } />
      )}
    </Fragment>
  );
}

OneOfField.propTypes = {
  schema: PropTypes.object,
  widget: PropTypes.arrayOf(PropTypes.node)
};

export default OneOfField;