import { UPDATE_STATE } from "../actionTypes";

const initialState = {
  modalOpen: false,
  deleteModalOpen: false,
  isFavourite: false,
  selectedGuide: null,
  selectedId: null,
  guides: null,
  categoryGuides: null,
  guideImage: "",
  selectedImage: "",
  audioList: [],
  creatorList: [],
  textList: [],
  guideFile: "",
  guideAudio: [],
  isLoading: false,
  orderNumber: 0,
  audioSave: false,
};

export const guideReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
