import { useSelector } from "react-redux";
import Profile from "../Components/Profile/Profile";
import ProfileEmp from "../Components/ProfileEmp/ProfileEmp";

const ProfilePage = () => {

  const user = useSelector((state: any) => state.user);

  return (
    <div className="mb-16 min-h-[90vh] p-4">
      {user.accountType == "APPLICANT" ? <Profile/> : <ProfileEmp />}
    </div>
  );
};

export default ProfilePage;
