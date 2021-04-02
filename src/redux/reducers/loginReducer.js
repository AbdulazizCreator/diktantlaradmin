import { LOGIN } from "../../redux/actionTypes";

const initialState = {
  isLoading: false,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { isLoading: !state.isLoading };
    default:
      return state;
  }
};
