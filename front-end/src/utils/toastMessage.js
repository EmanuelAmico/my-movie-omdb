import React from 'react'
import { Button, notification, Space } from 'antd';

const Button = ({ message, description, className }) => {
  const openNotificationWithIcon = type => {
    notification[type]({
      message: message,
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };
  return (
    <button className={className} ></button>
  )
}

export default Button
