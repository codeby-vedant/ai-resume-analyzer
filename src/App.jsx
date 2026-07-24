import { Route, Routes } from "react-router-dom";
import LandingSection from "./pages/Landing/Landing";
import LoginPage from "./pages/Login/Login";
import SignupPage from "./pages/Signup/Signup";
import DashboardPage from "./pages/Dashboard/Dashboard";
import AnalysisPage from "./pages/Analysis/Analysis";
import ProfilePage from "./pages/Profile/Profile";
import HistoryPage from "./pages/History/History";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingSection />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/signup" element={<SignupPage />}></Route>
      <Route path="/dashboard" element={<DashboardPage />}></Route>
      <Route path="/analysis" element={<AnalysisPage />}></Route>
      <Route path="/profile" element={<ProfilePage />}></Route>
      <Route path="/history" element={<HistoryPage />}></Route>
      
      
      
    </Routes>
  );
}
