import { useEffect } from "react";
import SelectInput from "./SelectInput";
import fields from "../../Data/Profile";
import { Button, Checkbox, Textarea } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { useDispatch, useSelector } from "react-redux";
import { isNotEmpty, useForm } from "@mantine/form";
import { SuccessNotification } from "../../Service/NotificationService";
import { changeProfile } from "../../Slices/ProfileSlice";

const ExpInput = (props: any) => {
  const select = fields;
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!props.add) form.setValues({
      title: props.title || "",
      company: props.company || "",
      location: props.location || "",
      description: props.description || "",
      startDate: props.startDate ? new Date(props.startDate) : new Date(),
      endDate: props.endDate ? new Date(props.endDate) : new Date(),
      working: props.working || false
    });
  }, []);

  const form = useForm({
    mode: 'controlled',
    validateInputOnChange: true,
    initialValues: {
      title: '',
      company: '',
      location: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(),
      working: false
    },
    validate:{
      title: isNotEmpty("Title is required"),
      company: isNotEmpty("Company is required"),
      location: isNotEmpty("Location is required"),
      description: isNotEmpty("Description is required"),
    }
  })


  // const handleSave =() => {
  //   form.validate();
  //   if(!form.isValid()) return;
  //   let exp = [...profile.experiences];
  //   if (props.add) {
  //     exp.push(form.getValues());
  //     exp[exp.length - 1].startDate = exp[exp.length - 1].startDate.toISOString();
  //     exp[exp.length - 1].endDate = exp[exp.length - 1].endDate.toISOString();
  //   } else {
  //     exp[props.index] = form.getValues();
  //     exp[props.index].startDate = exp[props.index].startDate.toISOString();
  //     exp[props.index].endDate = exp[props.index].endDate.toISOString();
  //   }
  //   let updatedProfile = { ...profile, experiences: exp };
  //   props.setEdit(false);
  //   dispatch(changeProfile(updatedProfile));
  //   SuccessNotification("Success", `Experience ${props.add ? "Added" : "Updated"} Successfully`);
  // }


  const handleSave = () => {
  form.validate();
  if (!form.isValid()) return;

  let exp = [...profile.experiences];
  const values = form.getValues();

  // Create a new object with ISO string dates for Redux state
  const valuesForStore = {
    ...values,
    startDate: values.startDate instanceof Date ? values.startDate.toISOString() : values.startDate,
    endDate: values.endDate instanceof Date ? values.endDate.toISOString() : values.endDate,
  };

  if (props.add) {
    exp.push(valuesForStore);
  } else {
    exp[props.index] = valuesForStore;
  }

  let updatedProfile = { ...profile, experiences: exp };
  props.setEdit(false);
  dispatch(changeProfile(updatedProfile));
  SuccessNotification("Success", `Experience ${props.add ? "Added" : "Updated"} Successfully`);
};

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="text-lg font-semibold">{props.add? "Add" : "Edit"} Experience</div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <SelectInput form={form} name="title" {...select[0]} />
        <SelectInput form={form} name="company" {...select[1]} />
      </div>
      <SelectInput form={form} name="location" {...select[2]} />
      <Textarea {...form.getInputProps('description')}
        label="Summary"
        autosize
        minRows={3}
        placeholder="Enter Summary"
      />
      <div className="flex gap-10 [&>*]:w-1/2">
        <MonthPickerInput {...form.getInputProps('startDate')}
          maxDate={form.getValues().endDate || undefined}
          label="Start Date"
          placeholder="pick date"

        />
        <MonthPickerInput {...form.getInputProps('endDate')}
          maxDate={new Date()}
          label="End Date"
          minDate={form.getValues().startDate || undefined}
          placeholder="pick date"
          disabled={form.getValues().working}

        />
      </div>
      <Checkbox color="yellow.5" autoContrast
        {...form.getInputProps('working')} checked={form.getValues().working}
        onChange={(event) => form.setFieldValue('working', event.currentTarget.checked)}
        label="Currently Working here"
      />

      <div className="flex gap-6">
        <Button onClick={handleSave} color="green.5" variant="light">
          Save
        </Button>
        <Button onClick={() => props.setEdit(false)} color="red" variant="light">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ExpInput;
