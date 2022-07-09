import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { Form, Field, Watch, useIForm } from 'react-native-iform';
import Input from './components/Input';

const App = () => {
  return (
    <Form>
      <Watch />
      <Field name="name" rules={{ min: 2 }}>
        <Input />
      </Field>
    </Form>
  );
};

export default App;
