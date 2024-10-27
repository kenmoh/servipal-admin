export type Wallet = {
  id: string;
  user_id: string;
  username: string;
  balance: string;
};

export type UserType = {
  id: string;
  dispatch_id: string;
  full_name: string;
  email: string;
  username: string;
  phone_number: string;
  user_type: string;
  notification_token: string;
  is_suspended: boolean;
  account_status: string;
  confirm_email: string;
  confirm_phone_number: string;
  wallet: Wallet;
  created_at: string;
  updated_at: string;
};
