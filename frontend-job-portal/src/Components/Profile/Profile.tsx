import { Avatar, Divider, FileInput, Overlay } from "@mantine/core";

import { useDispatch, useSelector } from "react-redux";
import Info from "./Info";
import { changeProfile } from "../../Slices/ProfileSlice";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Certifications from "./Certifications";
import { useHover } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { SuccessNotification } from "../../Service/NotificationService";
import { getBase64 } from "../../Service/Utilities";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const profile = useSelector((state: any) => state.profile);

  const { hovered, ref } = useHover();

  const handleFileChange = async (image:any) => {
    let picture:any = await getBase64(image);
    let updatedProfile = { ...profile, picture: picture ? picture.split(",")[1] : null };
    dispatch(changeProfile(updatedProfile));
    SuccessNotification("Success", `Profile Picture Updated Successfully`);

  }

  return (
    <div className="w-4/5 mx-auto">
      <div className="ml-3 relative">
        <img className="rounded-t-2xl" src="/Profile/banner.jpg" alt="" />
        <div
          ref={ref}
          className="absolute -bottom-1/3 left-3 flex items-center justify-center"
        >
          <Avatar
            className="!w-48 !h-48 absolute -bottom-1/3 left-1 border-6 border-gray-700 rounded-full"
            src={profile?.picture ? `data:image/jpeg;base64, ${profile?.picture}` : "/avatar.png"}
            alt={user?.name}
          />
          {hovered && (
            <Overlay
              // color="yellow"
              className="!rounded-full"
              backgroundOpacity={0.25}
            />
          )}
          {hovered && <IconEdit className="absolute  z-[300] !w-12 !h-12" />}
          {hovered && (
            <FileInput onChange={handleFileChange}
              className="absolute [&_*]:!rounded-full z-[301] !rounded-full !w-full [&_*]:!h-full !h-full"
              variant="transparent"
              // color="yellow"
              size="lg"
              radius="xl"
              accept="image/png, image/jpeg, image/jpg"
            />
          )}
        </div>
      </div>

      <div className="px-3 mt-24">
        <Info />
      </div>

      <Divider my="xl" mx="xs" />

      <About />

      <Divider my="xl" mx="xs" />

      <Skills />

      <Divider my="xl" mx="xs" />

      <Experience />

      <Divider my="xl" mx="xs" />

      <Certifications />
    </div>
  );
};

export default Profile;
