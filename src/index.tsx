import * as React from 'react';
import { useState, useEffect, PropsWithChildren, Dispatch, SetStateAction } from 'react';
import Form, { FormProps } from './Form';
import defaultRegistry from './registry';
import getKeysFromObject from './utils/getKeysFromObject';
import getObjectFromValue from './utils/getObjectFromValue';
import getValueFromObject from './utils/getValueFromObject';

export default function(props: PropsWithChildren<FormProps>): React.ReactNode | null {
  const { customRegistry, ...otherProps }: FormProps = props;
  const [registry, setRegistry]: [
    object | undefined,
    Dispatch<SetStateAction<object>>
  ] = useState(Object.assign(defaultRegistry, customRegistry || {}));

  useEffect(function(): void {
    setRegistry(Object.assign(defaultRegistry, customRegistry || {}));
  }, [customRegistry]);

  return <Form registry={ registry } { ...otherProps } />;
}

export {
  getKeysFromObject,
  getObjectFromValue,
  getValueFromObject
};