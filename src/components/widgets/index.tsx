import ArrayWidget from './ArrayWidget';
import BooleanWidget from './BooleanWidget';
import CheckboxGroupWidget from './CheckboxGroupWidget';
import DateWidget from './DateWidget';
import TextWidget from './TextWidget';
import MultipleSelect from './MultipleSelect';
import NumberWidget from './NumberWidget';
import PasswordWidget from './PasswordWidget';
import RadioWidget from './RadioWidget';
import SelectWidget from './SelectWidget';
import SwitchWidget from './SwitchWidget';
import TextAreaWidget from './TextAreaWidget';
import ObjectWidget from './ObjectWidget';

export default {
  ArrayWidget,
  BooleanWidget,
  CheckboxGroupWidget,
  DateWidget,
  TextWidget,
  MultipleSelect,
  NumberWidget,
  PasswordWidget,
  RadioWidget,
  SelectWidget,
  SwitchWidget,
  TextAreaWidget,
  ObjectWidget,
};

export const widgetMap = {
  array: ArrayWidget,
  boolean: BooleanWidget,
  checkboxGroup: CheckboxGroupWidget,
  date: DateWidget,
  text: TextWidget,
  multipleSelect: MultipleSelect,
  multiple: MultipleSelect,
  tags: MultipleSelect,
  number: NumberWidget,
  password: PasswordWidget,
  radio: RadioWidget,
  select: SelectWidget,
  switch: SwitchWidget,
  textArea: TextAreaWidget,
  object: ObjectWidget,
};