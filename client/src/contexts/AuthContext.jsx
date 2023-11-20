import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

import { authServiceFactory } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useLocalStorage("auth", {});
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const authService = authServiceFactory(auth.accessToken);

  const onLoginSubmit = async (data) => {
    try {
      const result = await authService.login(data);

      setAuth(result);
      setUsername(result.username);

      navigate("/");
    } catch (error) {
      console.log("Unsuccessful login!");
      alert("Unsuccessful login. Please check your credentials.");
    }
  };

  const onRegisterSubmit = async (data) => {
    if (!data.email || !data.username || !data.password || !data.rePassword) {
      alert("All fields are required!");
      return;
    }
    if (data.password !== data.rePassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const result = await authService.register(data);

      setAuth(result);
      setUsername(result.username);

      navigate("/");
    } catch (error) {
      console.log("Unsuccessful registration!");
      alert("Registration failed. Please try again.");
    }
  };

  const onLogout = async () => {
    await authService.logout();

    setAuth({});
  };

  const contextValues = {
    onLoginSubmit,
    onRegisterSubmit,
    onLogout,
    userId: auth._id,
    token: auth.accessToken,
    userEmail: auth.email,
    isAuthenticated: !!auth.accessToken,
    username,
  };

  return (
    <>
      <AuthContext.Provider value={contextValues}>{children}</AuthContext.Provider>
    </>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  return context;
};
