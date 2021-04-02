import axios from "axios";
import { toast } from "react-toastify";
import { API_PATH, TOKEN_PATH } from "../../tools/constants";
import { UPDATE_STATE } from "../actionTypes";

export function updateState(data) {
  return {
    type: UPDATE_STATE,
    payload: data,
  };
}

export function addDictantCategory(data) {
  return function (dispatch) {
    axios({
      url: API_PATH + "admin/essay/category/",
      method: "post",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem(TOKEN_PATH),
      },
      data,
    }).then((res) => {
      if (res.status === 200) {
        toast.success(res.data.message);
        dispatch({
          type: UPDATE_STATE,
          payload: { modalOpen: false },
        });
        dispatch(getDictantCategories());
      } else {
        toast.error(res.data.message);
      }
    });
  };
}

export function getDictantCategories() {
  return function (dispatch) {
    axios({
      url: API_PATH + "admin/essay/category/?page=0&size=20",
      method: "get",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem(TOKEN_PATH),
      },
    }).then((res) => {
      dispatch(updateState({ dictantCategories: res.data.content }));
    });
  };
}

export function deleteDictantCategory(id) {
  return function (dispatch) {
    axios({
      url: API_PATH + "admin/essay/category/delete/" + id,
      method: "delete",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem(TOKEN_PATH),
      },
    }).then((res) => {
      if (res.status === 200) {
        toast.success(res.data.message);
        dispatch(getDictantCategories());
        dispatch({ type: UPDATE_STATE, payload: { deleteModalOpen: false } });
      } else {
        toast.error("Xatolik");
      }
    });
  };
}

export const editDictantCategory = (id, data) => {
  return (dispatch) => {
    axios({
      url: API_PATH + "admin/essay/category/edit/" + id,
      method: "put",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem(TOKEN_PATH),
      },
      data,
    }).then((res) => {
      dispatch({
        type: UPDATE_STATE,
        payload: { modalOpen: false },
      });
      dispatch(getDictantCategories());
      dispatch({ type: UPDATE_STATE, payload: { selectedDictantCategory: null } });
    });
  };
};
