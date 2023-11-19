import { create } from "zustand";
const useFavouriteStore = create((set) => ({
  favourites: [],
  setFavourites: (payload) =>
    set((state) => ({
      favourites: payload,
    })),
  addFavourite: (payload) =>
    set((state) => ({
      favourites: [...state.favourites, payload],
    })),
  deleteFavourite: (id) =>
    set((state) => ({
      favourites: state.favourites.filter((item) => item.id !== id),
    })),
}));
export default useFavouriteStore;
