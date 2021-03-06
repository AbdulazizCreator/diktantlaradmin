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

export function saveFile(data, check, guideAudio) {
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
        if (check === "image") dispatch(updateState({ guideImage: res.data }));
        if (check === "file") dispatch(updateState({ guideFile: res.data }));
        if (check === "audio")
          dispatch(
            updateState({
              guideAudio: [...guideAudio, res.data],
              audioSave: true,
            })
          );
      } else {
        toast.error("Xatolik");
      }
    });
  };
}

export function saveAudio(data, check) {
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
          ? dispatch(updateState({ guideImage: res.data }))
          : dispatch(updateState({ guideFile: res.data }));
      } else {
        toast.error("Xatolik");
      }
    });
  };
}

export const addGuide = (data) => {
  return (dispatch) => {
    axios({
      url: API_PATH + "admin/course/",
      method: "post",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem(TOKEN_PATH),
      },
      data,
    }).then((res) => {
      console.log(res);
      dispatch(
        updateState({
          modalOpen: false,
          guideImage: "",
          guideFile: "",
          isFavourite: false,
        })
      );
      dispatch(getGuides(0, 6));
    });
  };
};

export function getGuides(pageNumber, size) {
  return function (dispatch) {
    dispatch(updateState({ isLoading: true }));
    axios({
      url: API_PATH + "admin/course/?page=" + pageNumber + "&size=" + size,
      method: "get",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem(TOKEN_PATH),
      },
    }).then((res) => {
      dispatch(updateState({ guides: res.data }));
      dispatch(updateState({ isLoading: false }));
    });
  };
}

export function getCategoryGuides(name, pageNumber, size) {
  return function (dispatch) {
    dispatch(updateState({ isLoading: true }));
    axios({
      url:
        API_PATH +
        "admin/course/category-name/?categoryName=" +
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
      dispatch(updateState({ categoryGuides: res.data }));
      dispatch(updateState({ isLoading: false }));
    });
  };
}

export function deleteGuide(guide) {
  return function (dispatch) {
    axios({
      url: API_PATH + "admin/course/delete/" + guide.id,
      method: "delete",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem(TOKEN_PATH),
      },
    }).then((res) => {
      console.log(res);
      if (res.status === 200) {
        toast.success("Kitob o'chirildi");
        dispatch(deleteFile(guide.imageId));
        dispatch(deleteFile(guide.pdfId));
        dispatch(getGuides(0, 6));
      } else {
        toast.error(res.data.message);
      }
    });
  };
}

export const editGuide = (guide, data) => {
  return (dispatch) => {
    axios({
      url: API_PATH + "admin/course/edit/" + guide.id,
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
        dispatch(getGuides(0, 6));
        dispatch({ type: UPDATE_STATE, payload: { selectedGuide: null } });
      } else {
        toast.error("Xatolik");
      }
    });
  };
};

export const deleteFile = (id) => {
  return (dispatch) => {
    axios({
      url: API_PATH + "admin/file/delete/" + id,
      method: "delete",
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
