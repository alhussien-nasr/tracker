import {
  StyleSheet,
  View,
  StatusBar,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React from 'react';
export const Screen = ({children, style}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={[{flex: 1, backgroundColor: '#239241246'}, style]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
