import { notification } from "antd";

const openNotification = (type, message) => {
  notification[type]({
    message: message,
    placement: "top", // Xabar joylashuvi
    duration: 2, // Xabar davomiyligi (soniyalarda)
  });
};
export { openNotification };
