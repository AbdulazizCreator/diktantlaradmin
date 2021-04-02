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

export function addGuideCategory(data) {
  return function (dispatch) {
    axios({
      url: API_PATH + "admin/course/category/",
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
        dispatch(getGuideCategories());
      } else {
        toast.error(res.data.message);
      }
    });
  };
}

export function getGuideCategories() {
  return function (dispatch) {
    axios({
      url: API_PATH + "admin/course/category/?page=0&size=20",
      method: "get",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem(TOKEN_PATH),
      },
    }).then((res) => {
      dispatch(updateState({ guideCategories: res.data.content }));
    });
  };
}

export function deleteGuideCategory(id) {
  return function (dispatch) {
    axios({
      url: API_PATH + "admin/course/category/delete/" + id,
      method: "delete",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem(TOKEN_PATH),
      },
    }).then((res) => {
      if (res.status === 200) {
        toast.success(res.data.message);
        dispatch(getGuideCategories());
        dispatch({ type: UPDATE_STATE, payload: { deleteModalOpen: false } });
      } else {
        toast.error("Xatolik");
      }
    });
  };
}

export const editGuideCategory = (id, data) => {
  return (dispatch) => {
    axios({
      url: API_PATH + "admin/course/category/edit/" + id,
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
      dispatch(getGuideCategories());
      dispatch({
        type: UPDATE_STATE,
        payload: { selectedGuideCategory: null },
      });
    });
  };
};
