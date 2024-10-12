import { useState } from "react";
import { useAuthContext } from "./useAutContext";

export const useCSRLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (username, password) => {
    setIsLoading(true);
    setError(null); // Reset error before making the request

    try {
      const response = await fetch('http://localhost:5133/api/csr/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error || "Login failed"); // Set error message from response or fallback
        return false; // Return false to indicate failure
      }

      // Save user details in local storage if login is successful
      localStorage.setItem('user', JSON.stringify(json));

      // Dispatch login action to the auth context
      dispatch({ type: 'LOGIN', payload: json });

      setIsLoading(false);
      return true; // Return true for successful login

    } catch (err) {
      setIsLoading(false);
      setError("An unexpected error occurred"); // Set generic error message for network or server errors
      return false; // Return false for failure
    }
  };

  return { login, isLoading, error };
};
