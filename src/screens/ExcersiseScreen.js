import {FlatList, Modal, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {authantication, db} from '../firebase/firebase';
import {
  doc,
  getDoc,
  setDoc,
  arrayUnion,
  updateDoc,
  Firestore,
} from 'firebase/firestore';
import {Screen} from '../components/Screen';
import {AppButton} from '../components/AppButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {AppInput} from '../components/AppInput';
import {addExercise} from '../redux/routine/slice';

export const ExcersiseScreen = ({route, navigation}) => {
  // const [Exercise, setExercise] = useState([]);

  const {item, id} = route.params;
  const Excersise = useSelector(s => s.Excersise[item]);
  const dispatch = useDispatch();
  // console.log(item, 's');
  // const getExercise = async () => {
  //   const querySnapshot = await getDoc(
  //     doc(db, 'users', authantication.currentUser.uid),
  //   );
  //   setExercise(querySnapshot.data()[item]);
  //   console.log(querySnapshot.data()[item]);
  // };

  // useEffect(() => {
  //   getExercise();
  // }, []);
  console.log(item, id, 'from');
  console.log(Excersise);

  return (
    <Screen style={styles.container}>
      <FlatList
        data={Excersise}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                console.log(id, 'from press');
                // updateDoc(
                //   doc(db, 'Exercise', authantication.currentUser.uid),
                //   {
                //     push1: [{[item]: [{weight: '', reps: '', notes: ''}]}],
                //   },
                //   {merge: true},
                // );
                // navigation.navigate('');
                dispatch(addExercise({id: id, ex: item}));
                navigation.navigate('AddToDoScreen', {id});
              }}>
              <Text style={styles.text}>{item}</Text>
            </TouchableOpacity>
          );
        }}
      />
      <AppButton
        style={styles.btn}
        title={'+'}
        onPress={() => navigation.navigate('AddExercise', {item})}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'rgb(234	,237	,244	)'},
  card: {
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderColor: 'gray',
  },
  text: {fontSize: 18},
  btn: {alignSelf: 'center'},
});
