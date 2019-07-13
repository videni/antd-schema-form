import * as React from 'react';
import { useEffect, PropsWithChildren } from 'react';
import * as PropTypes from 'prop-types';
import isPlainObject from 'lodash-es/isPlainObject';
import { Form as AntdForm } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import FormContext from './context';
import ObjectField from './components/fields/ObjectField/ObjectField';
import getObjectFromValue from './utils/getObjectFromValue';
import languagePack from './languagePack';
import { SchemaItem, ContextValue } from './types';

export interface FormProps extends FormComponentProps {
  schema: SchemaItem;
  value?: any;
  onOk?: Function;
  onCancel?: Function;
  okText?: string | number;
  cancelText?: string | number;
  footer?: Function;
  registry?: {
    [key: string]: Function;
  };
  customTableRender?: object;
  languagePack?: object;
}

function Form(props: PropsWithChildren<FormProps>): React.ReactElement | null {
  const {
    value: schemaFormValue,
    form,
    schema,
    onOk,
    onCancel,
    okText,
    cancelText,
    footer,
    registry,
    customTableRender
  }: FormProps = props;
  // 获取系统语言
  const language: string = typeof window === 'object' // 服务器端渲染判断
    ? (window.navigator.language || window.navigator['userLanguage']).toLocaleLowerCase()
    : 'default';
  const customLangPack: object | undefined = props.languagePack; // 自定义语言包
  const langP: object = isPlainObject(customLangPack)
    ? customLangPack
    : (language in languagePack ? languagePack[language] : languagePack['default']); // 语言包

  const contextValue: ContextValue = {
    form,
    registry,
    customTableRender,
    language,           // 系统语言
    languagePack: langP // 语言包
  };

  useEffect(function(): void {
    const obj: object = getObjectFromValue(schemaFormValue);

    form.resetFields();
    form.setFieldsValue(obj);
  }, [schemaFormValue]);

  return (
    <FormContext.Provider value={ contextValue }>
      <ObjectField schema={ schema }
        onOk={ onOk }
        onCancel={ onCancel }
        okText={ okText }
        cancelText={ cancelText }
        footer={ footer }
      />
    </FormContext.Provider>
  );
}

Form.propTypes = {
  schema: PropTypes.object.isRequired,
  value: PropTypes.object,
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
  registry: PropTypes.objectOf(PropTypes.func),
  customTableRender: PropTypes.objectOf(PropTypes.func),
  languagePack: PropTypes.object
};

Form.defaultProps = {
  registry: {},
  customTableRender: {}
};

// @ts-ignore
export default AntdForm.create()(Form);