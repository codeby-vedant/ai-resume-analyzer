import { Route, Routes } from "react-router-dom";
import LandingSection from "./pages/Landing/Landing";
import LoginPage from "./pages/Login/Login";
import SignupPage from "./pages/Signup/Signup";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingSection />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/signup" element={<SignupPage />}></Route>
    </Routes>
  );
}
