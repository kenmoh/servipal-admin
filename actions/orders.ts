"use server";

import {
  deliveryUrl,
  foodUrl,
  laundryUrl,
  orderPerMonth,
  orderStats,
} from "@/lib/constants";
console.log(deliveryUrl);

export const getDeliveryOrders = async () => {
  try {
    const result = await fetch(deliveryUrl);
    const orders = result.json();
    return orders;
  } catch (error) {
    return { error };
  }
};
export const getFoodOrders = async () => {
  try {
    const result = await fetch(foodUrl);
    const orders = result.json();
    return orders;
  } catch (error) {
    return { error };
  }
};
export const getLaundryOrders = async () => {
  try {
    const result = await fetch(laundryUrl);
    const orders = result.json();
    return orders;
  } catch (error) {
    return { error };
  }
};
export const getOrdersPerMonth = async () => {
  try {
    const result = await fetch(orderPerMonth);
    const data = result.json();
    return data;
  } catch (error) {
    return { error };
  }
};
export const getStats = async () => {
  try {
    const result = await fetch(orderStats);
    const data = result.json();
    return data;
  } catch (error) {
    return { error };
  }
};
