import React from "react";
import { Button, View } from "react-native";
import useFavouriteStore from "../store/favourites/useFavouriteStore";
import { FormControl, Input, Divider } from "native-base";
import { useState } from "react";
import { ScrollView } from "react-native";
import FavouriteCard from "../components/FavouriteCard";

export default function Home({ navigation }) {
  const [filterText, setFilterText] = useState("");

  const favourites = useFavouriteStore((state) => state.favourites);
  return (
    <View style={{ flex: 1 }}>
      <Button
        title="Go to Translator"
        onPress={() => navigation.navigate("Translator", { sourceText: " " })}
      />
      <ScrollView>
        <FormControl>
          <FormControl.Label>Filter</FormControl.Label>
          <Input
            _light={{
              bg: "coolGray.100",
              _hover: {
                bg: "coolGray.200",
              },
              _focus: {
                bg: "coolGray.200:alpha.70",
              },
            }}
            _dark={{
              bg: "coolGray.800",
              _hover: {
                bg: "coolGray.900",
              },
              _focus: {
                bg: "coolGray.900:alpha.70",
              },
            }}
            onChangeText={(e) => setFilterText(e.trim())}
            shadow={2}
            type="text"
            placeholder="Привіт"
          />
        </FormControl>
        <Divider w="100%" marginY={3} />
        {favourites
          .filter(
            (fav) =>
              fav.sourceText.toLowerCase().includes(filterText.toLowerCase()) ||
              fav.translationText
                .toLowerCase()
                .includes(filterText.toLowerCase())
          )
          .map((fav) => (
            <FavouriteCard
              key={fav.id}
              id={fav.id}
              sourceText={fav.sourceText}
              translationText={fav.translationText}
              sourceLang={fav.sourceLang}
              translationLang={fav.translationLang}
            />
          ))}
      </ScrollView>
    </View>
  );
}
