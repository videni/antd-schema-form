import * as React from 'react';
import { useEffect, PropsWithChildren } from 'react';
import * as PropTypes from 'prop-types';
import isPlainObject from 'lodash-es/isPlainObject';
import { Form as AntdForm, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import FormContext from './context';
import ObjectField from './components/fields/ObjectField/ObjectField';
import getObjectFromValue from './utils/getObjectFromValue';
import languagePack from './languagePack';
import { Schema, ContextValue } from './types';
import SchemaField from './components/fields/SchemaField';
import getValueFromObject from './utils/getValueFromObject';
import getKeysFromObject from './utils/getKeysFromObject';
import styleName from './utils/styleName';
import { Registry } from './registry';

export interface FormProps extends FormComponentProps {
  schema: Schema;
  registry: Registry;
  formData?: any;
  onOk?: Function;
  onCancel?: Function;
  okText?: string | number;
  cancelText?: string | number;
  footer?: Function;
  customTableRender?: object;
  languagePack?: object;
}

function Form(props: PropsWithChildren<FormProps>): React.ReactElement | null {
  // 获取系统语言
  const language: string = typeof window === 'object' // 服务器端渲染判断
    ? (window.navigator.language || window.navigator['userLanguage']).toLocaleLowerCase()
    : 'default';
  const customLangPack: object | undefined = props.languagePack; // 自定义语言包
  const langP: object = isPlainObject(customLangPack)
    ? customLangPack
    : (language in languagePack ? languagePack[language] : languagePack['default']); // 语言包

  const {
    formData,
    form,
    schema,
    onOk,
    onCancel,
    okText = langP.formObject.okText,
    cancelText = langP.formObject.cancelText,
    footer,
    registry,
    customTableRender
  }: FormProps = props;


  const contextValue: ContextValue = {
    form,
    registry,
    customTableRender,
    language,           // 系统语言
    languagePack: langP // 语言包
  };

  useEffect(function(): void {
    const fieldsValueObject: object = getObjectFromValue(formData);

    form.resetFields();
    form.setFieldsValue(fieldsValueObject);
  }, [formData]);

  // ok事件
  function handleOkClick(event: React.MouseEvent<HTMLElement, MouseEvent>): void {
    const keys: string[] = getKeysFromObject(schema);

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
    <FormContext.Provider value={ contextValue }>
      <AntdForm >
        <SchemaField schema={ schema } />
        { footer ? footer(form) : footerView() }
      </AntdForm>
    </FormContext.Provider>
  );
}

Form.propTypes = {
  schema: PropTypes.object.isRequired,
  formData: PropTypes.object,
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
  footer: PropTypes.func,
  registry: PropTypes.object.isRequired,
  customTableRender: PropTypes.objectOf(PropTypes.func),
  languagePack: PropTypes.object
};

Form.defaultProps = {
  customTableRender: {}
};

// @ts-ignore
export default AntdForm.create()(Form);