let userRole = null;

// Set user role
export const setUserRole = (role) => {
    userRole = role;
    localStorage.setItem("userRole", role); // Persist to localStorage
  };
  
  // Get user role
  export const getUserRole = () => {
    return userRole || localStorage.getItem("userRole") || ""; // Retrieve from localStorage
  };
  