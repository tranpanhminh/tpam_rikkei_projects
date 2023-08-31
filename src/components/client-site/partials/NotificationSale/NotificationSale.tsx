import React, { useEffect, useMemo, useState } from "react";
import { notification } from "antd";
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
    fetchOrders();
  }, []);

  const showNotificationSale = () => {
    setInterval(() => {
      notification.success({
        message: `${listOrders[1].id}`,
      });
    }, 3000);
  };

  return <>{showNotificationSale()}</>;
};

export default NotificationSale;
