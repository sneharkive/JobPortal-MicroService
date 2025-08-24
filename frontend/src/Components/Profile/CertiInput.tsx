import { Button, TextInput } from "@mantine/core";
import SelectInput from "./SelectInput";
import fields from "../../Data/Profile";
import { MonthPickerInput } from "@mantine/dates";
import { useState } from "react";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { SuccessNotification } from "../../Service/NotificationService";

const CertiInput = (props: any) => {

  const select = fields;
  const [ issueDate, setIssueDate] = useState<Date | null>(null);
    const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();

  const form = useForm({
      mode: 'controlled',
      validateInputOnChange: true,
      initialValues: {
        name: '',
        issuer: '',
        issueDate: new Date(),
        certificateId: '',
      },
      validate:{
        name: isNotEmpty("Name is required"),
        issuer: isNotEmpty("Issuer is required"),
        issueDate: isNotEmpty("Issue date is required"),
        certificateId: isNotEmpty("Certificate ID is required"),
      }
    })
  const handleSave = () => {
    form.validate();
    if (!form.isValid()) return;

    let certi = [...profile?.certifications || []];
    certi.push(form.getValues());
    certi[certi.length - 1].issueDate = certi[certi.length - 1].issueDate.toISOString();
    let updatedProfile = { ...profile, certifications: certi }; 
    props.setEdit(false);
    dispatch(changeProfile(updatedProfile));
    SuccessNotification("Success", `Certificate Added Successfully`);
  }


  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibold">Add Certificated</div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <TextInput {...form.getInputProps("name")} label="Title" withAsterisk placeholder="Enter Title" />
        <SelectInput form={form} name="issuer" {...select[1]} />
      </div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <MonthPickerInput
        withAsterisk
        {...form.getInputProps("issueDate")}
          maxDate={new Date()}
          label="Issue Date"
          placeholder="pick date"
          value={issueDate}
          onChange={(value) => setIssueDate(value ? new Date(value) : null)}
        />
        <TextInput {...form.getInputProps("certificateId")} label="Certificate ID" withAsterisk placeholder="Enter ID" />
      </div>

      <div className="flex gap-6">
        <Button
          onClick={handleSave}
          color="green.5"
          variant="light"
        >
          Save
        </Button>
        <Button
          onClick={() => props.setEdit(false)}
          color="red"
          variant="light"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CertiInput;
