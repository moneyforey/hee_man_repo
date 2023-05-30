import { createContext, useReducer } from "react";
import { login_error, login_loading, login_sucess, logout } from "./AuthTypes";
import AuthReducer from "./AuthReducer";
import { useNavigate } from "react-router-dom";
import { ToastContainer as Toaster, toast } from "react-toastify";

export const AuthContext = createContext();

const token = localStorage.getItem("token") || null;
const initAuth = {
  isLoading: false,
  isError: false,
  isAuth: false,
  token: token,
};

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(AuthReducer, initAuth);

  //function for login
  const loginFun = async (user) => {
    const { email, password } = user;
    dispatch({ type: login_loading });
    var formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("https://brainbucks.co.in/api/admin/admin-login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status == "001") {
          dispatch({ type: login_sucess, payload: result.token });
          navigate("/Home");
        } else {
          toast(result.message);
          dispatch({ type: login_error });
        }
      })
      .catch((error) => {
        toast(error);
        dispatch({ type: login_error });
      });
  };

  //function for logout
  const logoutFun = () => {
    var formdata = new FormData();
    formdata.append("token", state.token);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    fetch("https://brainbucks.co.in/api/admin/admin-logout", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "001") {
          dispatch({ type: logout });
          navigate("/");
        } else {
          toast(result.message);
        }
      })
      .catch((error) => {
        console.log("error", error);
        toast(error);
      });
  };

  return (
    <>
      <AuthContext.Provider value={{ state, loginFun, logoutFun }}>
        {children}
      </AuthContext.Provider>
      <Toaster />
    </>
  );
};
