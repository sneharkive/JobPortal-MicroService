import { Avatar, Divider, FileInput, Overlay } from "@mantine/core";

import { useDispatch, useSelector } from "react-redux";
import Info from "./Info";
import { changeProfile } from "../../Slices/ProfileSlice";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Certifications from "./Certifications";
import { useHover } from "@mantine/hooks";
import {
  IconCamera,
  IconEdit,
  IconFileCvFilled,
  IconFileDownloadFilled,
  IconTrash,
} from "@tabler/icons-react";
import { SuccessNotification } from "../../Service/NotificationService";
import { getBase64 } from "../../Service/Utilities";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const profile = useSelector((state: any) => state.profile);

  const { hovered, ref } = useHover();

  const handleProfilePicChange = async (image: any) => {
    console.log(profile);
    let profilePicture: any = await getBase64(image);
    let updatedProfile = {
      ...profile,
      profilePicture: profilePicture ? profilePicture.split(",")[1] : null,
    };
    dispatch(changeProfile(updatedProfile));
    SuccessNotification("Success", `Profile Picture Updated Successfully`);
  };
  const handleCoverPicChange = async (image: any) => {
    console.log(profile);
    let coverPicture: any = await getBase64(image);
    let updatedProfile = {
      ...profile,
      coverPicture: coverPicture ? coverPicture.split(",")[1] : null,
    };
    dispatch(changeProfile(updatedProfile));
    SuccessNotification("Success", `Profile Picture Updated Successfully`);
  };

  const handleResumeChange = async (file: any) => {
    if (!file) return;
    let resume: any = await getBase64(file);
    let updatedProfile = {
      ...profile,
      resume: resume ? resume.split(",")[1] : null,
    };
    dispatch(changeProfile(updatedProfile));
    SuccessNotification("Success", `Resume Uploaded Successfully`);
  };

  return (
    <div className="w-4/5 mx-auto">
      <div className="ml-3 relative">
        <div className="rounded-t-2xl w-full h-60" ref={ref}>
          <img
            className="h-full overflow-y-hidden w-full"
            src={
              profile?.coverPicture
                ? `data:image/jpeg;base64, ${profile?.coverPicture}`
                : "/Profile/banner.jpg"
            }
            alt={user?.name}
          />

          <div className="absolute right-1 top-48 z-[300] w-12 h-12 flex items-center justify-center">
            <IconCamera className="!w-10 !h-10 pointer-events-none" />

            {/* Invisible file input over the camera icon */}
            <FileInput
              onChange={handleCoverPicChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              variant="transparent"
              accept="image/png, image/jpeg, image/jpg"
            />
          </div>
        </div>

        <div
          ref={ref}
          className="absolute -bottom-2/6 left-2 flex items-center justify-center"
        >
          <Avatar
            className="!w-48 !h-48 absolute -bottom-1/3 left-1 border-6 border-gray-700 rounded-full"
            src={
              profile?.profilePicture
                ? `data:image/jpeg;base64, ${profile?.profilePicture}`
                : "/avatar.png"
            }
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
            <FileInput
              onChange={handleProfilePicChange}
              className="absolute [&_*]:!rounded-full z-[301] !rounded-full !w-full [&_*]:!h-full !h-full"
              variant="transparent"
              // color="yellow"
              size="lg"
              radius="xl"
              accept="image/png, image/jpeg, image/jpg"
            />
          )}
        </div>

        {/* Resume upload & download section */}
        <div className="absolute right-1 top-68 z-[300] flex items-center space-x-4">
          {/* Upload Resume */}
          <div className="relative w-12 h-12 flex items-center justify-center">
            <IconFileCvFilled
              color={profile?.resume ? "#FF9000" : "white"}
              className="!w-12 !h-12 pointer-events-none"
            />
            <FileInput
              onChange={handleResumeChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              variant="transparent"
              accept=".pdf"
            />
          </div>

          {/* Download Resume (only if exists) */}
          {profile?.resume && (
            <a
              href={`data:application/pdf;base64,${profile.resume}`}
              download={profile.name + "_Resume.pdf"}
              // download="resume.pdf"
              className="w-12 h-12 flex items-center justify-center"
            >
              <IconFileDownloadFilled color="#FF9000" className="!w-12 !h-12" />
            </a>
          )}

          {/* Delete Resume (only if exists) */}
          {profile?.resume && (
            <button
              onClick={() => {
                let updatedProfile = { ...profile, resume: null };
                dispatch(changeProfile(updatedProfile));
                SuccessNotification("Success", "Resume Removed Successfully");
              }}
              className="w-12 h-12 flex items-center justify-center"
            >
              <IconTrash color="red" className="!w-10 !h-10" />
            </button>
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
