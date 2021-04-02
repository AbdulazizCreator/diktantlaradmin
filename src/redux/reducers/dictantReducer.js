import { UPDATE_STATE } from "../actionTypes";

const initialState = {
  modalOpen: false,
  deleteModalOpen: false,
  isFavourite: false,
  selectedDictant: null,
  selectedId: null,
  dictants: null,
  categoryDictants: null,
  dictantImage: "",
  selectedImage: "",
  dictantFile: "",
  isLoading: false,
  term1: [],
  term2: [],
  term3: [],
  term4: [],
};

export const dictantReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
