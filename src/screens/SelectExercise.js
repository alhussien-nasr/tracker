import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Screen} from '../components/Screen';
import {db, authantication} from '../firebase/firebase';
import {collection, getDocs, doc, getDoc} from 'firebase/firestore';
import {useSelector} from 'react-redux';

export const SelectExercise = ({navigation,route}) => {
  const {id}=route.params
  const excersise = Object.keys(useSelector(state => state.Excersise));
  // const [Exercise, setExercise] = useState([]);
  // const getExercise = async () => {
  //   const querySnapshot = await getDoc(
  //     doc(db, 'users', authantication.currentUser.uid),
  //   );
  //   setExercise(Object.keys(querySnapshot.data()));
  //   console.log(querySnapshot.data());
  // };

  // useEffect(() => {
  //   getExercise();
  // }, []);
  console.log(excersise, 'ee');
  return (
    <Screen style={styles.container}>
      <FlatList
        data={excersise}
        ItemSeparatorComponent={() => <View style={styles.separetor} />}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('ExcersiseScreen', {item,id})}>
              <Text style={styles.text}> {item}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'black',},
  card: {
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderColor: 'gray',
  },
  text: {color: 'white', fontSize: 18},
});
const ex = ['aps', 'bi', 'try'];
