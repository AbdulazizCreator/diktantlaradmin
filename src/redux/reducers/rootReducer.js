import { combineReducers } from "redux";
import { bookCategoryReducer } from "./bookCategoryReducer";
import { loginReducer } from "./loginReducer";
import { bookReducer } from "./bookReducer";
import { dictantCategoryReducer } from "./dictantCategoryReducer";
import { dictantReducer } from "./dictantReducer";
import { guideCategoryReducer } from "./guideCategoryReducer";
import { guideReducer } from "./guideReducer";

export const allReducer = combineReducers({
  login: loginReducer,
  bookCategory: bookCategoryReducer,
  books: bookReducer,
  dictantCategory: dictantCategoryReducer,
  dictants: dictantReducer,
  guideCategory: guideCategoryReducer,
  guides: guideReducer,
});
