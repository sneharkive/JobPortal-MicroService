import { Button, NumberInput, TagsInput, Textarea } from "@mantine/core";
import { content, fields } from "../../Data/PostJob";
import SelectInput from "./SelectInput";
import TextEditor from "./TextEditor";
import { isNotEmpty, useForm } from "@mantine/form";
import { getJobById, postJob } from "../../Service/JobService";
import { ErrorNotification, SuccessNotification } from "../../Service/NotificationService";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const PostJob = () => {
  const {id} = useParams();
  const [editorData, setEditorData] = useState(content);
  const user = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  
  const select = fields;

  useEffect(() => {
    window.scrollTo(0,0)
    if(id !== "0"){
      getJobById(id).then((res) => {
        form.setValues(res);
        setEditorData(res.description);
      }).catch((err) => console.log(err))
    }
    else {
      form.reset();
      setEditorData(content)
    }

  },[id])

  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues:{
      jobTitle: "",
      company: "",
      experience: "",
      jobType:"",
      location: "",
      packageOffered: "",
      // postTime: "",
      skillsRequired: [],
      about: "",
      description:content

    },
    validate: {
      jobTitle: isNotEmpty("Title is required"),
      company: isNotEmpty("Company is required"),
      about: isNotEmpty("About is required"),
      experience: isNotEmpty("Experience is required"),
      jobType: isNotEmpty("Job Type is required"),
      location: isNotEmpty("Location is required"),
      packageOffered: isNotEmpty("Package Offered is required"),
      skillsRequired: isNotEmpty("Skills Required is required"),
      description: isNotEmpty("Description is required"),
    }
  })

  const handlePost = () => {
    form.validate()
    if(!form.isValid()) return;
    postJob({...form.getValues(), id, postedBy:user.id, jobStatus: "ACTIVE" }).then((res) => {
      SuccessNotification("Success", "Job Posted Successfully");
      navigate(`/posted-jobs/${res.id}`);

    }).catch((err) => {
      console.log(err);
      ErrorNotification("Error", err.response?.data?.message || "Something went wrong");
    })
    
  }



  const handleDraft = () => {
    postJob({...form.getValues(), id, postedBy:user.id, jobStatus: "DRAFT" }).then((res) => {
      SuccessNotification("Success", "Job Drafted Successfully");
      navigate(`/posted-jobs/${res.id}`);

    }).catch((err) => {
      console.log(err);
      ErrorNotification("Error", err.response?.data?.message || "Something went wrong");
    })
    
  }


  return (
    <div className="w-4/5 mx-auto">
      <div className="text-2xl">Post a Job</div>
      <div className="flex flex-col gap-10">
        <div className="flex gap-10 [&>*]:w-1/2">
          <SelectInput form={form} name="jobTitle" {...select[0]} />
          <SelectInput form={form} name="company" {...select[1]} />
        </div>
        <div className="flex gap-10 [&>*]:w-1/2">
          <SelectInput form={form} name="experience" {...select[2]} />
          <SelectInput form={form} name="jobType" {...select[3]} />
        </div>
        <div className="flex gap-10 [&>*]:w-1/2">
          <SelectInput form={form} name="location" {...select[4]} />
          <NumberInput  {...form.getInputProps("packageOffered")} label="Salary" placeholder="Enter Salary" hideControls withAsterisk min={1} max={300} clampBehavior="strict" />
        </div>
        <TagsInput {...form.getInputProps("skillsRequired")}
          withAsterisk
          label="Skills"
          placeholder="Enter Skills"
          clearable
          acceptValueOnBlur
          splitChars={[",", " ", "|"]}
        />
        <Textarea
          {...form.getInputProps("about")}
          label="About Job"
          placeholder="Enter About Job"
          minRows={2}
          maxRows={4}
          withAsterisk
        />
        <div className="[&_button[data-active='true']]:!text-white [&_button[data-active='true']]:!bg-amber-400/30">
          <div className="font-semibold">Job Description</div>
          <TextEditor form={form} data={editorData} />
        </div>
        <div className="flex gap-4 ">
          <Button
            onClick={handlePost}
            color="#FDC700"
            variant="light"
          >
            Publish Job
          </Button>

          <Button
            onClick={handleDraft}
            color="#FDC700"
            variant="outline"
          >
            Save as Draft
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
