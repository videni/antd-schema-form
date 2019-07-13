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
import getValueFromObject from '../../../utils/getValueFromObject';
import getKeysFromObject from '../../../utils/getKeysFromObject';
import createElement from '../../../utils/createElement';
import { SchemaItem, ContextValue } from '../../../types';

/**
 * 当类型为object时的组件渲染
 * json schema的属性包括：id, type, title, description, properties, required
 */
interface ObjectFieldProps {
  schema: SchemaItem;
  onOk?: Function;
  onCancel?: Function;
  okText?: string | number;
  cancelText?: string | number;
  footer?: Function;
}

function ObjectField(props: PropsWithChildren<ObjectFieldProps>): React.ReactElement | null {
  const context: ContextValue | {} = useContext(FormContext);

  if (!('form' in context)) return null; // 类型判断

  const { form, registry, languagePack }: ContextValue = context;
  const {
    schema: formObjectRoot,
    onOk,
    onCancel,
    okText = languagePack.formObject.okText,
    cancelText = languagePack.formObject.cancelText,
    footer
  }: ObjectFieldProps = props;

  // 根据type渲染不同的组件
  function renderComponentByTypeView(schema: SchemaItem, required?: boolean, dependenciesDisplay?: boolean): React.ReactNode {
    const { id, type }: SchemaItem = schema;
    const _required: boolean = !!required;
    const props: {
      key: string;
      schema: any;
      required: boolean;
    } = { key: id, schema, required: _required };

    // 渲染oneOf
    if ('oneOf' in schema && schema.oneOf && isArray(schema.oneOf) && schema.oneOf.length > 0) {
      // eslint-disable-next-line no-use-before-define
      return renderOneOfComponentView(schema, _required);
    }

    // 判断是否渲染dependencies
    if (isBoolean(dependenciesDisplay) && !dependenciesDisplay) {
      return null;
    }

    switch (type) {
      case 'string':
        return <StringField { ...props } />;

      case 'integer':
      case 'number':
        return <NumberField { ...props } />;

      case 'boolean':
        return <BooleanField { ...props } />;

      case 'array':
        return <ArrayField { ...props } />;

      case 'object':
        // eslint-disable-next-line no-use-before-define
        return renderObjectComponentView(schema);

      default:
        return null;
    }
  }

  // oneOf组件
  function renderOneOfComponentView(schema: SchemaItem, required: boolean): React.ReactNode {
    const { oneOf, $oneOfComponentType }: SchemaItem = schema;
    const widget: React.ReactNodeArray = [];

    (oneOf || []).forEach((value: SchemaItem, index: number, array: Array<SchemaItem>): void => {
      const childrenRoot: SchemaItem = { ...value };

      for (const key in schema) {
        // children不继承oneOf相关的属性
        if (!(key in childrenRoot) && !['oneOf', '$oneOfDisabled', '$oneOfIndex', '$oneOfComponentType'].includes(key)) {
          childrenRoot[key] = schema[key];
        }
      }

      widget.push(renderComponentByTypeView(childrenRoot, required));
    });

    let oneOfElement: React.ReactNode = null;

    if (registry) {
      oneOfElement = $oneOfComponentType && $oneOfComponentType in registry
        ? registry[$oneOfComponentType](schema, form, widget)
        : createElement(registry.defaultOneOf, [schema, form, widget]);
    }

    return oneOfElement;
  }

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
  function renderObjectComponentView(schema: SchemaItem): React.ReactNode {
    const { id, title, description, $widget }: SchemaItem = schema;
    const required: Array<string> = schema.required || [];
    const properties: object = schema.properties || {};
    const widget: React.ReactNodeArray = [];
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

      widget.push(renderComponentByTypeView(
        properties[key],
        isDependenciesDisplay || required.includes(key), // 当被依赖时，表单必须填写
        isDependenciesDisplay
      ));
    }

    // header
    const header: React.ReactNodeArray = [
      <b key="title">{ title || id }</b>,
      <span className={ styleName('object-description') } key="description">{ description }</span>
    ];

    return (registry && $widget && $widget in registry)
      ? registry[$widget](schema, form, widget)
      : (
        <Collapse key={ id } className={ styleName('object-collapse') } defaultActiveKey={ [id] }>
          <Collapse.Panel key={ id } header={ header }>
            { widget }
          </Collapse.Panel>
        </Collapse>
      );
  }

  // ok事件
  function handleOkClick(event: React.MouseEvent<HTMLElement, MouseEvent>): void {
    const keys: string[] = getKeysFromObject(formObjectRoot);

    form.validateFieldsAndScroll(keys, (err: any, value: object): void => {
      if (err) return void 0;

      const value2: object = getValueFromObject(value);

      onOk && onOk(form, value2, keys);
    });
  }

  // cancel事件
  function handleCancelClick(event: React.MouseEvent<HTMLElement, MouseEvent>): void {
    onCancel && onCancel(form);
  }

  // 确认和取消按钮
  function footerView(): React.ReactNode {
    if (onOk || onCancel) {
      return (
        <div className={ styleName('object-click-button-box') }>
          {
            onOk
              ? <Button type="primary" onClick={ handleOkClick }>{ okText }</Button>
              : null
          }
          {
            onCancel ? (
              <Button className={ onOk ? styleName('object-cancel') : undefined } onClick={ handleCancelClick }>
                { cancelText }
              </Button>
            ) : null
          }
        </div>
      );
    } else {
      return null;
    }
  }

  return (
    <Fragment>
      { renderComponentByTypeView(formObjectRoot) }
      { footer ? footer(form) : footerView() }
    </Fragment>
  );
}

ObjectField.propTypes = {
  schema: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  okText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  cancelText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  footer: PropTypes.func
};

export default ObjectField;