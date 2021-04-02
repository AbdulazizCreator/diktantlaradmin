import { UPDATE_STATE } from "../actionTypes";

const initialState = {
  dictantCategories: [],
  modalOpen: false,
  deleteModalOpen: false,
  selectedId: null,
  selectedDictantCategory: null,
};

export const dictantCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
