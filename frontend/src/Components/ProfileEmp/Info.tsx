import { useEffect, useState } from "react";
import fields from "../../Data/Profile";
import { ActionIcon } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconEdit,
  IconMapPin,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { SuccessNotification } from "../../Service/NotificationService";
import SelectInput from "./SelectInput";
import { changeEmpProfile } from "../../Slices/ProfileEmpSlice";

const Info = () => {
  const select = fields;
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profileEmp);
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
    console.log(profile)
    form.setValues({
      company: profile?.company || "",
      location: profile?.location || "",
    });
  }
}, [profile]);


  const handleSave = ( ) => {
    setEdit(false);
      let updatedProfile = { ...profile, ...form.getValues() };
      dispatch(changeEmpProfile(updatedProfile));
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
            <SelectInput form={form} name="company" {...select[1]} />
          </div>
          <div className="flex gap-10 [&>*]:w-1/2">
            <SelectInput form={form} name="location" {...select[2]} />
          </div>
        </>
      ) : (
        <>
          <div className="text-xl gap-6 flex items-center">
 <div className="flex items-center gap-1"> &bull;{"  "}
            {profile?.company}{" "}</div>           
          </div>
    <div className="flex items-center gap-1">        <IconMapPin className="h-5 w-5" stroke={1.5} />
            {profile?.location}</div> <div className="flex gap-1 items-center"> </div>

        </>
      )}
    </>
  );
};

export default Info;
