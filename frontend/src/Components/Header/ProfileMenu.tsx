import { Menu, Avatar, Switch, rem } from "@mantine/core";
import {
  IconMessageCircle,
  IconUserCircle,
  IconFileText,
  IconMoon,
  IconSun,
  IconLogout,
} from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeUser } from "../../Slices/UserSlice";

const ProfileMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const profile = useSelector((state: any) => state.profile);
  const profileEmp = useSelector((state: any) => state.profileEmp);
  const [checked, setChecked] = useState(false);
  const [opened, setOpened] = useState(false);

  const handleLogout = () => {
    dispatch(removeUser());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
  };

  return (
    <Menu shadow="md" width={200} opened={opened} onChange={setOpened}>
      <Menu.Target>
        <div className="flex items-center gap-2 cursor-pointer">
          <div>{user.name}</div>

{user.accountType == "APPLICANT"  ?  <Avatar
            src={
              profile?.profilePicture
                ? `data:image/jpeg;base64, ${profile?.profilePicture}`
                : "/avatar.png"
            }
            alt={user.name}
          /> :
          <Avatar
            src={
              profileEmp?.profilePicture
                ? `data:image/jpeg;base64, ${profileEmp?.profilePicture}`
                : "/avatar.png"
            }
            alt={user.name}
          />
           }
        </div>
      </Menu.Target>

      <Menu.Dropdown onChange={() => setOpened(true)}>
        {/* <Menu.Label>Application</Menu.Label> */}
        <Link to="/profile">
          <Menu.Item leftSection={<IconUserCircle size={14} />}>
            Profile
          </Menu.Item>
        </Link>
        <Menu.Item leftSection={<IconMessageCircle size={14} />}>
          Messages
        </Menu.Item>
        <Menu.Item leftSection={<IconFileText size={14} />}>Resume</Menu.Item>
        <Menu.Item
          leftSection={<IconMoon size={14} />}
          rightSection={
            <Switch
              checked={checked}
              onChange={(event) => setChecked(event.currentTarget.checked)}
              size="md"
              color="dark.4"
              onLabel={
                <IconSun
                  color="yellow"
                  style={{ width: rem(16), height: rem(16) }}
                />
              }
              offLabel={
                <IconMoon
                  color="cyan"
                  style={{ width: rem(16), height: rem(16) }}
                />
              }
            />
          }
        >
          Dark Mode
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          onClick={handleLogout}
          color="red"
          leftSection={<IconLogout size={14} />}
        >
          Log out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;
