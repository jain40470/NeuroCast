import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="736092817205-bv4ntvhip37vj3o1kk9meth9mq5sisrg.apps.googleusercontent.com">
    <React.StrictMode>
      <App />
    </React.StrictMode>
   </GoogleOAuthProvider>
);
