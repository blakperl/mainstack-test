'use client'

import Image from 'next/image'
import Link from 'next/link'
import TransactionList from './TransactionList';
import { useWallet } from '../hooks/useWallet';
import { CircularProgress } from '@mui/material';
import { useTransactions } from '../hooks/useTransactions';
import TransactionChart from './TransactionChart';


export default function Header() {
  const { data: wallet, isLoading, isError } = useWallet();
  const { data: transactions, isLoading: transactionsLoading, isError: transactionsError } = useTransactions();
  return (
   <div>
     {isLoading || transactionsLoading ?  (
            <div className="w-full grid place-items-center h-96">
              <CircularProgress />
            </div>
          ) : isError || transactionsError ? (
            <div className="w-full grid place-items-center h-96">
              <p className="text-center text-red-500">Failed to load wallet.</p>
            </div>
          ) : (
     <div className="grid grid-cols-4 gap-6 ">
       <div className="col-span-3 ">
        <div className="flex gap-6 items-center">
            <div className="space-y-2">
            <p className="text-xs">Available balance</p>
            <h1 className="text-2xl font-bold text-black"> USD {wallet?.balance.toFixed(2)}</h1>
            </div>
            <div>
            <a
            className="filled-button h-12 w-[9rem] flex justify-center items-center cursor-pointer"
            aria-label="withdraw button"
           
          >
            Withdraw
          </a>
            </div>

        </div>
        <div className='my-8'>
        <TransactionChart transactions={transactions || []} />
        </div>
       </div>
       <div className="col-span-1 ">
       <div className="flex justify-between  mb-6">
            <div className="space-y-1">
            <p className="text-xs">Ledger Balance</p>
            <h1 className="text-2xl font-bold text-black">USD {wallet?.ledger_balance.toFixed(2)}</h1>
            </div>
            <Link href="/">
          <Image src="/info.png"width={25} height={20} alt="info" />
        </Link>

        </div>
        <div className="flex justify-between  mb-6">
            <div className="space-y-1">
            <p className="text-xs">Total Payout</p>
            <h1 className="text-2xl font-bold text-black">USD {wallet?.total_payout.toFixed(2)}</h1>
            </div>
            <Link href="/">
          <Image src="/info.png" width={25} height={20} alt="info" />
        </Link>

        </div>
        <div className="flex justify-between mb-6">
            <div className="space-y-1">
            <p className="text-xs">Total Revenue</p>
            <h1 className="text-2xl font-bold text-black">USD {wallet?.total_revenue.toFixed(2)}</h1>
            </div>
            <Link href="/">
          <Image src="/info.png" width={25} height={20} alt="info" />
        </Link>

        </div>
        <div className="flex justify-between  mb-6">
            <div className="space-y-1">
            <p className="text-xs">Pending Payout</p>
            <h1 className="text-2xl font-bold text-black">USD {wallet?.pending_payout.toFixed(2)}</h1>
            </div>
            <Link href="/">
          <Image src="/info.png" width={25} height={20} alt="info" />
        </Link>

        </div>
       </div>
    </div>
          )}
    <TransactionList />
   </div>
  );
}

