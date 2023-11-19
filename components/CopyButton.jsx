import * as Clipboard from "expo-clipboard";
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CopyButton = ({ textToCopy }) => {
  return (
    <TouchableOpacity
      onPress={() => Clipboard.setString(textToCopy)}
      style={styles.copyButton}
    >
      <Text style={styles.copyButtonText}>Copy Text</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  copyButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  copyButtonText: {
    color: "#fff",
  },
});

export default CopyButton;
