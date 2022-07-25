import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export const AppText = ({style}) => {
  return (
      <Text style={[styles.text,style]}>AppText</Text>
  )
}


const styles = StyleSheet.create({
    text:{color:'black'}
})