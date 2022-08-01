import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AnyObjectSchema } from 'yup';

type IFormContextValues = {
  yupSchema: AnyObjectSchema | undefined;
  onSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  form: UseFormReturn<object, object>;
};

type IFormProviderProps = IFormContextValues;

const IFormContext = React.createContext<IFormContextValues>(
  {} as IFormContextValues
);

const IFormProvider: React.FC<IFormProviderProps> = ({
  children,
  yupSchema,
  onSubmit,
  form,
}) => {
  return (
    <IFormContext.Provider value={{ yupSchema, onSubmit, form }}>
      {children}
    </IFormContext.Provider>
  );
};

export { IFormContext, IFormProvider };
