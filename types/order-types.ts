export type DeliveryOrderType = {
  order_number: string;
  package_name: string;
  order_status: string;
  order_owner_username: string;
  dispatch_company_phone_number: string;
  vendor_phone_number: string;
  vendor_username: string;
  order_owner_phone_number: string;
  dispatch_company_name: string;
  rider_phone_number: string;
  rider_name: string;
  rider_bike_plate_number: string;
};

export type OrderStats = {
  users: number;
  orders: number;
  pending: number;
  food: number;
  laundry: number;
  delivery: number;
};
