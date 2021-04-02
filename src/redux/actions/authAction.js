import axios from "axios";
import { toast } from "react-toastify";
import { API_PATH, TOKEN_PATH } from "../../tools/constants";
import { LOGIN } from "../actionTypes";

export const loginUser = (data, history) => {
  return function (dispatch) {
    dispatch({
      type: LOGIN,
    });
    // axios({
    //   url: API_PATH + "auth/signin",
    //   method: "post",
    //   headers: {
    //     "Content-type": "application/json",
    //     Authorization: "Bearer " + localStorage.getItem("accessToken"),
    //   },
    //   data: JSON.stringify(data),
    // })
    return axios({
      url: API_PATH + "auth/signin",
      method: "post",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem(TOKEN_PATH),
      },
      data,
    })
      .then((res) => {
        localStorage.setItem(
          TOKEN_PATH,
          res.data.tokenType + " " + res.data.accessToken
        );
        dispatch({ type: LOGIN });
        
        // history.push("/admin");
        window.location.href = "/admin";
      })
      .catch((err) => {
        toast.error("Xatolik");
        dispatch({ type: LOGIN });
      });
  };
};
