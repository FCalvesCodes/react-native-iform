import React from 'react';
import { IFormContext } from '../contexts/IForm';

const useIForm = () => {
  const context = React.useContext(IFormContext);
  return context;
};

export default useIForm;
