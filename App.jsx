import { AppRegistry, LogBox } from "react-native";
import Router from "./Router";
import { useEffect } from "react";
import {
  addFavourite,
  deleteFavourite,
  deleteTable,
  getFavourites,
  updateFavourite,
} from "./data/useFavouriteTable";
import useFavouriteStore from "./store/favourites/useFavouriteStore";
import { NativeBaseProvider } from "native-base";

const favourite = {
  sourceText: "Hello",
  translationText: "Hallo",
  sourceLang: "en",
  translationLang: "de",
};

export default function App() {
  const setFavourites = useFavouriteStore((state) => state.setFavourites);
  useEffect(() => {
    LogBox.ignoreLogs([
      "In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.",
    ]);
    // Add a new favourite
    // addFavourite(favourite)
    //   .then((id) => console.log("New favourite ID:", id))
    //   .catch((error) => console.log("Error adding favourite:", error));

    // Get all favourites
    getFavourites()
      .then((favourites) => setFavourites(favourites))
      .catch((error) => console.log("Error getting favourites:", error));

    // setFavourites(favourites);
    // Update a favourite
    // updateFavourite(1, "Updated Text", "Updated Translated Text", "Spanish")
    //   .then((rowsAffected) =>
    //     console.log("Updated favourite. Rows affected:", rowsAffected)
    //   )
    //   .catch((error) => console.log("Error updating favourite:", error));

    // deleteTable();
    // Delete a favourite
    // deleteFavourite(2)
    //   .then((rowsAffected) =>
    //     console.log("Deleted favourite. Rows affected:", rowsAffected)
    //   )
    //   .catch((error) => console.log("Error deleting favourite:", error));
  }, []);
  return (
    <NativeBaseProvider>
      <Router />
    </NativeBaseProvider>
  );
}

AppRegistry.registerComponent("Translaty", () => App);
