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

export function saveFile(data, check) {
  let file = new FormData();
  file.append("multipartFile", data);
  return function (dispatch) {
    axios({
      url: API_PATH + "admin/file/",
      method: "post",
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: localStorage.getItem(TOKEN_PATH),
      },
      data: file,
    }).then((res) => {
      if (res.status === 200) {
        check === "image"
          ? dispatch(updateState({ dictantImage: res.data }))
          : dispatch(updateState({ dictantFile: res.data }));
      } else {
        toast.error("Xatolik");
      }
    });
  };
}

export const addDictant = (data) => {
  return (dispatch) => {
    axios({
      url: API_PATH + "admin/essay/",
      method: "post",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem(TOKEN_PATH),
      },
      data,
    }).then((res) => {
      dispatch(
        updateState({
          modalOpen: false,
          dictantImage: "",
          dictantFile: "",
          isFavourite: false,
        })
      );
      dispatch(getDictants(0, 6));
    });
  };
};

export function getDictants(pageNumber, size) {
  return function (dispatch) {
    dispatch(updateState({ isLoading: true }));
    axios({
      url: API_PATH + "admin/essay/?page=" + pageNumber + "&size=" + size,
      method: "get",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem(TOKEN_PATH),
      },
    }).then((res) => {
      dispatch(updateState({ dictants: res.data }));
      dispatch(updateState({ isLoading: false }));
    });
  };
}

export function getCategoryDictants(name, pageNumber, size) {
  return function (dispatch) {
    dispatch(updateState({ isLoading: true }));
    axios({
      url:
        API_PATH +
        "admin/essay/category-name/?categoryName=" +
        name +
        "&page=" +
        pageNumber +
        "&size=" +
        size,
      method: "get",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem(TOKEN_PATH),
      },
    }).then((res) => {
      dispatch(updateState({ categoryDictants: res.data }));
      dispatch(updateState({ isLoading: false }));
    });
  };
}

export function deleteDictant(dictant) {
  return function (dispatch) {
    axios({
      url: API_PATH + "admin/essay/delete/" + dictant.id,
      method: "delete",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem(TOKEN_PATH),
      },
    }).then((res) => {
      if (res.status === 200) {
        toast.success("Diktant o'chirildi");
        dispatch(deleteFile(dictant.imageId));
        dispatch(deleteFile(dictant.pdfId));
        dispatch(getDictants(0, 6));
      } else {
        toast.error(res.data.message);
      }
    });
  };
}

export const editDictant = (dictant, data) => {
  return (dispatch) => {
    console.log(data);
    axios({
      url: API_PATH + "admin/essay/edit/" + dictant.id,
      method: "put",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem(TOKEN_PATH),
      },
      data,
    }).then((res) => {
      if (res.status === 200) {
        dispatch({
          type: UPDATE_STATE,
          payload: { modalOpen: false },
        });
        dispatch(getDictants(0, 6));
        dispatch({ type: UPDATE_STATE, payload: { selectedDictant: null } });
      } else {
        toast.error("Xatolik");
      }
    });
  };
};

export const deleteFile = (id) => {
  return (dispatch) => {
    axios({
      url: API_PATH + "admin/file/" + id,
      method: "post",
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: localStorage.getItem(TOKEN_PATH),
      },
    }).then((res) => {
      if (res.status === 200) {
        toast.success("Rasm o'chirildi");
      }
    });
  };
};
