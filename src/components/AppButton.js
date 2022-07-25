import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

export const AppButton = ({title, onPress, style, ...rest}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}
      {...rest}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 60,
    width: 60,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
  },
  text: {textAlign: 'center', fontSize: 30},
});
