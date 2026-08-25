import { Route, Routes } from "react-router-dom";
import LandingSection from "./pages/Landing/Landing";
import LoginPage from "./pages/Login/Login";
import SignupPage from "./pages/Signup/Signup";
import DashboardPage from "./pages/Dashboard/DashBoard";
import AnalysisPage from "./pages/Analysis/Analysis";
import ProfilePage from "./pages/Profile/Profile";
import HistoryPage from "./pages/History/History";
import ForgetPassword from "./pages/forget-password/forget-password";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ViewAnalysisPage from "./pages/ViewAnalysis/ViewAnalysis";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingSection />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/signup" element={<SignupPage />}></Route>
      <Route path="/dashboard" element={<DashboardPage />}></Route>
      <Route path="/analysis/:resumeId" element={<AnalysisPage />}></Route>
      <Route path="/profile" element={<ProfilePage />}></Route>
      <Route path="/history" element={<HistoryPage />}></Route>
      <Route path="/forgetPassword" element={<ForgetPassword />}></Route>
      <Route path="/reset/:resetToken" element={<ResetPassword />}></Route>
      <Route path="/viewAnalysis/:resumeId" element={<ViewAnalysisPage />}></Route>
      
      
      
    </Routes>
  );
}
