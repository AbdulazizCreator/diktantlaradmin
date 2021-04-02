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
          ? dispatch(updateState({ bookImage: res.data }))
          : dispatch(updateState({ bookFile: res.data }));
      } else {
        toast.error("Xatolik");
      }
    });
  };
}

export const addBook = (data) => {
  return (dispatch) => {
    axios({
      url: API_PATH + "admin/book/",
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
          bookImage: "",
          bookFile: "",
          isFavourite: false,
        })
      );
      dispatch(getBooks(0, 6));
    });
  };
};

export function getBooks(pageNumber, size) {
  return function (dispatch) {
    dispatch(updateState({ isLoading: true }));
    axios({
      url: API_PATH + "admin/book/?page=" + pageNumber + "&size=" + size,
      method: "get",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem(TOKEN_PATH),
      },
    }).then((res) => {
      dispatch(updateState({ books: res.data }));
      dispatch(updateState({ isLoading: false }));
    });
  };
}

export function getCategoryBooks(name, pageNumber, size) {
  return function (dispatch) {
    dispatch(updateState({ isLoading: true }));
    axios({
      url:
        API_PATH +
        "admin/book/category-name/?categoryName=" +
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
      dispatch(updateState({ categoryBooks: res.data }));
      dispatch(updateState({ isLoading: false }));
    });
  };
}

export function deleteBook(book) {
  return function (dispatch) {
    axios({
      url: API_PATH + "admin/book/delete/" + book.id,
      method: "delete",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem(TOKEN_PATH),
      },
    }).then((res) => {
      if (res.status === 200) {
        toast.success("Kitob o'chirildi");
        dispatch(deleteFile(book.imageId));
        dispatch(deleteFile(book.pdfId));
        dispatch(getBooks(0, 6));
      } else {
        toast.error(res.data.message);
      }
    });
  };
}

export const editBook = (book, data) => {
  return (dispatch) => {
    axios({
      url: API_PATH + "admin/book/edit/" + book.id,
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
        dispatch(getBooks(0, 6));
        dispatch({ type: UPDATE_STATE, payload: { selectedBook: null } });
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
