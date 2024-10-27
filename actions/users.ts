"use server";

import { usersUrl } from "@/lib/constants";

export const getUsers = async () => {
  try {
    const result = await fetch(usersUrl);
    const users = result.json();
    console.log(users);
    return users;
  } catch (error) {
    return { error };
  }
};
