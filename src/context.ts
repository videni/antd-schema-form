import { createContext, Context } from 'react';
import { ContextValue } from './types';

const FormContext: Context<ContextValue | {}> = createContext({});

export default FormContext;