"use client";

export default function LogoutButton() {
  const handleLogout = () => {
    // Clear auth data from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    
    // Clear auth cookie
    document.cookie = "authToken=; path=/; max-age=0";
    
    // Redirect to login
    window.location.href = "/auth/login";
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full text-left hover:text-blue-600 transition font-medium text-sm px-4 py-3 rounded-lg hover:bg-gray-100"
    >
      Admin <span className="text-xs text-gray-400">(Logout)</span>
    </button>
  );
}
