import * as React from 'react';
import { Input, Icon } from 'antd';
import SchemaForm from '../SchemaForm';
import stringJson from '../json/string.json';
import numberJson from '../json/number.json';
import booleanJson from '../json/boolean.json';
import arrayJson from '../json/array.json';

const schema = {
  id: '$root',
  type: 'object',
  title: 'schema form',
  description: '这是一个通过json schema渲染的表单。',
  properties: {
    string: stringJson,
    number: numberJson,
    boolean: booleanJson,
    array: arrayJson
  }
};

const formData = {
  $root: {
    string: {
      default: 'abcdefg'
    },
    number: {
      default: 12345
    }
  }
};

// 自定义组件
const registry = {
  widgets: {
    custom: (props) => {
      const { schema, option, form, required } = props;

      const { getFieldDecorator } = form;

      return getFieldDecorator(schema.id, option)(
        <Input placeholder="自定义组件" required={ required } addonAfter={ <Icon type="setting" /> } />
      );
    }
  }
};

// 自定义表格渲染
const customTableRender = {
  red(text, record, index, item, form) {
    return <span style={{ color: '#f00' }}>{ text }</span>;
  },
  green(text, record, index, item, form) {
    return <span style={{ color: '#0f0' }}>{ text }</span>;
  }
};

function Form(props) {
  return (
    <SchemaForm schema={ schema }
      formData={ formData }
      registry={ registry }
      customTableRender={ customTableRender }
      onOk={ (form, formData, keys) => console.log(formData, keys) }
      okText="提交"
    />
  );
}

export default Form;