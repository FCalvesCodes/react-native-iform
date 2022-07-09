import { IUseFormControl, UseFormControl } from '../UseFormControl';

type UseIFormReturn = Omit<IUseFormControl, '_setForm' | '_setOnSubmit'>;

const useFormControl = (): UseIFormReturn => {
  return new UseFormControl();
};

export { useFormControl, UseIFormReturn };
