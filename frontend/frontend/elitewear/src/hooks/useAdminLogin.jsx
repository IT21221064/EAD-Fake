import { useState } from "react";
import { useAuthContext } from "./useAutContext";

export const useAdminLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();
  
    const login = async (username, password) => {
      setIsLoading(true);
      setError(null); // Reset error before making the request
  
      try {
        const response = await fetch("http://localhost:5133/api/admin/login", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
  
        const json = await response.json();
  
        if (!response.ok) {
          setIsLoading(false);
          setError(json.error || "Login failed"); // Set the error message from the response or fallback
          return false; // Return false for login failure
        }
  
        // Save user details in local storage if login is successful
        localStorage.setItem('user', JSON.stringify(json));
  
        // Dispatch login action to the auth context
        dispatch({ type: 'LOGIN', payload: json });
  
        setIsLoading(false);
        return true; // Return true for login success
  
      } catch (err) {
        setIsLoading(false);
        setError("An unexpected error occurred"); // Set generic error message for network or server errors
        return false; // Return false for login failure
      }
    };
  
    return { login, isLoading, error };
  };
  
