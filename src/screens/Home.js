import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Text, TouchableOpacity} from 'react-native';
import {AppButton} from '../components/AppButton';
import {AppInput} from '../components/AppInput';
import {Screen} from '../components/Screen';
import {getAuth, signOut} from 'firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {add} from '../redux/routine/slice';

export const Home = ({navigation}) => {
  const routine = useSelector(s => s.Routine.list);
  const dispatch = useDispatch();
  console.log(routine);
  let id = Math.random();

  return (
    <Screen style={styles.container}>
      <FlatList
        ItemSeparatorComponent={() => <View style={{height: 20}} />}
        data={routine}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => {
              navigation.navigate('AddToDoScreen', {id: item.id});
            }}>
            <View style={styles.date}>
              <Text style={styles.text}>{item.date}</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.text}>
                {item.name ? item.name : item.subName}
              </Text>
              <FlatList
                data={item.exercise}
                renderItem={({item}) => {
                  return (
                    <Text style={styles.text}>
                      {item?.sets?.length}
                      {'x '}
                      {item.name}
                    </Text>
                  );
                }}
              />
            </View>
          </TouchableOpacity>
        )}
      />
      <AppButton
        style={styles.btn}
        title="+"
        onPress={() => {
          dispatch(add(id));
          navigation.navigate('AddToDoScreen', {id});
        }}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(234	,237	,244	)',
    flex: 1,
    paddingLeft: 20,
    paddingTop: 20,
  },
  btn: {
    alignSelf: 'center',
  },
  text: {fontSize: 18},
  date: {width: 60},
  itemContainer: {flexDirection: 'row'},
  box: {
    backgroundColor: 'white',
    marginLeft: 20,
    borderRadius: 10,
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
