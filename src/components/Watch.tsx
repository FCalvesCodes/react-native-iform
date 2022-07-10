import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useFormState, useWatch } from 'react-hook-form';

type IWatchProps = {
  style?: object;
  showError?: boolean;
};

const Watch: React.FC<IWatchProps> = ({ style, showError = false }) => {
  const { isValid, errors } = useFormState();
  const values = useWatch();

  const styleContainer = StyleSheet.flatten([!isValid && styles.borderError]);

  return (
    <View style={[styles.container, styleContainer, style]}>
      <Text style={styles.text}>{JSON.stringify(values, null, 2)}</Text>
      {showError && !isValid ? (
        <Text style={styles.text}>{JSON.stringify(errors, null, 2)}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#20232a',
    padding: 10,
    elevation: 3,
    borderRadius: 5,
    margin: 10,
  },
  borderError: {
    borderWidth: 2,
    borderColor: 'red',
  },
  text: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  small: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default Watch;
