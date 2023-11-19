import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

import { authServiceFactory } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useLocalStorage("auth", {});
  const navigate = useNavigate();

  const authService = authServiceFactory(auth.accessToken);

  const onLoginSubmit = async (data) => {
    try {
      const result = await authService.login(data);

      setAuth(result);

      navigate("/");
    } catch (error) {
      console.log("Unsuccessful login!");
    }
  };

  const onRegisterSubmit = async (data) => {
    if (!data.email || !data.password || !data.rePassword) {
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

      navigate("/");
    } catch (error) {
      throw new Error(error);
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

/*
// ... (previous code)

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useLocalStorage("auth", {});
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState(""); // New state for the user's name
  const navigate = useNavigate();

  const authService = authServiceFactory(auth.accessToken);

  const onLoginSubmit = async (data) => {
    try {
      setIsLoading(true);
      const result = await authService.login(data);
      setAuth(result);
      setUserName(result.name); // Set the user's name upon successful login
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      alert("Unsuccessful login. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const onRegisterSubmit = async (data) => {
    // ... (previous code)

    try {
      setIsLoading(true);
      const result = await authService.register(data);
      setAuth(result);
      setUserName(result.name); // Set the user's name upon successful registration
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // ... (remaining code)

  const contextValues = {
    onLoginSubmit,
    onRegisterSubmit,
    onLogout,
    userId: auth._id,
    token: auth.accessToken,
    userEmail: auth.email,
    isAuthenticated: !!auth.accessToken,
    userName, // Include the user's name in the context
  };

  return <AuthContext.Provider value={contextValues}>{children}</AuthContext.Provider>;
};

// ... (remaining code)
*/