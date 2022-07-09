import { UseFormReturn } from 'react-hook-form';

type IUseFormControl = {
  form?: UseFormReturn;
  onSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => void;
  _setForm: (form: UseFormReturn) => void;
  _setOnSubmit: (onSubmit: () => void) => void;
};

class UseFormControl implements IUseFormControl {
  public form?: UseFormReturn;
  private _onSubmit?: () => void;

  public _setForm = (form: UseFormReturn) => {
    if (!this.form) {
      this.form = form;
    }
  };

  public _setOnSubmit = (onSubmit: () => void) => {
    if (!this._onSubmit) {
      this._onSubmit = onSubmit;
    }
  };

  public onSubmit = () => {
    if (this._onSubmit) {
      this._onSubmit();
    }
  };
}

export { UseFormControl, IUseFormControl };
