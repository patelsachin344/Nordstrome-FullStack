import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginError, loginSuccess } from "../Features/Login/actions";

export const SignUpContex = createContext();

export const SignUpConetexProvide = ({ children }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => ({
    userData: state.loginState.userData,
  }));

  const [userLogin, setUserLogin] = useState(false);
  const handleLogin = () => {
    setUserLogin(true);
  };
  const handleMiddle = () => {
    setUserLogin(false);
  };

  const token = JSON.parse(localStorage.getItem("token")) || "";

  const autho = "Bearer " + token.token;
  // dispatch(loginLoading());

  const getUser = () => {
    if (token) {
      fetch("http://localhost:5000/users/logedin", {
        method: "GET",
        headers: {
          Authorization: autho,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          dispatch(loginSuccess(res));
        })
        .catch((err) => {
          dispatch(loginError(err));
        });
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  console.log(userData, "from context");

  return (
    <SignUpContex.Provider value={{ userLogin, handleLogin, handleMiddle }}>
      {children}
    </SignUpContex.Provider>
  );
};
