import React from 'react';
import {
  useForm,
  FormProvider,
  CriteriaMode,
  Mode,
  UseFormReturn,
} from 'react-hook-form';
import { AnyObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { IFormProvider } from '../contexts/IForm';

type IFormHandle = {
  onSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  form: UseFormReturn<object, object>;
};

type IFormProps = {
  children?: (props: IFormHandle) => any;
  onSubmit?: (submittingValues: object) => void;
  onBeforeSubmit?: (submittingValues: object) => object;
  onBeforeBinding?: (submittingValues: object) => object;
  initialValues?: object;
  mode?: Mode;
  reValidateMode?: Exclude<Mode, 'onTouched' | 'all'>;
  criteriaMode?: CriteriaMode;
  yupSchema?: AnyObjectSchema;
};

const Form: React.ForwardRefRenderFunction<IFormHandle, IFormProps> = (
  {
    children,
    yupSchema,
    initialValues = {},
    mode = 'onSubmit',
    criteriaMode = 'firstError',
    reValidateMode = 'onChange',
    onBeforeBinding = (submittingValues: object) => submittingValues,
    onBeforeSubmit = (submittingValues: object) => submittingValues,
    onSubmit = (submittingValues: object) => submittingValues,
  },
  ref
) => {
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

  React.useImperativeHandle(ref, () => ({
    form: methods,
    onSubmit: onSubmitForm,
  }));

  return (
    <IFormProvider yupSchema={yupSchema} form={methods} onSubmit={onSubmitForm}>
      <FormProvider {...methods}>
        {typeof children === 'function'
          ? children({
              onSubmit: onSubmitForm,
              form: methods,
            })
          : children}
      </FormProvider>
    </IFormProvider>
  );
};

export default React.forwardRef(Form);
