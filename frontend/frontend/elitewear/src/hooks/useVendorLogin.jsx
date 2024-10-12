import { useState } from "react";
import { useAuthContext } from "./useAutContext";

export const useVendorLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Set initial loading state to false
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true); // Set loading to true
    setError(null); // Reset any previous errors

    try {
      const response = await fetch('http://localhost:5133/api/vendor/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error); // Set error if response is not ok
        return false;
      } else {
        localStorage.setItem('user', JSON.stringify(json)); // Store user data in local storage

        dispatch({ type: 'LOGIN', payload: json }); // Dispatch login action

        // Optionally, you can navigate or set the user role here if needed
        // Example:
        return true;
        // const role = "vendor"; // Or fetch from response
        // setUserRole(role); // Set global user role
      }
    } catch (err) {
      setError("An unexpected error occurred."); // Handle unexpected errors
    } finally {
      setIsLoading(false); // Set loading to false regardless of success or failure
    }
  };

  return { login, isLoading, error }; // Return login function, loading state, and error
};
