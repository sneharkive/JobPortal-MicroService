import { Indicator, Menu, Notification, rem } from "@mantine/core";
import { IconBell, IconCheck } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  deleteNotifications,
  getNotifications,
  readNotifications,
} from "../../Service/NotiService";
import { useNavigate } from "react-router-dom";

const NotiMenu = () => {
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user);
  const [notifications, setNotifications] = useState<any>([]);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    getNotifications(user.id)
      .then((res) => setNotifications(res))
      .catch((err) => console.log(err));
  }, [user]);

  // const unread = (index: number) => {
  //   let notis = [...notifications];

  //   notis = notis.filter((noti: any, i: number) => i != index);
  //   setNotifications(notis);
  //   readNotifications(notifications[index].id)
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // };

  const deleteNoti = (index: number) => {
    const notiToDelete = notifications[index];
    const updatedNotis = notifications.filter((i:number) => i !== index);
    setNotifications(updatedNotis);

    deleteNotifications(notiToDelete.id)
      .then((res) => console.log("Deleted:", res))
      .catch((err) => console.log("Error deleting:", err));
  };


  
  return (
    <Menu shadow="md" width={400} opened={opened} onChange={setOpened}>
      <Menu.Target>
        <div className="hidden cursor-pointer text-gray-200  sm:block border-gray-600 border-2 rounded-full p-1">
          <Indicator
            disabled={notifications.length <= 0}
            processing
            color="yellow.6"
          >
            <IconBell size={19} className="transition hover:scale-120" />
          </Indicator>
        </div>
      </Menu.Target>

      <Menu.Dropdown onChange={() => setOpened(true)}>
        <div className="flex flex-col gap-2">
          {notifications.length != 0 ? (
            notifications.map((noti: any, index: number) => (
              <Notification
                key={index}
                onClick={() => {
                  navigate(noti.route);
                  // unread(index);
                  deleteNoti(index);
                  setOpened(false);
                }}
                // onClose={() => unread(index)}
                onClose={() => deleteNoti(index)}
                className="hover:!bg-gray-800 !bg-zinc-900 cursor-pointer"
                icon={<IconCheck style={{ width: rem(20), height: rem(20) }} />}
                color="teal"
                title={noti.action}
              >
                {noti.message}
              </Notification>
            ))
          ) : (
            <div className="text-center">No Notifications</div>
          )}
        </div>
        <Menu.Divider />
      </Menu.Dropdown>
    </Menu>
  );
};

export default NotiMenu;
