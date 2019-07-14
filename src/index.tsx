import * as React from 'react';
import { useState, useEffect, PropsWithChildren, Dispatch, SetStateAction } from 'react';
import Form, { FormProps } from './Form';
import defaultRegistry from './registry';
import getKeysFromObject from './utils/getKeysFromObject';
import getObjectFromValue from './utils/getObjectFromValue';
import getValueFromObject from './utils/getValueFromObject';
import { Registry } from './registry';

function createRegistry(defaultRegistry: Registry, customRegistry: Registry): Registry {
  return {
    widgets: {
      ...defaultRegistry.widgets,
      ...customRegistry.widgets
    },
    fields: {
      ...defaultRegistry.fields,
      ...customRegistry.fields
    }
  };
}

export default function(props: PropsWithChildren<FormProps>): React.ReactNode | null {
  const customRegistry: Registry = props.registry || {};
  const [registry, setRegistry]: [
    object | undefined,
    Dispatch<SetStateAction<object>>
  ] = useState(createRegistry(defaultRegistry, customRegistry));

  useEffect(function(): void {
    setRegistry(createRegistry(defaultRegistry, customRegistry));
  }, [customRegistry]);

  return <Form { ...props } registry={ registry } />;
}

export {
  getKeysFromObject,
  getObjectFromValue,
  getValueFromObject
};