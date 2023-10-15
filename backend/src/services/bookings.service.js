const sequelize = require("sequelize");

// Import Repo
const bookingsRepo = require("../repository/bookings.repository.js");

// ---------------------------------------------------------
class BookingsService {
  // 1. Get All Bookings
  async getAllBookings() {
    const listBookings = await bookingsRepo.getAllBookings();
    if (listBookings.length === 0) {
      return { data: "No Data Bookings", status: 404 };
    } else {
      return { data: listBookings, status: 200 };
    }
  }

  // 2. Get Detail Booking
  async getDetailBooking(bookingId) {
    const detailBooking = await bookingsRepo.getDetailBooking(bookingId);
    if (!detailBooking) {
      return { data: "No Data Bookings", status: 404 };
    } else {
      return { data: detailBooking, status: 200 };
    }
  }

  // 3. Add Booking
  async addBooking(dataBody, userId, serviceId) {
    const { name, phone, booking_date, calendar } = dataBody;

    // // Check Login
    // if (!authHeader) {
    //   return { data: "Please login to Book", status: 401 };
    // }
    // Check User Before Booking
    const findUser = await bookingsRepo.findUserById(userId);
    if (!findUser) {
      return { data: "User ID Not Found", status: 404 };
    }
    const dataUser = findUser.dataValues;
    console.log(dataUser, "DATAUSER");
    if (dataUser.role_id === 1 || dataUser.role_id === 2) {
      return { data: "Admin is not allowed to booking", status: 406 };
    }

    if (dataUser.status_id === 2) {
      return {
        data: "You can't booking because your account is inactive",
        status: 406,
      };
    }

    // Check Service Before Booking
    const findService = await bookingsRepo.findServiceById(serviceId);
    if (!findService) {
      return {
        data: "Service ID Not Found",
        status: 404,
      };
    }
    if (!name) {
      return {
        data: "Customer Name must not be blank",
        status: 406,
      };
    }
    if (!phone) {
      return {
        data: "Phone must not be blank",
        status: 406,
      };
    }
    const phoneNumberPattern = /^1\d{10}$/;
    if (!phoneNumberPattern.test(phone)) {
      return {
        data: "Invalid Phone number",
        status: 406,
      };
    }
    if (!booking_date) {
      return {
        data: "Booking Date must not be blank",
        status: 406,
      };
    }

    const bookingDate = new Date(booking_date);
    const currentDate = new Date();
    if (bookingDate < currentDate) {
      return {
        data: "You can't book a date in the past.",
        status: 406,
      };
    }

    const dayOfWeek = bookingDate.getDay();

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return {
        data: "You can't book on Saturday & Sunday",
        status: 406,
      };
    }

    if (!calendar) {
      return {
        data: "Calendar must not be blank",
        status: 406,
      };
    }

    // Check xem người dùng đã đặt lịch vào ngày đó giờ đó chưa
    const checkBooking = await bookingsRepo.checkBooking(
      userId,
      serviceId,
      booking_date,
      calendar
    );

    console.log(checkBooking, "CHECK BOOKING");
    if (checkBooking) {
      return {
        data: "You already booked this day and this time",
        status: 406,
      };
    }

    let maxBooking = 20;

    const filterBookingByDate = await bookingsRepo.filterBookingByDate(
      booking_date
    );
    console.log(filterBookingByDate, "filterBookingByDate");
    if (filterBookingByDate) {
      const transformedData = await filterBookingByDate?.map(
        (item) => item.dataValues
      );
      if (transformedData[0]?.total_booking >= maxBooking) {
        return {
          data: "Full Booking on this day",
          status: 406,
        };
      }
    }

    const dataService = findService.dataValues;
    const copyDataService = {
      ...dataService,
    };

