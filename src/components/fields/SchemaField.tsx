import React, { Fragment, useEffect, PropsWithChildren, useContext } from 'react';
import { Schema, ContextValue } from '../../types';
import PropTypes from 'prop-types';
import UnsupportedField from './UnsupportedField';
import isArray from 'lodash-es/isArray';
import OneOfField from './OneOfField';
import isBoolean from 'lodash-es/isBoolean';
import FormContext from '../../context';

interface SchemaFieldProps {
  schema: Schema;
  dependenciesDisplay?: boolean;
  required?: boolean
}

const COMPONENT_TYPES: object = {
  array: 'ArrayField',
  boolean: 'BooleanField',
  number: 'NumberField',
  object: 'ObjectField',
  string: 'StringField'
};

function getSchemaType(schema: Schema): string {
  const { type } = schema;

  if (!type && schema.enum) {
    return 'string';
  }

  if (!type && (schema.properties || schema.additionalProperties)) {
    return 'object';
  }

  if (type instanceof Array && type.length === 2 && type.includes('null')) {
    return type.find((type) => type !== 'null');
  }

  return type;
}

function getFieldComponent(schema: Schema, fields: object): React.ReactElement {
  const componentName: string = COMPONENT_TYPES[getSchemaType(schema)];

  // If the type is not defined and the schema uses'oneOf', don't
  // render a field and let the OneOfField component handle the form display
  if (!componentName && schema.oneOf) {
    return () => null;
  }

  return componentName in fields
    ? fields[componentName]
    : () => {
      return (
        <UnsupportedField schema={ schema }
          $id={ schema.id }
          reason={ `Unknown field type ${ schema.type }` }
        />
      );
    };
}

function isOneOf(schema: Schema): boolean {
  return 'oneOf' in schema && schema.oneOf && isArray(schema.oneOf) && schema.oneOf.length > 0;
}

function SchemaField(props: PropsWithChildren<SchemaFieldProps>): React.ReactElement {
  const context: ContextValue | {} = useContext(FormContext);

  if (!('form' in context)) return null; // 类型判断
  const { registry: { fields } } = context;

  const { schema, dependenciesDisplay, required } = props;

  // 判断是否渲染dependencies
  if (isBoolean(dependenciesDisplay) && !dependenciesDisplay) {
    return null;
  }

  const FieldComponent = getFieldComponent(schema, fields);

  const field = (
    <FieldComponent { ...props } />
  );

  return (
    <Fragment>
      {field}
      {isOneOf(schema) && (
        <OneOfField schema={ schema } />
      )}
    </Fragment>
  );
}

SchemaField.propTypes = {
  schema: PropTypes.object.isRequired
};

export default SchemaField;