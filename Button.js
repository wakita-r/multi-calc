import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

const Button = ({ onPress, title, color, textColor, isZeroButton }) => {
  return (
    <TouchableOpacity
      style={[
        isZeroButton ? styles.zeroButton : styles.button,
        { backgroundColor: color },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          isZeroButton ? styles.zeroButtonText : styles.buttonText,
          { color: textColor || "white" },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    width: 80,
    borderRadius: 55,
  },
  zeroButton: {
    alignItems: "left",
    justifyContent: "center",
    height: 80,
    width: 170,
    borderRadius: 55,
  },
  buttonText: {
    fontSize: 38,
  },
  zeroButtonText: {
    paddingLeft: 30,
    fontSize: 38,
  },
});

export default Button;
