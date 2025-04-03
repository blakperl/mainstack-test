/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useTransactions } from "../hooks/useTransactions";
import NorthEastIcon from '@mui/icons-material/NorthEast';
import SouthWestIcon from '@mui/icons-material/SouthWest';
import FilterModal from "./FilterModal";
import ModalState from "./ModalState";
import { CircularProgress } from "@mui/material";

export default function TransactionList() {
  const { data: transactions, isLoading, error } = useTransactions();
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);
  const [filterCount, setFilterCount] = useState(0);

  const [filters, setFilters] = useState({
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    transactionType: [] as string[],
    transactionStatus: [] as string[],
  });

  const calculateActiveFilters = (filters: any) => {
    let activeFilters = 0;
    if (filters.startDate || filters.endDate) activeFilters++;
    if (filters.transactionType.length > 0) activeFilters++;
    if (filters.transactionStatus.length > 0) activeFilters++;
    return activeFilters;
  };

  useEffect(() => {
    if (!filters.startDate && !filters.endDate && !filters.transactionType.length && !filters.transactionStatus.length) {
      setFilteredTransactions(transactions);
    } else {
      const filtered = transactions?.filter((transaction: any) => {
        const transactionDate = new Date(transaction.date);

        if (isNaN(transactionDate.getTime())) {
          return false; 
        }
        const matchDate =
  (!filters.startDate || transactionDate >= new Date(filters.startDate.setHours(0, 0, 0, 0))) &&
  (!filters.endDate || transactionDate <= new Date(filters.endDate.setHours(23, 59, 59, 999)));

        const matchType = filters.transactionType.length
          ? filters.transactionType.includes(transaction.type)
          : true;

        const matchStatus = filters.transactionStatus.length
          ? filters.transactionStatus.includes(transaction.status)
          : true;

        return matchDate && matchType && matchStatus;
      });

      setFilteredTransactions(filtered);
    }

    setFilterCount(calculateActiveFilters(filters));
  }, [transactions, filters]);

  const applyFilters = (newFilters: any) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      startDate: undefined,
      endDate: undefined,
      transactionType: [],
      transactionStatus: [],
    });
    setFilterCount(0);
  };

  return (
    <div>
      <div className="py-4 border-b flex justify-between px-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-black">
            {filteredTransactions?.length || 0} Transactions
          </h1>
          <p className="text-xs">Your transactions for the last 7 days</p>
        </div>
        <div className="flex gap-4 items-center">
          <ModalState>
            {(isVisible, open, close) => (
              <>
                <FilterModal
                  isVisible={isVisible}
                  close={close}
                  applyFilters={applyFilters}
                />
                <button onClick={open} className="outlined-button font-bold cursor-pointer h-12 w-[8rem] gap-2 flex items-center justify-center">
                  Filter
                  {filterCount > 0 && (
                    <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-xs ml-2">
                      {filterCount}
                    </div>
                  )}
                  <Image src="/expand.png" width={10} height={10} alt="Expand" />
                </button>
              </>
            )}
          </ModalState>
         
          <button className="outlined-button font-bold cursor-pointer h-12 w-[8rem] flex gap-2 items-center justify-center">
            Export List
            <Image src="/download.png" width={15} height={15} alt="Download" />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="w-full grid place-items-center h-96">
          <CircularProgress />
        </div>
      ) : error ? (
        <div className="w-full grid place-items-center h-96">
          <p className="text-center text-red-500">Failed to load transactions.</p>
        </div>
      ) : !filteredTransactions || filteredTransactions.length === 0 ? (
        <div className="h-64 flex justify-center">
          <div className="flex flex-col place-content-start">
            <Image src="/empty.png" width={32} height={35} alt="EmptyState" />
            <p className="text-2xl font-bold text-black mt-4 w-[30ch]">No matching transaction found for the selected filter</p>
            <p className="text-sm font-bold my-4 w-[42ch]">Change your filters to see more results, or add a new product.</p>
            <button className="outlined-button font-bold cursor-pointer h-12 w-[8rem] flex items-center justify-center" onClick={clearFilters}>Clear filter</button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredTransactions.map((transaction, index) => (
            <div key={index} className="flex justify-between">
              <div className="flex gap-4 items-center mt-4">
                {transaction?.metadata?.product_name ? (
                  <p className="bg-[#E3FCF2] rounded-full w-10 h-10 flex items-center justify-center">
                    <SouthWestIcon className="text-[#075132]" />
                  </p>
                ) : (
                  <p className="bg-[#F9E3E0] rounded-full w-10 h-10 flex items-center justify-center">
                    <NorthEastIcon className="text-[#961100]" />
                  </p>
                )}
                <div className="space-y-2">
                  <h1 className="text-black">
                    {transaction?.metadata?.product_name || `Cash ${transaction?.type}`}
                  </h1>
                  {transaction?.metadata?.product_name ? (
                    <p className="text-xs">{transaction?.metadata?.name}</p>
                  ) : (
                    <p className={transaction.status === 'successful' ? 'text-[#0EA163] text-xs' : 'text-[#A77A07] text-xs'}>
                      {transaction?.status}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-black">
                  USD {transaction?.amount}
                </h1>
                <p className="text-xs flex justify-end">
                  {transaction?.date
                    ? new Date(transaction.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                      })
                    : 'No date available'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
