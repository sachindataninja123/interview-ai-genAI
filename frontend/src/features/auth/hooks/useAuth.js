import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, logOut, profile, register } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login({ email, password });
      setUser(data.user);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ name, email, password }) => {
    setLoading(true);
    try {
      const data = await register({ email, password, name });
      setUser(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const data = await logOut();
      setUser(null);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getAndSetUser = async () => {
      const data = await profile();

      setUser(data.user);
    };

    getAndSetUser();
  }, []);

  return { user, loading, handleLogin, handleLogout, handleRegister };
};
