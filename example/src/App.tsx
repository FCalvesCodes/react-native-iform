import React from 'react';
import { Alert, Button } from 'react-native';
import { Form, Field, Watch } from 'react-native-iform';
import Input from './components/Input';

const App = () => {
  const handleSubmit = (values: object) => {
    Alert.alert(JSON.stringify(values, null, 2));
  };

  return (
    <Form onSubmit={handleSubmit}>
      {({ onSubmit }) => (
        <>
          <Watch showError={true} />
          <Field
            name="name"
            rules={{ required: true, minLength: 3, maxLength: 5 }}
          >
            <Input />
          </Field>
          <Button title="Salvar" onPress={onSubmit} />
        </>
      )}
    </Form>
  );
};

export default App;
