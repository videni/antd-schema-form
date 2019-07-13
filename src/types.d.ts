import { WrappedFormUtils } from 'antd/lib/form/Form';

export interface ContextValue {
  form: WrappedFormUtils;
  registry?: {
    [key: string]: Function | object;
  };
  customTableRender?: object;
  language?: string;
  languagePack?: any;
}

export interface Schema {
  id: string;
  type: string;
  title: string;
  description?: string;
  properties?: object;
  required?: Array<string>;
  dependencies?: {
    [key: string]: Array<string>;
  };
  oneOf?: Array<any>;
  $oneOfIndex?: number;
  $oneOfDisabled?: boolean;
  $hidden?: boolean;
  $tableColumnHidden?: boolean;
  $tableRender?: string;
  $widget?: string;
  $oneOfComponentType?: string;
}

export interface StringSchema extends Schema {
  $readOnly?: boolean;
  $placeholder?: string;
  $required?: boolean;
  $requiredMessage?: string;
  pattern?: string;
  $patternOption?: string;
  $patternMessage?: string;
  minLength?: number;
  maxLength?: number;
  $minLengthMessage?: string;
  $maxLengthMessage?: string;
  $length?: number;
  $lengthMessage?: string;
  enum?: Array<string>;
  $enumMessage?: string;
  $defaultValue?: string;
  $options?: Array<{ label: string; value: string }>;
}

export interface NumberSchema extends Schema {
  $readOnly?: boolean;
  $placeholder?: string;
  $required?: boolean;
  $requiredMessage?: string;
  minimum?: number;
  maximum?: number;
  $minimumMessage?: string;
  $maximumMessage?: string;
  $integer: boolean;
  $integerMessage?: string;
  enum?: Array<string>;
  $enumMessage?: string;
  $defaultValue?: number;
  $options?: Array<{ label: string; value: number }>;
}

export interface BooleanSchema extends Schema {
  $defaultValue?: boolean;
}

export interface ArratSchema extends Schema {
  items: StringSchema | NumberSchema | BooleanSchema | ArratSchema;
  $defaultValue?: Array<any>;
  $options?: Array<{ label: string; value: any }>;
  minItems?: number;
  maxItems?: number;
  $minItemsMessage?: string;
  $maxItemsMessage?: string;
  $addDataInReverseOrder?: boolean;
}