import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import HomePage from "./HomePage";
// import ApplyJobPage from "./ApplyJobPage";
// import CompanyPage from "./CompanyPage";
// import FindJobsPage from "./FindJobsPage";
// import FindTalentsPage from "./FindTalentsPage";
// import JobDescPage from "./JobDescPage";
// import JobHistoryPage from "./JobHistoryPage";
// import PostedJobPage from "./PostedJobPage";
// import PostJobPage from "./PostJobPage";
import ProfilePage from "./ProfilePage";
import SignUpPage from "./SignUpPage";
// import TalentProfilePage from "./TalentProfilePage";
// import ProtectedRoute from "../Service/ProtectedRoute";
// import PublicRoute from "../Service/PublicRoute";
// import { useSelector } from "react-redux";

const AppRoutes = () => {

  // const user = useSelector((state: any) => state.user);

  return (
    <BrowserRouter>
      <div className="relative">
        <Header />
        <Routes>
          {/* <Route path="/find-jobs" element={<FindJobsPage />} /> */}
          {/* <Route path="/find-talent" element={<FindTalentsPage />} /> */}
          {/* <Route path="/jobs/:id" element={<JobDescPage />} /> */}
          {/* <Route path="/apply-job/:id" element={<ProtectedRoute allowedRoles={['APPLICANT']}><ApplyJobPage /></ProtectedRoute>} /> */}
          {/* <Route path="/company/:name" element={<CompanyPage />} /> */}
          {/* <Route path="/talent-profile/:id" element={<TalentProfilePage />} /> */}
          {/* <Route path="/posted-jobs/:id" element={<ProtectedRoute allowedRoles={['EMPLOYER']}><PostedJobPage /></ProtectedRoute>} /> */}
          {/* <Route path="/post-job/:id" element={<ProtectedRoute allowedRoles={['EMPLOYER']}><PostJobPage /></ProtectedRoute>} /> */}
          {/* <Route path="/job-history" element={ <ProtectedRoute allowedRoles={['APPLICANT']}><JobHistoryPage /></ProtectedRoute> } /> */}
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} /> 
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default AppRoutes;
