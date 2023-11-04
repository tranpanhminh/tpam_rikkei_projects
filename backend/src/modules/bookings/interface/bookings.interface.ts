export class BookingsInterface {
  id?: number;
  user_id?: number;
  service_id?: number;
  name?: string;
  phone?: string;
  service_name?: string;
  service_description?: string;
  service_price?: number;
  service_image?: string;
  date?: Date;
  booking_date?: string;
  calendar?: string;
  status_id?: number;
  created_at?: Date;
  updated_at?: Date;
}
