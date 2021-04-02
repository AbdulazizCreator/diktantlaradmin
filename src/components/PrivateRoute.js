import React from "react";
import Notfound from "./Notfound";
import {TOKEN_PATH} from "../tools/constants";
import { Route } from "react-router-dom";

const PrivateRoute = (props) => {
  return localStorage.getItem(TOKEN_PATH) ? (
    <Route component={props.component} path={props.path} exact={props.exact} />
  ) : (
    <Route component={Notfound} />
   //  <Redirect to='/login'/>
  );
};

export default PrivateRoute;
