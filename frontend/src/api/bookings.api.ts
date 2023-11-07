import axios from "axios";
import jwtDecode from "jwt-decode";
import BaseAxios from "./apiAxiosClient";
import { notification } from "antd";

const bookingsAPI = process.env.REACT_APP_API_BOOKINGS;

// -----------------Interface----------------
export interface BookingInfo {
  user_id: string;
  service_id: string;
  name: string;
  phone: string;
  booking_date: string;
  calendar: string;
}
// ---------------------------------
// 1. Get User Booking
export const getUserBooking = async (userId: number | string | undefined) => {
  const result = await BaseAxios.get(`${bookingsAPI}/filter/users/${userId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
  return result;
};

// 2. Book Service
export const bookingService = async (
  userId: number | string | undefined,
  serviceId: number | string | undefined,
  userInfo: BookingInfo
) => {
  const result = await BaseAxios.post(
    `${bookingsAPI}/add/users/${userId}/services/${serviceId}`,
    userInfo
  )
    .then((response) => {
      notification.success({
        message: response.data.message,
      });
    })
    .catch((error) => {
      notification.warning({
        message: error.response.data.message,
      });
    });
  return result;
};

// 3. Cancel Booking
export const cancelBooking = async (bookingId: number | string | undefined) => {
  const result = await BaseAxios.patch(
    `${bookingsAPI}/cancel-booking/${bookingId}/`
  )
    .then((response) => {
      notification.success({
        message: response.data.message,
      });
    })
    .catch((error) => {
      notification.warning({
        message: error.response.data.message,
      });
    });
  return result;
};
