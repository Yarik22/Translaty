import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import useFavouriteStore from "../store/favourites/useFavouriteStore";
import { deleteFavourite } from "../data/useFavouriteTable";
import { languageAliases } from "../data/helpers/languages";
import { Button } from "native-base";
import { useNavigation } from "@react-navigation/native";
const FavouriteCard = ({
  id,
  sourceText,
  translationText,
  sourceLang,
  translationLang,
}) => {
  const deleteFavouriteFromStore = useFavouriteStore(
    (state) => state.deleteFavourite
  );

  const navigation = useNavigation();
  const handleDelete = (id) => {
    deleteFavouriteFromStore(id);
    deleteFavourite(id)
      .then((rowsAffected) =>
        console.log("Deleted favourite. Rows affected:", rowsAffected)
      )
      .catch((error) => console.log("Error deleting favourite:", error));
  };

  return (
    <View style={styles.card}>
      <Text style={styles.text}>{sourceText}</Text>
      <Text style={styles.translation}>{translationText}</Text>
      <Button
        size="sm"
        variant="subtle"
        onPress={() =>
          navigation.navigate("Translator", {
            sourceText,
            translationText,
            sourceLang,
            translationLang,
          })
        }
      >
        <Text
          style={styles.lang}
        >{`From: ${languageAliases[sourceLang]} To: ${languageAliases[translationLang]}`}</Text>
      </Button>
      <TouchableOpacity
        onPress={() => handleDelete(id)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  translation: {
    fontSize: 16,
    marginBottom: 8,
  },
  lang: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  deleteButton: {
    backgroundColor: "red",
    borderRadius: 5,
    padding: 8,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default FavouriteCard;
