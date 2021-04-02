import { UPDATE_STATE } from "../actionTypes";

const initialState = {
  guideCategories: [],
  modalOpen: false,
  deleteModalOpen: false,
  selectedId: null,
  selectedGuideCategory: null,
};

export const guideCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
