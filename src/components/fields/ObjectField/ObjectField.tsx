import * as React from 'react';
import { Fragment, useContext, PropsWithChildren } from 'react';
import * as PropTypes from 'prop-types';
import isArray from 'lodash-es/isArray';
import isPlainObject from 'lodash-es/isPlainObject';
import isNil from 'lodash-es/isNil';
import isBoolean from 'lodash-es/isBoolean';
import isString from 'lodash-es/isString';
import transform from 'lodash-es/transform';
import { Collapse, Button } from 'antd';
import FormContext from '../../../context';
import styleName from '../../../utils/styleName';
import StringField from '../StringField/StringField';
import NumberField from '../NumberField/NumberField';
import BooleanField from '../BooleanField/BooleanField';
import ArrayField from '../ArrayField/ArrayField';
import createElement from '../../../utils/createElement';
import { Schema, ContextProps } from '../../../types';
import SchemaField from '../SchemaField';
import { getWidget } from '../../../utils/widgetMap';

/**
 * 当类型为object时的组件渲染
 * json schema的属性包括：id, type, title, description, properties, required
 */
interface ObjectFieldProps {
  schema: Schema;
}

function ObjectField(props: PropsWithChildren<ObjectFieldProps>): React.ReactElement | null {
  const context: ContextProps | {} = useContext(FormContext);

  if (!('form' in context)) return null; // 类型判断

  const { form, registry, languagePack }: ContextProps = context;
  const {
    schema
  }: ObjectFieldProps = props;

  // 判断是否显示
  function dependenciesDisplay(id: string, key: string, keyDepMap: { [key: string]: string[] }): boolean {
    let isDependenciesDisplay: boolean = false;

    for (const item of keyDepMap[key]) {
      const value: any = form.getFieldValue(`${ id }/properties/${ item }`);

      if (!(isNil(value) || (isString(value) && value === ''))) {
        isDependenciesDisplay = true;
        break;
      }
    }

    return isDependenciesDisplay;
  }

  // 渲染一个object组件
  function objectFieldRender(schema: Schema): React.ReactNode {
    const { id,
      title,
      description,
      $widget = 'object'
    }: Schema = schema;

    const required: Array<string> = schema.required || [];
    const properties: object = schema.properties || {};
    const propertyFields: React.ReactNodeArray = [];
    let keyDepMap: { [key: string]: string[] } | undefined = undefined;

    // 获取dependencies的值
    if (('dependencies' in schema) && schema.dependencies && isPlainObject(schema.dependencies)) {
      keyDepMap = transform(schema.dependencies, function(result: string[], value: string[], key: string): void {
        for (const item of value) {
          (result[item] || (result[item] = [])).push(key);
        }
      }, {});
    }

    // 判断object下组件的类型并渲染，只要有一个有值就要显示
    for (const key in properties) {
      let isDependenciesDisplay: boolean | undefined = false;

      if (keyDepMap && (key in keyDepMap)) {
        isDependenciesDisplay = dependenciesDisplay(id, key, keyDepMap);
      } else {
        isDependenciesDisplay = undefined;
      }

      propertyFields.push(
        <SchemaField schema={ properties[key] }
          key={ key }
          required={ isDependenciesDisplay || required.includes(key) } // 当被依赖时，表单必须填写
          dependenciesDisplay={ isDependenciesDisplay }
        />
      );
    }

    // header
    const header: React.ReactNodeArray = [
      <b key="title">{ title || id }</b>,
      <span className={ styleName('object-description') } key="description">{ description }</span>
    ];

    const Widget: React.ReactElement = getWidget($widget, registry.widgets);

    console.log(Widget);
    return (
        <Widget id={ id }
          propertyFields={ propertyFields }
          header={ header }
        />
      );
  }

  return (
    <Fragment>
      { objectFieldRender(schema) }
    </Fragment>
  );
}

ObjectField.propTypes = {
  schema: PropTypes.object
};

export default ObjectField;