import axios from "axios";

export const loginWithGoogle = async (credential) => {

  const res = await axios.post("http://localhost:8000/auth/google", {
    credential,
  });
  
  const { token, email, name } = res.data;

  localStorage.setItem("token", token);
  localStorage.setItem("email", email);
  localStorage.setItem("name", name);
  
  return { token, email, name };

};
