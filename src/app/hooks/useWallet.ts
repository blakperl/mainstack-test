"use client";

import { useQuery } from "@tanstack/react-query";

interface Wallet {
  balance: number;
  total_payout: number;
  total_revenue: number;
  pending_payout: number;
  ledger_balance: number;
}

const fetchWallet = async (): Promise<Wallet> => {
  const response = await fetch("https://fe-task-api.mainstack.io/wallet");
  if (!response.ok) {
    throw new Error("Failed to fetch wallet data");
  }
  return response.json();
};

export const useWallet = () => {
  return useQuery<Wallet>({
    queryKey: ["wallet"],
    queryFn: fetchWallet,
  });
};
