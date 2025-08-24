import {
  TextInput,
  NumberInput,
  FileInput,
  Textarea,
  Button,
  LoadingOverlay,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconPaperclip } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBase64 } from "../../Service/Utilities";
import { applyJob } from "../../Service/JobService";
import { ErrorNotification, SuccessNotification } from "../../Service/NotificationService";
import { useSelector } from "react-redux";

const ApplicationForm = () => {
  const {id} = useParams();

  const user = useSelector((state: any) => state.user);
  const profile = useSelector((state: any) => state.profile);
  
  const [preview, setPreview] = useState(false);
  const [submit, setSubmit] = useState(false);

  const navigate = useNavigate();

  const handlePreview = () => {
    form.validate();
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (!form.isValid()) return;
    setPreview(!preview);
  };

  const handleSubmit = async () => {
    setSubmit(true);
    let resume:any = await getBase64(form.getValues().resume);
    let applicant = { ...form.getValues(), applicantId: user.id, resume: resume.split(",")[1] };
    applyJob(id, applicant).then((res) => {
      setSubmit(false);
      SuccessNotification("Success", `Application Submitted Successfully`);
      navigate("/job-history")
    }).catch((err) => {
      setSubmit(false);
      ErrorNotification("Error", err.response.data.errorMessage);
    })
    // dispatch(changeProfile(updatedProfile));
  };

  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    website: user?.website || "",
    resume: null,
    coverLetter: "",
  },
    validate: {
      name: isNotEmpty("Name is required"),
      email: isNotEmpty("email is required"),
      phone: isNotEmpty("Phone number is required"),
      website: isNotEmpty("website is required"),
      resume: isNotEmpty("resume is required"),
    },
  });

  return (
    <div>
      <LoadingOverlay
        visible={submit}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "yellow", type: "bars" }}
      />
      <div className="text-xl font-semibold mb-5">Submit Your Application</div>

      <div className="flex flex-col gap-5">
        <div className="flex gap-10 [&>*]:w-1/2 ">
          <TextInput
            {...form.getInputProps("name")}
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={`{preview?"text-gray-400 font-semibold:""}`}
            withAsterisk
            label="Full Name"
            placeholder="Enter name"
          />
          <TextInput
            {...form.getInputProps("email")}
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={`{preview?"text-gray-400 font-semibold:""}`}
            withAsterisk
            label="Email"
            placeholder="Enter email"
          />
        </div>
        <div className="flex gap-10 [&>*]:w-1/2">
          <NumberInput
            {...form.getInputProps("phone")}
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={`{preview?"text-gray-400 font-semibold:""}`}
            hideControls
            min={0}
            max={9999999999}
            clampBehavior="strict"
            withAsterisk
            label="Phone Number"
            placeholder="Enter Phone Number"
          />
          <TextInput
            {...form.getInputProps("website")}
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={`{preview?"text-gray-400 font-semibold:""}`}
            withAsterisk
            label="Personal Website"
            placeholder="Enter URL"
          />
        </div>

        <FileInput
          {...form.getInputProps("resume")}
          accept="application/pdf"
          readOnly={preview}
          variant={preview ? "unstyled" : "default"}
          className={`{preview?"text-gray-400 font-semibold:""}`}
          withAsterisk
          leftSection={<IconPaperclip />}
          label="Attach your CV"
          placeholder="You CV"
          leftSectionPointerEvents="none"
        />

        <Textarea
          {...form.getInputProps("coverLetter")}
          readOnly={preview}
          variant={preview ? "unstyled" : "default"}
          className={`{preview?"text-gray-400 font-semibold:""}`}
          placeholder="Type something about yourself"
          label="Cover Latter"
          autosize
          minRows={4}
        />
        {!preview && (
          <Button onClick={handlePreview} color="#FDC700" variant="light">
            Preview
          </Button>
        )}

        {preview && (
          <div className="flex gap-10 [&>*]:w-1/2">
            <Button
              fullWidth
              onClick={handlePreview}
              color="#FDC700"
              variant="outline"
            >
              Edit
            </Button>
            <Button
              fullWidth
              onClick={handleSubmit}
              color="#FDC700"
              variant="light"
            >
              Submit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationForm;
