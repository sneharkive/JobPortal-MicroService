import {
  TextInput,
  rem,
  PasswordInput,
  Button,
  LoadingOverlay,
} from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
// import { loginUser } from "../../Service/UserService";
import { useState } from "react";
import { loginValidation } from "../../Service/FormValidation";
import { useDisclosure } from "@mantine/hooks";
import ResetPassword from "./ResetPassword";
// import { useDispatch } from "react-redux";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../Service/NotificationService";
// import { setUser } from "../../Slices/UserSlice";
// import { setJwt } from "../../Slices/JwtSlice";
import { loginUser } from "../../Service/AuthService";

// import {jwtDecode} from 'jwt-decode';


const Login = () => {
  // const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const form = {
    email: "",
    password: "",
  };

  const [data, setData] = useState<{ [key: string]: string }>(form);

  const [formError, setFormError] = useState<{ [key: string]: string }>(form);

  const [opened, { open, close }] = useDisclosure(false);

  const navigate = useNavigate();

  const handleChange = (event: any) => {
    setFormError({ ...formError, [event.target.name]: "" });
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    let valid = true,
      newFromError: { [key: string]: string } = {};

    for (let key in data) {
      newFromError[key] = loginValidation(key, data[key]);
      if (newFromError[key]) valid = false;
    }

    setFormError(newFromError);

    if (valid) {
    setLoading(true);
      loginUser(data)
        .then((res) => {
          console.log(res);
          SuccessNotification(
            "Login Successful",
            "Redirecting to Home Page..."
          );
          // dispatch(setJwt(res.jwt));
          // const decoded = jwtDecode(res.jwt);
          // dispatch(setUser({...decoded, email:decoded.sub}))
          setTimeout(() => {
            setLoading(false);
            // dispatch(setUser(res));
            navigate("/");
          }, 2000);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error.response);
          ErrorNotification("Login Failed", error.response.data.errorMessage);
        });
    }
  };

  return (
    <>
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color:"yellow.5", type:"bars"}}
      />
      <div className="flex gap-4 justify-center flex-col w-1/2 px-20">
        <div className="text-2xl font-semibold">Login Account</div>
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
        <Button
          color="#FFD230"
          autoContrast
          variant="filled"
          onClick={handleSubmit}
          loading={loading}
        >
          Sign Up
        </Button>

        <div className="mx-auto text-lg">
          Don't have an Account?{" "}
          <span
            onClick={() => {
              navigate("/signup");
              setFormError(form);
              setData(form);
            }}
            className="text-amber-300 hover:underline cursor-pointer"
          >
            Signup
          </span>
        </div>
        <div className="text-center ">
          <span
            onClick={open}
            className="text-amber-300 hover:underline cursor-pointer text-lg"
          >
            Forget Password?
          </span>
        </div>
      </div>
      <ResetPassword opened={opened} close={close} />
    </>
  );
};

export default Login;
