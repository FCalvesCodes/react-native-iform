import React, { useEffect } from 'react';
import { useForm, FormProvider, CriteriaMode, Mode } from 'react-hook-form';
import { AnyObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { UseFormControl, IUseFormControl } from '../UseFormControl';

type IFormProps = {
  children?:
    | {
        onSubmit: (
          e?: React.BaseSyntheticEvent<object, any, any> | undefined
        ) => Promise<void>;
      }
    | React.ReactNode
    | React.ReactElement;
  onSubmit?: (submittingValues: object) => void;
  onBeforeSubmit?: (submittingValues: object) => object;
  onBeforeBinding?: (submittingValues: object) => object;
  initialValues?: object;
  mode?: Mode;
  reValidateMode?: Exclude<Mode, 'onTouched' | 'all'>;
  criteriaMode?: CriteriaMode;
  yupSchema?: AnyObjectSchema;
  form?: IUseFormControl;
};

const Form: React.FC<IFormProps> = ({
  children,
  form,
  yupSchema,
  initialValues = {},
  mode,
  criteriaMode,
  reValidateMode,
  onBeforeBinding = (submittingValues: object) => submittingValues,
  onBeforeSubmit = (submittingValues: object) => submittingValues,
  onSubmit = (submittingValues: object) => submittingValues,
}) => {
  const methods = useForm({
    defaultValues: onBeforeBinding(initialValues),
    mode,
    criteriaMode,
    reValidateMode,
    resolver: yupSchema ? yupResolver(yupSchema) : undefined,
  });

  const handleOnSubmit = (submittingValues: object) => {
    onSubmit(onBeforeSubmit(submittingValues));
  };

  const onSubmitForm = methods.handleSubmit(handleOnSubmit);

  useEffect(() => {
    if (form) {
      (form as UseFormControl)?._setForm(methods);
      (form as UseFormControl)?._setOnSubmit(onSubmitForm);
    }
  }, []);

  if (typeof children === 'function') {
    return (
      <FormProvider {...methods}>
        {children({
          onSubmit: onSubmitForm,
        })}
      </FormProvider>
    );
  }

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default Form;
