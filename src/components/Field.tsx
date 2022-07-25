import React from 'react';
import {
  RegisterOptions,
  useController,
  UseControllerReturn,
  useFormContext,
} from 'react-hook-form';

type IFieldProps = {
  children:
    | ((props: UseControllerReturn) => any)
    | React.ReactNode
    | React.ReactElement;
  name: string;
  rules?: Omit<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  shouldUnregister?: boolean;
  defaultValue?: any;
};

const Field: React.FC<IFieldProps> = ({
  children,
  name,
  rules,
  shouldUnregister = true,
  defaultValue,
}) => {
  if (!name) {
    throw Error('Name is required');
  }

  const { control } = useFormContext();
  const controller = useController({
    control: control,
    name,
    rules,
    defaultValue,
    shouldUnregister,
  });

  if (typeof children === 'function') {
    return children(controller);
  }

  if (React.isValidElement(children)) {
    return React.cloneElement(children, { controller });
  }

  return <>{children}</>;
};

export default Field;
