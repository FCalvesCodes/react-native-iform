import React, { useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { Form, Field, Watch } from 'react-native-iform';
import * as yup from 'yup';

const schema = yup.object().shape({
  user: yup.object().shape({
    name: yup.string().required().min(6).label('Nome').max(20),
    email: yup.string().required().email().label('E-mail'),
  }),
});

const App = () => {
  const [inputVisible, setInputVisible] = useState(true);

  const handleSubmit = (values: object) => {
    Alert.alert(JSON.stringify(values, null, 2));
  };

  return (
    <Form onSubmit={handleSubmit} yupSchema={schema} shouldUnregister={false}>
      {({ onSubmit }) => (
        <View>
          <Watch />
          {inputVisible && (
            <>
              <Field
                name="user.name"
                rules={{ required: true, minLength: 3, maxLength: 5 }}
              >
                {({ field, fieldState, label }) => (
                  <View style={{ padding: 10 }}>
                    <Text>{label ?? 'Outro label'}</Text>
                    <TextInput
                      style={{ borderWidth: 1 }}
                      onChangeText={field.onChange}
                      value={field.value}
                      onBlur={field.onBlur}
                    />
                    <Text>{fieldState?.error?.message}</Text>
                  </View>
                )}
              </Field>
              <Field
                name="user.email"
                rules={{ required: true, minLength: 3, maxLength: 5 }}
              >
                {({ field, fieldState, label }) => (
                  <View style={{ padding: 10 }}>
                    <Text>{label ?? 'Outro label'}</Text>
                    <TextInput
                      style={{ borderWidth: 1 }}
                      onChangeText={field.onChange}
                      value={field.value}
                      onBlur={field.onBlur}
                    />
                    <Text>{fieldState?.error?.message}</Text>
                  </View>
                )}
              </Field>
            </>
          )}
          <Button title="Salvar" onPress={onSubmit} />
          <Button
            title="Ocultar/Mostrar"
            onPress={() => setInputVisible(!inputVisible)}
          />
        </View>
      )}
    </Form>
  );
};

export default App;
