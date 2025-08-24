import { Button, Divider } from "@mantine/core";
import { IconBriefcase, IconMapPin } from "@tabler/icons-react";
import ExpCard from "./ExpCard";
import CertiCard from "./CertiCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfile } from "../../Service/ProfileService";

const Profile = (props: any) => {

  const {id} = useParams();
  const [profile, setProfile] = useState<any>({})

  useEffect(() => {
    window.scrollTo(0, 0)
    getProfile(id).then((res) => {
      setProfile(res);
      
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }, [id])

  return (
    <div className="w-2/3">
      <div className="ml-3 relative">
        <img className="rounded-t-2xl" src="/Profile/banner.jpg" alt="" />
        <img
          className="w-48 h-48 absolute -bottom-1/3 left-3 border-6 border-gray-700 rounded-full"
          src={profile.picture ? `data:image/jpeg;base64, ${profile.picture}` : "/avatar.png"} alt=""
          // alt={profile.name} 
        />
      </div>

      <div className="px-3 mt-16">
        <div className="text-3xl font-semibold flex justify-between">
          {/* {profile?.name}{" "} */}
          <Button color="#FDC30D" variant="light">
            Message
          </Button>
        </div>

        <div className="text-xl gap-1 flex items-center">
          {" "}
          <IconBriefcase stroke={1.5} className="h-5" /> {profile?.jobTitle}
          &bull; {profile?.company}{" "}
        </div>

        <div className="text-lg flex gap-1 items-center text-gary-300">
          {" "}
          <IconMapPin className="h-5 w-5" stroke={1.5} /> {profile?.location}{" "}
        </div>
      </div>

      <Divider my="xl" mx="xs" />

      <div className="px-3">
        <div className="text-2xl font-semibold mb-3">About</div>
        <div className="text-sm text-gray-300 text-justify">{profile?.about}</div>
      </div>

      <Divider my="xl" mx="xs" />

      <div className="px-3">
        <div className="text-2xl font-semibold mb-3">Skills</div>
        <div className="flex flex-wrap gap-2">
          {profile?.skills?.map((skill: any, index: any) => (
            <div
              key={index}
              className="bg-amber-100/15 px-4 py-1 rounded-3xl text-amber-500"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>

      <Divider my="xl" mx="xs" />

      <div className="px-3">
        <div className="text-2xl font-semibold mb-5">Experience</div>
        {profile?.experiences?.map((ex: any, index: any) => (
          <ExpCard key={index} {...ex} />
        ))}
      </div>

      <Divider my="xl" mx="xs" />

      <div className="px-3">
        <div className="text-2xl font-semibold mb-5">Certifications</div>
        {profile?.certifications?.map((ex: any, index: any) => (
          <CertiCard key={index} {...ex} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
