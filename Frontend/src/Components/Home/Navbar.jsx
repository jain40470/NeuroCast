import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

function Navbar({
  user,
  onLogin,
  onLogout,
  profile,
  onProfileChange,
  geminiKeyInput,
  setGeminiKeyInput,
  onSaveProfile,
}) {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const handleChange = (field, value) => {
    onProfileChange({ ...profile, [field]: value });
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center relative">
      <h1 className="text-xl font-bold">NeuroCast</h1>

      {user ? (
        <div className="flex items-center space-x-4">
          <span>Hi, {user.name || user.email}</span>

          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
            >
              Profile ▼
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-72 bg-white border rounded shadow-lg p-4 z-50">
                <input
                  className="w-full p-2 mb-2 border rounded"
                  placeholder="Name"
                  value={profile.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
                <textarea
                  className="w-full p-2 mb-2 border rounded"
                  placeholder="Description"
                  value={profile.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />

                <input
                  type="password"
                  className="w-full p-2 mb-2 border rounded"
                  placeholder={
                    geminiKeyInput === "*****"
                      ? "*****"
                      : "Pls enter gemini key"
                  }
                  value={geminiKeyInput || ""}
                  onChange={(e) => setGeminiKeyInput(e.target.value)}
                />

                <button
                  onClick={() => {
                    onSaveProfile();
                    setShowDropdown(false);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                >
                  Save Profile
                </button>
              </div>
            )}
          </div>

          <button
            onClick={onLogout}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      ) : (
        <GoogleLogin
          onSuccess={onLogin}
          onError={() => alert("Login Failed")}
          useOneTap
        />
      )}
    </nav>
  );
}

export default Navbar;
