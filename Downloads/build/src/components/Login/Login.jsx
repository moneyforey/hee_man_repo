import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../Img/logo.png";
import { AuthContext } from "../Utils/AuthContextProvider";
import { Spinner } from "react-bootstrap";

const initUser = {
  email: "",
  password: "",
};
function Login() {
  const { state, loginFun } = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(initUser);
  const { email, password } = user;
  const { isLoading, isError } = state;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const CheckToken = async (Token) => {
    var formdata = new FormData();
    formdata.append("token", Token);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("https://brainbucks.co.in/api/admin/check-token", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status == 1) {
          navigate("/Home");
        } else {
          navigate("/");
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    } else {
      CheckToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-3"></div>
        <div className="col-md-6">
          <div
            className="card"
            style={{ marginTop: "5rem", background: "rgb(249 249 249)" }}
          >
            <div className="Auth-form-container p-5">
              <div className="Auth-form-content">
                <div className="text-center mb-3">
                  <img src={Logo} alt="#" width={"50%"} />
                </div>

                <div className="text-center" style={{ fontSize: "20px" }}>
                  Login
                </div>
                <div className="form-group mt-4">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control mt-1"
                    placeholder="Enter Your Email"
                    name="email"
                    onChange={handleChange}
                    value={email}
                  />
                </div>
                <div className="form-group mt-4">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control mt-1"
                    placeholder="Enter Password"
                    onChange={handleChange}
                    value={password}
                  />
                </div>
                <div className="d-grid gap-2 mt-4">
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="btn btn-primary"
                    onClick={() => loginFun(user)}
                  >
                    {isLoading ? <Spinner /> : "Login"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
