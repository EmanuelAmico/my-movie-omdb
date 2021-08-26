import { notification } from "antd";

const generateNotification = (type, title, description) => {
  notification[type]({
    message: title,
    description: description,
    placement: "topRight",
    style: {
      backgroundColor: "#242424",
      color: "white",
      fill: "white",
    }
  });
};

export default generateNotification;
