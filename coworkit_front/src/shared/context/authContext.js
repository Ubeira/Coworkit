import React from "react";
import decodeTokenData from "../utils/decodeTokenData.js";
import { useState } from "react";
import {
  login,
  recoverPasswordApi,
  resetPasswordApi,
  signUpApi,
  validateUserApi,
} from "../../http/users";
import { useHistory } from "react-router-dom";

// 1 Creamos el contexto y exportamos para usar en el hook
export const AuthContext = React.createContext();
const AuthContextProvider = AuthContext.Provider;

// 2 Recuperamos el token del localStorage
const token = localStorage.getItem("token");
const tokenObject = decodeTokenData(token);

// 3 Creamos un custom provider
export function AuthProvider({ children }) {
  const [userData, setUserData] = useState(tokenObject);
  const [isUserLogged, setIsUserLogged] = useState(!!tokenObject);
  const history = useHistory();

  // Método para hacer log in desde los componentes
  const signIn = async (email, password) => {
    const loginData = await login(email, password);

    if (loginData.status === "error") {
      return loginData;
    }
    const tokenObject = decodeTokenData(loginData);
    setUserData(tokenObject);
    setIsUserLogged(true);
    console.log(userData);
    localStorage.setItem("token", loginData);
    history.push("/");
    return tokenObject;
  };

  // Método para registrarse
  const signUp = async (registerData) => {
    const message = await signUpApi(registerData);
    console.log(message);
    return message;
  };

  // Método que borra las credenciales del localStorage y del state
  const signOut = () => {
    localStorage.removeItem("token");
    history.push("/login");
    setUserData(null);
    setIsUserLogged(false);
  };

  //Validacion de usuario
  const validateUser = async (code) => {
    const message = await validateUserApi(code);
    return message;
  };
  const [state, setState] = useState(false);
  //Recuperación de contraseña
  const recoverPassword = async (email) => {
    const data = await recoverPasswordApi(email);
    if (data.status === "ok") {
      setState(true);
      /*history.push("/");*/
    }
    return data;
  };

  const resetPassword = async (body) => {
    const message = await resetPasswordApi(body);
    return message;
  };

  /**
   * @param {String} string - endpoint del lugar de destino (ejemplo: "/login")
   * @retorn envía al usuario a la dirección del endpoint
   */
  const redirection = (string) => {
    history.push(string);
  };
  const [errorApi, setErrorApi] = useState({ message: "Lo se" });
  // 4 devolvemos el provider metiendole dentro los children
  return (
    <AuthContextProvider
      value={{
        userData,
        signIn,
        signOut,
        signUp,
        isUserLogged,
        redirection,
        validateUser,
        recoverPassword,
        resetPassword,
        state,
        setState,
        setErrorApi,
        errorApi,
      }}
    >
      {children}
    </AuthContextProvider>
  );
}
