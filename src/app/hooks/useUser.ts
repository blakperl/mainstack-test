"use client"

import { useQuery } from "@tanstack/react-query";

interface User {
  first_name: string;
  last_name: string;
  email: string;
}

const fetchUser = async (): Promise<User> => {
  const response = await fetch("https://fe-task-api.mainstack.io/user");
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return response.json();
};

export const useUser = () => {
  return useQuery<User>({
    queryKey: ["user"],
    queryFn: fetchUser,
  });
};
