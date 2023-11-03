export class OrdersInterface {
  id?: number;
  order_code?: string;
  sale_id?: string;
  user_id?: number;
  customer_name?: string;
  address?: string;
  phone?: string;
  discounted?: number;
  bill?: number;
  total_bill?: number;
  cancellation_reason?: string;
  cancel_reason_id?: number;
  status_id?: number;
  email_paypal?: string;
}
