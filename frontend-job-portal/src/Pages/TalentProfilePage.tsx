import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import Profile from "../Components/TalentProfile/Profile";
import RecommendTalent from "../Components/TalentProfile/RecommendTalent";
import { useEffect, useState } from "react";
import { getAllProfile } from "../Service/ProfileService";

const TalentProfilePage = () => {
    const navigate = useNavigate();
    const [talents, setTalents] = useState<any[]>([]);

    useEffect(() => {
      getAllProfile().then((res) => {
        setTalents(res);
        // console.log(res)
      }).catch((err) => console.log(err))
    }, [])

  return (
    <div className="mb-16 min-h-[90vh] p-4">
      <div 
      className="inline-block m-6">
        <Button onClick={() => navigate(-1)} leftSection={<IconArrowLeft /> } color="#FDC700" variant="light">
          {" "}
          Back
        </Button>
      </div>


      <div className="flex gap-6">
      <Profile /> 
      <RecommendTalent talents = {talents} />
      </div>
    </div>
  );
};

export default TalentProfilePage;
