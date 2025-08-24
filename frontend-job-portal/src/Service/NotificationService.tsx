import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

const SuccessNotification = (title:string, message: string) => {
  notifications.show({
    title: title,
    message: message,
    withCloseButton: true,
    icon: <IconCheck style={{ width: "90%", height: "90%" }} />,
    color: "teal.4",
    withBorder: true,
    className: "!border-teal-500",
  });
}

const ErrorNotification = (title:string, message: string) => {
  notifications.show({
    title: title,
    message: message,
    withCloseButton: true,
    icon: <IconX style={{ width: "90%", height: "90%" }} />,
    color: "red.4",
    withBorder: true,
    className: "!border-red-500",
  });
}

export { SuccessNotification, ErrorNotification };