export class OrdersInterface {
  id?: number;
  user_id?: number;
  customer_name?: string;
  address?: string;
  phone?: string;
  discount_rate?: number;
  discounted?: number;
  bill?: number;
  total_bill?: number;
  cancellation_reason?: string;
  cancel_reason_id?: number;
  coupon_id?: number;
  status_id?: number;
  email_paypal?: string;
}
