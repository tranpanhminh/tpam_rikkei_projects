SELECT * FROM project_module_3.bookings;

truncate project_module_3.bookings;

SELECT booking_date, COUNT(id) AS `total_booking`, COALESCE(50) AS `maxBooking`
FROM project_module_3.bookings
GROUP BY booking_date;

SELECT booking_date, COUNT(id) AS `total_booking`
FROM project_module_3.bookings
GROUP BY booking_date;