    const bookingInfo = {
      user_id: userId,
      service_id: copyDataService.id,
      name: name,
      phone: phone,
      status_id: 1,
      booking_date: booking_date,
      calendar: calendar,
      service_name: copyDataService.name,
      service_description: copyDataService.description,
      service_price: copyDataService.price,
      service_image: copyDataService.service_image,
    };
    console.log(bookingInfo, "BOOKING INFO");
    const newBooking = await bookingsRepo.addBooking(bookingInfo);

    return {
      data: "Booking Completed",
      status: 200,
    };
  }

  // 5. Update Booking
  async updateBooking(status_id, bookingId) {
    const findBooking = await bookingsRepo.findBookingById(bookingId);
    if (!findBooking) {
      return { data: "Booking ID Not Found", status: 404 };
    }
    const dataBooking = findBooking.dataValues;

    /** Booking Status:
    1. Pending
    2. Processing
    3. Done
    4. Cancel
    */

    if (dataBooking.status_id === 3) {
      return {
        data: "Can't updated because this booking ID is Done",
        status: 406,
      };
    }

    if (dataBooking.status_id === 4) {
      return {
        data: "Can't updated because this booking ID is Cancel",
        status: 406,
      };
    }

    const bookingInfo = {
      status_id: !status_id ? dataBooking.status_id : status_id,
      updated_at: Date.now(),
    };

    const updatedBooking = await bookingsRepo.updateBooking(
      bookingInfo,
      bookingId
    );

    return {
      data: "Booking Status Updated",
      status: 200,
    };
  }

  // 6. Update Booking
  async cancelBooking(bookingId, userId) {
    const findBooking = await bookingsRepo.findBookingById(bookingId);
    if (!findBooking) {
      return { data: "Booking ID Not Found", status: 404 };
    }
    const dataBooking = findBooking.dataValues;
    const findUser = await bookingsRepo.findUserById(userId);
    if (!findUser) {
      return { data: "User ID Not Found", status: 404 };
    }

    const findBookingByUser = await bookingsRepo.findBookingByUserId(
      bookingId,
      userId
    );
    if (!findBookingByUser) {
      return { data: "Booking ID Not Found For This User ID", status: 404 };
    }

    /** Booking Status:
    1. Pending
    2. Processing
    3. Done
    4. Cancel
    */

    if (dataBooking.status_id === 2) {
      return { data: "You can't cancel because is is Processing", status: 406 };
    }
    if (dataBooking.status_id === 3) {
      return { data: "You can't cancel because is is Done", status: 406 };
    }
    if (dataBooking.status_id === 4) {
      return { data: "You can't cancel because is is Cancel", status: 406 };
    }

    const bookingInfo = {
      id: bookingId,
      user_id: userId,
      status_id: 4,
      updated_at: Date.now(),
    };

    const updatedBooking = await bookingsRepo.updateBooking(
      bookingInfo,
      bookingId
    );

    return {
      data: "Booking Cancel Completed",
      status: 200,
    };
  }

  // 7. Filter Booking By Date
  async filterBookingDate(date) {
    const filterBookingDate = await bookingsRepo.filterBookingDate(date);
    if (filterBookingDate.length === 0) {
      return { data: "No Data Bookings", status: 404 };
    } else {
      return { data: filterBookingDate, status: 200 };
    }
  }

  // 8. Group Booking By Date
  async groupBookingDate() {
    const groupBookingDate = await bookingsRepo.groupBookingDate();
    if (groupBookingDate.length === 0) {
      return { data: "No Data Bookings", status: 404 };
    } else {
      return { data: groupBookingDate, status: 200 };
    }
  }

  // 9. Filter Booking By User ID
  async filterBookingByUserId(userId) {
    const findUser = await bookingsRepo.findUserById(userId);
    if (!findUser) {
      return { data: "User ID Not Found", message: 404 };
    }

    const filterBooking = await bookingsRepo.filterBookingByUserId(userId);
    if (filterBooking.length === 0) {
      return { data: [], status: 200 };
    } else {
      return { data: filterBooking, status: 200 };
    }
  }
}

module.exports = new BookingsService();
