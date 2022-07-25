import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Screen} from '../components/Screen';
import {AppInput} from '../components/AppInput';
import {AppButton} from '../components/AppButton';
import {useDispatch, useSelector} from 'react-redux';
import {add} from '../redux/excersise/slice';

export const AddExercise = ({route , navigation}) => {
  const {item} = route.params;
  const [text, setText] = useState('');
  const Exercise = useSelector(s => s.Excersise);
  console.log(Exercise, 'ddd');
  const disPatch = useDispatch();
  console.log(item, 'item');
  return (
    <Screen style={styles.container}>
      <AppInput onChangeText={val => setText(val)} />
      <AppButton
        onPress={() => {
          disPatch(add({item, text}));
          navigation.goBack()

        }}
        title="add"
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
});
