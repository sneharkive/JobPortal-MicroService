import { useEffect, useState } from "react";
import fields from "../../Data/Profile";
import { ActionIcon, Input } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconEdit,
  IconBriefcase,
  IconMapPin,
  IconCheck,
  IconX,
  IconBriefcase2,
} from "@tabler/icons-react";
import SelectInput from "./SelectInput";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { SuccessNotification } from "../../Service/NotificationService";

const Info = () => {
  const select = fields;
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);
  const user = useSelector((state: any) => state.user);
  const [edit, setEdit] = useState(false);

  const handleClick = () => {
    if (!edit) {
      setEdit(true);
      form.setValues({});
    } else {
      setEdit(false);
    }
  };

  const form = useForm({
    mode: "controlled",
    initialValues: { jobTitle: "", company: "", location: "", totalExp: "" },
  });

  useEffect(() => {
  if (profile) {
    form.setValues({
      jobTitle: profile.jobTitle || "",
      company: profile.company || "",
      location: profile.location || "",
      totalExp: profile.totalExp || "",
    });
  }
}, [profile]);


  const handleSave = ( ) => {
    setEdit(false);
      let updatedProfile = { ...profile, ...form.getValues() };
      dispatch(changeProfile(updatedProfile));
      SuccessNotification("Success", "Profile updated successfully");
  }

  return (
    <>
      <div className="text-3xl font-semibold flex justify-between">
        {user?.name}{" "}
        <div>
          {edit && <ActionIcon
            variant="subtle"
            color="#FFB900"
            aria-label="Edit"
            onClick={handleSave}
          >
            <IconCheck color="green" />
          </ActionIcon>}
          <ActionIcon
            variant="subtle"
            color="#FFB900"
            aria-label="Edit"
            onClick={handleClick}
          >
            {edit ? <IconX color="red" /> : <IconEdit />}
          </ActionIcon>
        </div>
      </div>

      {edit ? (
        <>
          <div className="flex gap-10 [&>*]:w-1/2">
            <SelectInput form={form} name="jobTitle" {...select[0]} />
            <SelectInput form={form} name="company" {...select[1]} />
          </div>
          <div className="flex gap-10 [&>*]:w-1/2">
            <SelectInput form={form} name="location" {...select[2]} />
          {/* <NumberInput label="Experience" hideControls clampBehavior="strict" /> */}
          <Input.Wrapper
  label={select[3]?.label}
>
  <Input
    type="number"
    placeholder={select[3]?.placeholder}
    {...form.getInputProps("totalExp")}
    variant="unStyled"
    classNames={{
      input:
        "bg-amber-200 focus:border-amber-300/30 border border-gray-400/10 px-2 rounded-lg",
      wrapper:
        "border border-gray-400/10 rounded-lg px-2 focus-within:border-amber-300/30 ",
    }}
  />
</Input.Wrapper>
          </div>
        </>
      ) : (
        <>
          <div className="text-xl gap-6 flex items-center">
<div className="flex items-center gap-1">
              <IconBriefcase stroke={1.5} className="h-5" />
            {profile.jobTitle}
</div> <div className="flex items-center gap-1"> &bull;{"  "}
            {profile.company}{" "}</div>           
          </div>

          <div className="text-lg flex flex-col items-start text-gary-300">
    <div className="flex items-center gap-1">        <IconMapPin className="h-5 w-5" stroke={1.5} />
            {profile.location}</div> <div className="flex gap-1 items-center"> </div>
    <div className="flex items-center gap-1"> <IconBriefcase2 className="h-5 w-5" stroke={1.5} />
          Experience: {profile.totalExp? profile.totalExp + " Years":"Freshers"} </div>
          </div>
        </>
      )}
    </>
  );
};

export default Info;
