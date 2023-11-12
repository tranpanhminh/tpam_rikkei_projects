import axios from "axios";
import BaseAxios from "./apiAxiosClient";
import { notification } from "antd";

const bookingsAPI = process.env.REACT_APP_API_BOOKINGS;
const bookingStatusAPI = process.env.REACT_APP_API_BOOKING_STATUS;

// -----------------Interface----------------
export interface BookingInfo {
  user_id: string;
  service_id: string;
  name: string;
  phone: string;
  booking_date: string;
  calendar: string;
}

export interface UpdateBooking {
  status_id: number | string;
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
      return true;
    })
    .catch((error) => {
      notification.warning({
        message: error.response.data.message,
      });
      return false;
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

// 4. Filter Booking By Date
export const filterBookingByDate = async (bookingDate: string) => {
  const result = await axios
    .get(`${bookingsAPI}/filter/date/${bookingDate}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
};

// 5. Get All Booking Statuses
export const getAllBookingStatus = async () => {
  const result = await axios
    .get(`${bookingStatusAPI}/`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
  return result;
};

// 6. Update Booking (Admin)
export const updateBookingStatus = async (
  bookingId: number | string | undefined,
  data: UpdateBooking
) => {
  const result = await BaseAxios.patch(
    `${bookingsAPI}/update/${bookingId}`,
    data
  )
    .then((response) => {
      notification.success({
        message: `${response.data.message}`,
      });
      return true;
    })
    .catch((error) => {
      notification.warning({
        message: `${error.response.data.message}`,
      });
    });
  return result;
};

// 7. Get Detail Booking
export const getDetailBooking = async (
  bookingId: number | string | undefined
) => {
  const result = await axios
    .get(`${bookingsAPI}/detail/${bookingId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
  return result;
};

// 8. Get All Bookings
export const getAllBookings = async () => {
  const result = await axios
    .get(`${bookingsAPI}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
  return result;
};

// 9. Get Group Booking Date
export const filterGroupBookingDate = async () => {
  const result = await axios
    .get(`${bookingsAPI}/group`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
  return result;
};
