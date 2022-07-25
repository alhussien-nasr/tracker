import React, {useState} from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import {AppButton} from '../components/AppButton';
import {Screen} from '../components/Screen';
import {useDispatch, useSelector} from 'react-redux';
import {AppInput} from '../components/AppInput';
import {
  addDateAndName,
  addRepAndWeight,
  addSet,
  Delete,
} from '../redux/routine/slice';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export const AddToDoScreen = ({navigation, route}) => {
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [name, setName] = useState('');
  const [bodyWeight, setBodyweight] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  let options = {weekday: 'long', month: 'long', day: 'numeric'};

  const {id} = route.params;
  const routine = useSelector(s => s.Routine.list.find(item => item.id === id));
  const disPatch = useDispatch();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name="delete"
          size={30}
          onPress={() => {
            disPatch(Delete({id, type: 'workOut'}));
            navigation.goBack();
          }}
        />
      ),
    });
  }, [navigation]);

  return (
    <Screen style={styles.container}>
      <FlatList
        style={{flex: 1}}
        ItemSeparatorComponent={() => (
          <View
            style={{height: 1, backgroundColor: 'gray', marginVertical: 15}}
          />
        )}
        ListHeaderComponent={
          <View style={styles.inputContainer}>
            <View style={styles.inputName}>
              <AppInput
                label={'name'}
                defaultValue={routine?.name}
                onChangeText={val => setName(val)}
                style={[styles.input, {width: '65%'}]}
                onEndEditing={() => {
                  disPatch(addDateAndName({type: 'name', name: name, id}));
                }}
                placeholderTextColor="white"
              />
              <AppInput
                style={styles.input}
                defaultValue={routine?.bodyWeight}
                placeholder="BW"
                placeholderTextColor={'gray'}
                onChangeText={val => setBodyweight(val)}
                onEndEditing={() => {
                  disPatch(
                    addDateAndName({type: 'bodyWeight', bodyWeight, id}),
                  );
                }}
              />
            </View>
            <View style={styles.dateStyle}>
              <AppInput
                label={'date'}
                style={styles.input}
                onPressIn={() => setOpen(true)}
                value={routine?.date}
              />
              <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={val => {
                  setOpen(false);
                  setDate(val);
                  disPatch(
                    addDateAndName({
                      type: 'date',
                      date: date.toLocaleDateString('ar-EG', options),
                      id,
                    }),
                  );
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />

              <AppInput
                style={styles.input}
                label={'Start time'}
                onEndEditing={() => {}}
              />
              <AppInput
                style={styles.input}
                label={'End Time'}
                onEndEditing={() => {}}
              />
            </View>
            <AppInput
              style={[styles.input, {width: '100%'}]}
              label="Notes"
              onEndEditing={() => {}}
            />
          </View>
        }
        data={routine?.exercise}
        renderItem={({item, index}) => {
          return (
            <View style={styles.itemContainer}>
              <View style={styles.row}>
                <Icon
                  name="dots-vertical"
                  color={'gray'}
                  size={25}
                  onPress={() => {
                    console.log('clicked');
                    disPatch(Delete({index, id, type: 'exercise'}));
                  }}
                />
                <Text style={styles.text}>
                  {'  '}
                  {item?.name}
                </Text>
              </View>
              <FlatList
                data={item?.sets}
                renderItem={({item, index: setIndex}) => {
                  console.log(item, 'item', index);
                  return (
                    <View style={styles.card}>
                      <View style={styles.setNum}>
                        <Text style={{color: 'white'}}>{setIndex + 1}</Text>
                      </View>

                      <AppInput
                        style={styles.itemInput}
                        defaultValue={item.set}
                        onChangeText={val => setReps(val)}
                        onEndEditing={() => {
                          disPatch(
                            addRepAndWeight({
                              id: id,
                              type: 'addset',
                              val: reps,
                              index,
                              setIndex,
                            }),
                          );
                        }}
                      />

                      <AppInput
                        style={styles.itemInput}
                        defaultValue={item.weight}
                        onChangeText={val => setWeight(val)}
                        onEndEditing={() => {
                          disPatch(
                            addRepAndWeight({
                              id: id,
                              type: 'addWeight',
                              val: weight,
                              index,
                              setIndex,
                            }),
                          );
                        }}
                      />
                      <AppInput
                        style={[styles.itemInput, {width: '40%'}]}
                        onEndEditing={() => {}}
                      />
                    </View>
                  );
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  disPatch(addSet({id, index}));
                }}>
                <Text style={styles.text}>add set</Text>
                {console.log(routine)}
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <AppButton
        style={styles.btn}
        title="+"
        onPress={() => navigation.navigate('SelectExercise', {id})}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  row: {alignItems: 'center', flexDirection: 'row', marginBottom: 20},
  container: {
    backgroundColor: 'rgb(234	,237	,244	)',
    paddingTop: 25,
    flex: 1,
  },
  itemContainer: {paddingHorizontal: 20},
  btn: {
    alignSelf: 'center',
  },
  text: {fontSize: 20},
  dateStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  inputName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  inputContainer: {
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 30,
    paddingBottom: 20,
  },
  input: {width: '30%'},
  itemInputContainer: {width: '30%', alignItems: 'center'},
  itemInput: {height: 50, width: '20%'},
  setNum: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
  },
});
