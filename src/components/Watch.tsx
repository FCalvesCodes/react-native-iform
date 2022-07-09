import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useFormContext } from 'react-hook-form';

type IWatchProps = {
  style?: object;
};

const Watch: React.FC<IWatchProps> = ({ style }) => {
  const { watch, formState } = useFormContext();
  const {
    isSubmitted,
    isDirty,
    isSubmitting,
    isSubmitSuccessful,
    isValid,
    submitCount,
    isValidating,
  } = formState;

  const [changedValues, setChangedValues] = useState<object>(watch());

  useEffect(() => {
    const subscribe = watch((values: object) => {
      setChangedValues(values);
    });

    return () => {
      if (subscribe) {
        subscribe?.unsubscribe();
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{JSON.stringify(changedValues, null, 2)}</Text>
      {false ? (
        <View>
          <Text style={styles.small}>{`isSubmitted:${isSubmitted}`}</Text>
          <Text
            style={styles.small}
          >{`isisSubmittingirty:${isSubmitting}`}</Text>
          <Text
            style={styles.small}
          >{`isisSubmittingirty:${isSubmitting}`}</Text>
          <Text
            style={styles.small}
          >{`isSubmitSuccessful:${isSubmitSuccessful}`}</Text>
          <Text style={styles.small}>{`isDirty:${isDirty}`}</Text>
          <Text style={styles.small}>{`isValid:${isValid}`}</Text>
          <Text style={styles.small}>{`submitCount:${submitCount}`}</Text>
          <Text style={styles.small}>{`isValidating:${isValidating}`}</Text>
        </View>
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
