import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  Input,
  Stack,
  WarningOutlineIcon,
  Select,
  CheckIcon,
  Button,
} from "native-base";
import { addFavourite } from "../data/useFavouriteTable";
import useFavouriteStore from "../store/favourites/useFavouriteStore";
import { languageAliases } from "../data/helpers/languages";
import CopyButton from "../components/CopyButton";

export default function Translator({ route }) {
  const [sourceText, setSourceText] = useState(route.params.sourceText || " ");
  const [translationText, setTranslationText] = useState(
    route.params.translationText || " "
  );
  const [sourceLang, setSourceLang] = useState(route.params.sourceLang || "uk");
  const [translationLang, setTranslationLang] = useState(
    route.params.translationLang || "en"
  );

  const languageOptions = Object.keys(languageAliases).map((code) => (
    <Select.Item label={languageAliases[code]} value={code} key={code} />
  ));
  const favourites = useFavouriteStore((state) => state.favourites);
  const addFavouriteToStore = useFavouriteStore((state) => state.addFavourite);

  useEffect(() => {
    handleTranslate(sourceText);
  }, [translationLang, sourceLang]);

  const addToFavourites = () => {
    addFavourite({ sourceText, translationText, sourceLang, translationLang })
      .then((id) =>
        addFavouriteToStore({
          sourceText,
          translationText,
          sourceLang,
          translationLang,
          id,
        })
      )
      .catch((error) => console.log("Error adding favourite:", error));
  };

  const handleTranslate = async (text) => {
    setSourceText(text);
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${
          text || " "
        }&langpair=${sourceLang}|${translationLang}`
      )
        .then((response) => {
          const data = response.json();
          return data;
        })
        .then((data) => {
          const translatedText =
            data?.responseData?.translatedText || "Translation not available";
          if (sourceLang === translationLang) {
            setTranslationText(text);
            return;
          }
          setTranslationText(translatedText);
        });
    } catch (error) {
      console.error("Error fetching translation:", error.message);
    }
  };

  return (
    <Box w="100%">
      <Stack mx="4">
        <Stack mx="4">
          <Box maxW="300">
            <Select
              selectedValue={sourceLang}
              minWidth="200"
              accessibilityLabel="Choose Service"
              placeholder="Choose source language"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(itemValue) => setSourceLang(itemValue)}
            >
              {languageOptions}
            </Select>
          </Box>
        </Stack>
        <FormControl isInvalid={sourceText.length >= 6000}>
          <FormControl.Label>Source text</FormControl.Label>
          <Input
          value={sourceText}
            onChangeText={(text) => handleTranslate(text)}
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
            shadow={2}
            type="text"
            placeholder="Привіт"
          />
          <FormControl.HelperText>
            Input text to translate.
          </FormControl.HelperText>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            The input is too long.
          </FormControl.ErrorMessage>
        </FormControl>
        <Stack mx="4">
          <Box maxW="300">
            <Select
              selectedValue={translationLang}
              minWidth="200"
              accessibilityLabel="Choose Service"
              placeholder="Choose translation language"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(itemValue) => setTranslationLang(itemValue)}
            >
              {languageOptions}
            </Select>
          </Box>
        </Stack>
        <FormControl isReadOnly>
          <FormControl.Label>Translated text</FormControl.Label>
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
            shadow={2}
            value={translationText}
            type="text"
            placeholder="Hello"
          />
        </FormControl>
        <CopyButton textToCopy={translationText} />
        {favourites.some(
          (v) =>
            sourceText === v.sourceText &&
            translationText === v.translationText &&
            sourceLang === v.sourceLang &&
            translationLang === v.translationLang
        ) ? (
          <Button
            size="sm"
            variant="outline"
            colorScheme="secondary"
            isDisabled
          >
            ALREADY IN FAVOURITES
          </Button>
        ) : sourceText.trim().length &&
          translationText.trim().length &&
          sourceLang !== translationLang ? (
          <Button size="sm" variant="outline" onPress={addToFavourites}>
            ADD TO FAVOURITES
          </Button>
        ) : null}
      </Stack>
    </Box>
  );
}
