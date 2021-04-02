import React from "react";
import { AvField, AvForm } from "availity-reactstrap-validation";
import { connect } from "react-redux";
import { loginUser } from "../../../redux/actions/authAction";

const Login = (props) => {
  const login = (event, values) => {
    props.loginUser(values, props.history);
  };

  return (
    <div>
      <div className="container">
        <div className="row vh-100 align-items-center">
          <div className="col-4 offset-4">
            <div className="card">
              <div className="card-body">
                <AvForm onValidSubmit={login}>
                  <AvField
                    placeholder="Foydanuvchi nomi"
                    name="username"
                    type="text"
                    required
                  />
                  <AvField
                    name="password"
                    type="password"
                    placeholder="Parolni kiriting"
                    required
                  />
                  <button
                    disabled={props.isLoading}
                    type="submit"
                    className="btn btn-success btn btn-block d-flex justify-content-center align-items-center"
                  >
                    {props.isLoading ? (
                      <span className="spinner-border spinner-border-sm mr-3"></span>
                    ) : (
                      ""
                    )}
                    <span>LOGIN</span>
                  </button>
                </AvForm>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { isLoading: state.login.isLoading };
};

export default connect(mapStateToProps, { loginUser })(Login);
