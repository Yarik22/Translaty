import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("translaty.db");

// Create the 'favourites' table if it doesn't exist
db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS favourites (id INTEGER PRIMARY KEY AUTOINCREMENT, sourceText TEXT, translationText TEXT, sourceLang TEXT, translationLang TEXT);"
  );
});

export const addFavourite = (data) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "INSERT INTO favourites (sourceText, translationText, sourceLang, translationLang) VALUES (?, ?, ?, ?);",
          [
            data.sourceText,
            data.translationText,
            data.sourceLang,
            data.translationLang,
          ],
          (_, result) => resolve(result.insertId),
          (_, error) => reject(error)
        );
      },
      (error) => console.log(error)
    );
  });
};

export const getFavourites = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "SELECT * FROM favourites;",
          [],
          (_, result) => resolve(result.rows._array),
          (_, error) => reject(error)
        );
      },
      (error) => console.log(error)
    );
  });
};

export const updateFavourite = (data) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "UPDATE favourites SET sourceText=?, translationText=?, sourceLang=?, translationLang=? WHERE id=?;",
          [data.text, data.translatedText, data.language, data.id],
          (_, result) => resolve(result.rowsAffected),
          (_, error) => reject(error)
        );
      },
      (error) => console.log(error)
    );
  });
};

export const deleteFavourite = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "DELETE FROM favourites WHERE id=?;",
          [id],
          (_, result) => resolve(result.rowsAffected),
          (_, error) => reject(error)
        );
      },
      (error) => console.log(error)
    );
  });
};

export const deleteTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `DROP TABLE IF EXISTS favourites`,
      [],
      (_, result) => {
        console.log("Table deleted successfully.");
      },
      (_, error) => {
        console.error("Error deleting table:", error);
      }
    );
  });
};
