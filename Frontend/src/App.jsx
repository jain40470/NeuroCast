import React, { useState, useEffect } from "react";
import Navbar from "./Components/Home/Navbar";
import Home from "./Components/Home/Home";
import { loginWithGoogle } from "./Services/authService";
import { getUserFromStorage, clearStorage, saveUserToStorage } from "./utils/storage";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({ name: "", description: "" });
  const [geminiKeyInput, setGeminiKeyInput] = useState(null); // null means no key saved

  useEffect(() => {
    const existingUser = getUserFromStorage();
    if (existingUser) {
      setUser(existingUser);
      loadProfile();
    }
  }, []);

  const loadProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProfile({
        name: res.data.name || "",
        description: res.data.description || "",
      });

      // Infer gemini key presence
      if (res.data.has_gemini_key) {
        setGeminiKeyInput("*****");
      } else {
        setGeminiKeyInput("");
      }
    } catch {
      alert("Error loading profile");
    }
  };

  const handleLogin = async (response) => {
    try {
      const userData = await loginWithGoogle(response.credential);
      setUser(userData);
      saveUserToStorage(userData);
      loadProfile();
    } catch {
      alert("Login failed");
    }
  };

  const handleLogout = () => {
    clearStorage();
    setUser(null);
    setProfile({ name: "", description: "" });
    setGeminiKeyInput(null);
  };

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const data = {
        name: profile.name,
        description: profile.description,
      };

      // Send gemini key only if changed and not masked placeholder
      if (geminiKeyInput && geminiKeyInput !== "*****") {
        data.gemini_key = geminiKeyInput;
      }

      await axios.post("http://localhost:8000/profile", data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setGeminiKeyInput("*****");
      alert("Profile saved!");
    } catch {
      alert("Error saving profile");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        profile={profile}
        onProfileChange={setProfile}
        geminiKeyInput={geminiKeyInput}
        setGeminiKeyInput={setGeminiKeyInput}
        onSaveProfile={handleSaveProfile}
      />
      <main className="flex-grow flex items-center justify-center">
        <Home />
      </main>
    </div>
  );
}

export default App;
