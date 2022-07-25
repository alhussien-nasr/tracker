import {StyleSheet, TextInput, View, Text} from 'react-native';
import React from 'react';

export const AppInput = ({onChangeText, style, label, inputStyle, ...rest}) => {
  return (
    <View style={[styles.inputContainer, style]}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={{color: 'gray'}}>{label}</Text>
        </View>
      )}
      <TextInput
        autoCorrect={false}
        autoCapitalize={false}
        autoComplet={false}
        {...rest}
        onChangeText={onChangeText}
        style={[styles.input, inputStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    height: 60,
    borderRadius: 10,
    paddingLeft: 20,
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 18,
  },
  labelContainer: {
    position: 'absolute',
    backgroundColor: 'black',
    top: -12,
    left: 15,
    padding: 5,
    zIndex: 50,
  },
});
