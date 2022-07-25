import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

export const AppButton = ({ title, onPress, style, ...rest }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      
      style={[styles.button, style]}
      {...rest}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 60,
    backgroundColor: "#ED4A4A",
    borderRadius: 30,
    justifyContent: "center",
  },
  text: { textAlign: "center", color: "white", fontSize: 30 },
});
