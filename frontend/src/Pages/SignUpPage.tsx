import { IconArrowLeft, IconAsset } from "@tabler/icons-react";
import SignUp from "../Components/SignUpLogin/SignUp";
import Login from "../Components/SignUpLogin/Login";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";

const SignUpPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden w-[100vw] relative h-screen" >
      <Button className="!absolute top-2 left-4 z-10" onClick={() => navigate("/")} my="md" leftSection={<IconArrowLeft /> } color="#FDC700" variant="light">
                {" "}
                Home
              </Button>
      <div className={`w-[100vw] h-screen transition-all ease-in-out duration-500 flex [&>*]:!flex-shrink-0 ${location.pathname == '/signup'?'-translate-x-1/2':'translate-x-0'}`}>
        <Login />
        <div className={`w-1/2 h-full bg-zinc-900 transition-all ease-in-out duration-500 ${location.pathname == '/signup' ? 'rounded-r-[200px]' : 'rounded-l-[200px]'} flex items-center justify-center flex-col gap-6`}>
          <div className="flex gap-1 items-center text-amber-300">
              <IconAsset className="h-16 w-16" stroke={2.5}/>
              <div className="text-6xl font-semibold">NextRole</div>
          </div>
          <div className="text-2xl text-gray-300 font-semibold">Find job that made for you.</div>
        </div>

      <SignUp />
      </div>

    </div>
  );
};

export default SignUpPage;
