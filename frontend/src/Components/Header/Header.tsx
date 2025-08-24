import { useEffect, useState } from "react";
import { IconAsset } from "@tabler/icons-react";
import { Button } from "@mantine/core";
import NavLinks from "./NavLinks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../Service/ProfileService";
import { setProfile } from "../../Slices/ProfileSlice";
import NotiMenu from "./NotiMenu";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../../Slices/UserSlice";
import { setupResponseInterceptor } from "../../Interceptor/AxiosInterceptor";

const Header = () => {
  const user = useSelector((state: any) => state.user);
  const token = useSelector((state: any) => state.jwt);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setupResponseInterceptor(navigate);
  }, [navigate]);
  
  useEffect(() => {
    if (token != "") {
      const decoded = jwtDecode(localStorage.getItem("token") || "");
      dispatch(setUser({ ...decoded, email: decoded.sub }));
    }
    console.log(user);
    getProfile(user?.id)
      .then((data: any) => {
        dispatch(setProfile(data));
        // console.log(data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [token, navigate]);

  const [isOpen, setIsOpen] = useState(false);

  const menuHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    location.pathname != "/signup" &&
    location.pathname != "/login" && (
      <header className="bg-black  sticky top-0 left-0 right-0 z-50">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-16 px-4 sm:px-6 lg:px-8">
          <Link className="flex gap-2 text-amber-400" to="/">
            <IconAsset />
            <span>NextRole</span>
          </Link>

          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              <NavLinks />
            </nav>

            <div className="flex items-center gap-4">
              {user ? (
                <ProfileMenu />
              ) : (
                <Link to="/login">
                  <Button variant="light" autoContrast color="yellow.5">
                    Login
                  </Button>
                </Link>
              )}

              {user ? <NotiMenu /> : <></>}
              {/* <div className="hidden cursor-pointer text-gray-200  sm:block border-gray-600 border-2 rounded-full p-1">
                <Indicator processing color="yellow.6">
                  <IconBell size={19}  className="transition hover:scale-120" />
                </Indicator>
              </div> */}
              <div className="block md:hidden">
                <button
                  onClick={menuHandler}
                  className="cursor-pointer rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          {isOpen && (
            <div
              className="md:hidden block absolute end-0 z-10 top-14 pl-6 text-sm mr-6 w-56 rounded-md border border-gray-100 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900 py-2"
              role="menu"
            >
              <NavLinks />
            </div>
          )}
        </div>
      </header>
    )
  );
};

export default Header;
