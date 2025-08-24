import {
  Anchor,
  Checkbox,
  Button,
  PasswordInput,
  rem,
  TextInput,
  Radio,
  Group,
  LoadingOverlay,
} from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { registerUser } from "../../Service/UserService";
import { signupValidation } from "../../Service/FormValidation";
import { ErrorNotification, SuccessNotification } from "../../Service/NotificationService";

const SignUp = () => {
  const form = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "APPLICANT",
  };
  const [data, setData] = useState<{ [key: string]: string }>(form);

  const [formError, setFormError] = useState<{ [key: string]: string }>(form);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event: any) => {
    if (typeof event == "string") {
      setData({ ...data, accountType: event });
      return;
    }

    let name = event.target.name,
      value = event.target.value;

    setData({ ...data, [name]: value });
    setFormError({ ...formError, [name]: signupValidation(name, value) });

    if (name === "password" && data.confirmPassword !== "") {
      let err = "";
      if (data.confirmPassword !== value) err = "Password do not match.";
      setFormError({
        ...formError,
        [name]: signupValidation(name, value),
        confirmPassword: err,
      });
    }

    if (name === "confirmPassword") {
      if (data.password !== value)
        setFormError({ ...formError, [name]: "Password do not match." });
      else setFormError({ ...formError, confirmPassword: "" });
    }
    // console.log(event.target);
  };

  const handleSubmit = () => {
    let valid = true,
      newFromError: { [key: string]: string } = {};

    for (let key in data) {
      if (key === "accountType") continue;
      if (key !== "confirmPassword")
        newFromError[key] = signupValidation(key, data[key]);
      else if (data[key] !== data["password"])
        newFromError[key] = "Password do not match.";
      if (newFromError[key]) valid = false;
    }

    setFormError(newFromError);

    if (valid === true)
      setLoading(true);
      registerUser(data)
        .then((res) => {
          console.log(res);
          setData(form);
          SuccessNotification("Registration Successful", "Redirecting to Login Page..." );

          setTimeout(() => {
            setLoading(false);
            navigate("/login")
          }, 2000)
        })
        .catch((error) => {
          setLoading(false);
          console.log(error.response);
            ErrorNotification(
          "Registration Failed",
          error.response.data.errorMessage
        );
        });
  };


  return (<>
  <LoadingOverlay
          visible={loading}
          className="translate-x-1/2"
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
          loaderProps={{ color:"yellow.5", type:"bars"}}
        />
  

    <div className="flex gap-4 justify-center flex-col w-1/2 px-20">
      <div className="text-2xl font-semibold">Create Account</div>
      <TextInput
        error={formError.name}
        onChange={handleChange}
        name="name"
        value={data.name}
        withAsterisk
        label="Full Name"
        placeholder="Full Name"
      />
      <TextInput
        error={formError.email}
        onChange={handleChange}
        name="email"
        value={data.email}
        withAsterisk
        leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
        label="Email"
        placeholder="Your Email"
      />
      <PasswordInput
        error={formError.password}
        onChange={handleChange}
        name="password"
        value={data.password}
        withAsterisk
        leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} />}
        label="Password"
        placeholder="Password"
      />
      <PasswordInput
        error={formError.confirmPassword}
        onChange={handleChange}
        name="confirmPassword"
        value={data.confirmPassword}
        withAsterisk
        leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} />}
        label="Confirm Password"
        placeholder="Confirm Password"
      />
      <Radio.Group
        value={data.accountType}
        onChange={handleChange}
        label="You are ?"
        withAsterisk
      >
        <Group mt="xs">
          <Radio
            className="py-4 px-6 border border-gray-600 rounded-lg has-[:checked]:border-amber-400"
            color="yellow"
            autoContrast
            value="APPLICANT"
            label="Applicant"
          />
          <Radio
            className="py-4 px-6 border border-gray-600 rounded-lg has-[:checked]:border-amber-400"
            color="yellow"
            autoContrast
            value="EMPLOYER"
            label="Employer"
          />
        </Group>
      </Radio.Group>

      <Checkbox
        color="#FFD230"
        autoContrast
        label={
          <>
            I accept{" "}
            <Anchor className="!text-amber-300">Terms & Conditions</Anchor>
          </>
        }
      />
      <Button
        onClick={handleSubmit}
        color="#FFD230"
        autoContrast
        variant="filled"
        loading={loading}
      >
        Sign Up
      </Button>
      <div className="mx-auto text-lg">
        Have an Account?{" "}
        <span onClick={() => {navigate("/login"); setFormError(form); setData(form)}} className="text-amber-300 hover:underline cursor-pointer">
          Login
        </span>
      </div>
    </div>  </>
  );
};

export default SignUp;
