import React from 'react';
import {
  RegisterOptions,
  useController,
  UseControllerReturn,
  useFormContext,
} from 'react-hook-form';
import useIForm from '../hooks/useIForm';
import * as yupHelper from '../utils/yupHelper';

type IFieldReturn = UseControllerReturn & {
  isRequired: boolean;
  label: string;
};

type IFieldProps = {
  children:
    | ((props: IFieldReturn) => any)
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
  const { yupSchema } = useIForm();
  const { control } = useFormContext();

  const isRequired = yupSchema
    ? yupHelper.isRequired(yupSchema, name)
    : rules?.required === true || rules?.required === 'true';

  const label = yupHelper.getLabel(yupSchema, name);

  const controller = useController({
    control: control,
    name,
    rules,
    defaultValue,
    shouldUnregister,
  });

  if (typeof children === 'function') {
    return children({ ...controller, isRequired, label });
  }

  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      controller: { ...controller, isRequired, label },
    });
  }

  return <>{children}</>;
};

export default Field;
