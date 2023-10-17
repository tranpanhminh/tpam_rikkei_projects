import { message, notification } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

// Import API
const ordersAPI = process.env.REACT_APP_API_ORDERS;
// ---------------------------------------------------
function NotificationSale() {
  const [notificationIndex, setNotificationIndex] = useState(0);
  const [listOrders, setListOrders] = useState<any>([]);

  const fetchOrder = () => {
    axios
      .get(`${ordersAPI}`)
      .then((response) => {
        setListOrders(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchOrder();
  }, []);
  console.log(listOrders, "LIST ORDER");
  const showNotification = () => {
    if (listOrders.length > 0) {
      const item = listOrders[notificationIndex];
      notification.success({
        message: "Recently Order",
        description: `${item.customer_name} has ordered products`,
        placement: "bottomLeft",
      });

      // Tăng chỉ số thông báo để hiển thị thông báo tiếp theo trong danh sách
      setNotificationIndex((prevIndex) =>
        prevIndex === listOrders.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  useEffect(() => {
    // Sử dụng setTimeout để gọi showNotification sau 5 giây
    const timer = setTimeout(() => {
      showNotification();
    }, 12000);

    return () => {
      clearTimeout(timer); // Xóa timer nếu component bị unmount trước khi thông báo hiển thị
    };
  }, [notificationIndex, listOrders]);

  return <></>; // Không có nội dung render
}

export default NotificationSale;
