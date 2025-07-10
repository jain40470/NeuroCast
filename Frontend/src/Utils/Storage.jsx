
export const getUserFromStorage = () => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const name = localStorage.getItem("name");
    if (token && email && name) {
      return { token, email, name };
    }
    return null;
  };
  

export const saveUserToStorage = ({ token, email, name }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    localStorage.setItem("name", name);
  };
  
export const clearStorage = () => {
    localStorage.clear();
  };
  