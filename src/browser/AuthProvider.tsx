import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../components/configs/usersSlice";
import { getCurrentUser } from "../auth";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const data = await getCurrentUser();
        dispatch(setUser(data));
      } catch (err) {
        // Handle authentication error, e.g., redirect to login page
        console.error("Authentication error:", err);
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, [dispatch]);

  if (loading) {
    // Optionally, you can render a loading spinner or message here
    return null;
  }

  return <>{children}</>;
};

export default AuthProvider;
