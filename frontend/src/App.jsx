import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";

function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();
  console.log({onlineUsers});
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin h-10 w-10" />
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <Navbar />

      <div className="mt-12">
        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/sign-in" />}
          />

          <Route
            path="/sign-up"
            element={authUser ? <Navigate to="/" /> : <SignUpPage />}
          />
          <Route
            path="/sign-in"
            element={authUser ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route
            path="/settings"
            element={authUser ? <SettingsPage /> : <Navigate to="/sign-in" />}
          />
          <Route
            path="/profile"
            element={authUser ? <ProfilePage /> : <Navigate to="/sign-in" />}
          />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
}
export default App;
