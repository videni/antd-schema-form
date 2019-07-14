import { createContext, Context } from 'react';
import { ContextProps } from './types';

const FormContext: Context<ContextProps | {}> = createContext({});

export default FormContext;