import { UPDATE_STATE } from "../actionTypes";

const initialState = {
  bookCategories: [],
  modalOpen: false,
  deleteModalOpen: false,
  selectedId: null,
  selectedBookCategory: null,
};

export const bookCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
