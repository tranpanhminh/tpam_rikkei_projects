import { notification } from "antd";
import { useEffect, useState } from "react";
import { getAllOrders } from "../../../../api/orders.api";

// ---------------------------------------------------
function NotificationSale() {
  const [notificationIndex, setNotificationIndex] = useState(0);
  const [listOrders, setListOrders] = useState<any>([]);

  const fetchOrder = async () => {
    const result = await getAllOrders();
    return setListOrders(result);
  };

  useEffect(() => {
    fetchOrder();
  }, []);

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
