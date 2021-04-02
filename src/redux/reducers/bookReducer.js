import { UPDATE_STATE } from "../actionTypes";

const initialState = {
  modalOpen: false,
  deleteModalOpen: false,
  isFavourite: false,
  selectedBook: null,
  selectedId: null,
  books: null,
  categoryBooks: null,
  bookImage: "",
  selectedImage: "",
  bookFile: "",
  isLoading: false,
};

export const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
