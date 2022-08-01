import React from 'react';
import { AnyObjectSchema } from 'yup';

type IFormContextValues = {
  yupSchema: AnyObjectSchema | undefined;
};

type IFormProviderProps = {
  yupSchema: AnyObjectSchema | undefined;
};

const IFormContext = React.createContext<IFormContextValues>({
  yupSchema: undefined,
});

const IFormProvider: React.FC<IFormProviderProps> = ({
  children,
  yupSchema,
}) => {
  return (
    <IFormContext.Provider value={{ yupSchema }}>
      {children}
    </IFormContext.Provider>
  );
};

export { IFormContext, IFormProvider };
