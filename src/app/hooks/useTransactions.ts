"use client"

import { useQuery } from "@tanstack/react-query";

interface Transactions {
  amount: number;
 metadata: {
  name: string;
  email: string;
  type:string
  quality: string
  country: string
  product_name: string
 }
 payment_reference:string
 status:string
 type:string
 date:string
}

const fetchTransactions = async () => {
  const response = await fetch("https://fe-task-api.mainstack.io/transactions");
  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }
  return response.json();
};

export const useTransactions = () => {
  return useQuery<Transactions[]>({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });
};

