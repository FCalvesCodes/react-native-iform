import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { UseControllerReturn } from 'react-native-iform';

interface InputType extends TextInputProps {
  controller?: UseControllerReturn;
}

const Input: React.FC<InputType> = ({ controller }) => {
  if (!controller) {
    throw Error('Parent not Field');
  }

  const { field } = controller;

  return (
    <TextInput
      onChangeText={field.onChange}
      value={field.value}
      onBlur={field.onBlur}
    />
  );
};

export default Input;
