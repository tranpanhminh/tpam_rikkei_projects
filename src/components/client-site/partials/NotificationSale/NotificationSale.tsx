import {
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
} from "@ant-design/icons";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Divider, Space, notification } from "antd";
import type { NotificationPlacement } from "antd/es/notification/interface";
import axios from "axios";

const Context = React.createContext({ name: "Default" });

const NotificationSale: React.FC = () => {
  const [listOrders, setListOrders] = useState<any>(null);

  useEffect(() => {
    const fetchOrders = () => {
      axios
        .get(`http://localhost:7373/orders/`)
        .then((response) => setListOrders(response.data));
    };
  }, []);

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Notification ${placement}`,
      description: (
        <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>
      ),
      placement,
    });
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => openNotification("bottomLeft")}
        icon={<RadiusBottomleftOutlined />}
      >
        bottomLeft
      </Button>
    </>
  );
};

export default NotificationSale;
