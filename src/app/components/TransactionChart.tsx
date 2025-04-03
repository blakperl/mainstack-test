"use client";

import { LineChart, Line, XAxis, CartesianGrid, ResponsiveContainer } from "recharts";
interface Transaction {
  date: string;
  amount: number;
}

interface AggregatedTransaction {
  date: string;
  amount: number;
}

const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("en-US", options);
};

const TransactionChart = ({ transactions }: { transactions: Transaction[] }) => {
  const aggregatedData: Record<string, AggregatedTransaction> = transactions.reduce((acc, transaction) => {
    const date = transaction.date;
    const amount = transaction.amount;

    if (!acc[date]) {
      acc[date] = { date, amount };
    } else {
      acc[date].amount += amount;
    }

    return acc;
  }, {} as Record<string, AggregatedTransaction>);

  const data: AggregatedTransaction[] = Object.values(aggregatedData).sort((a, b) => { return new Date(a.date).getTime() - new Date(b.date).getTime();});

  const firstDate = data[0]?.date;
  const lastDate = data[data.length - 1]?.date;

  console.log("First Date:", firstDate);
  console.log("Last Date:", lastDate);

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date"
            tickFormatter={formatDate}
            ticks={[firstDate, lastDate]} 
            interval="preserveStartEnd" 
          />
          <Line type="monotone" dataKey="amount" stroke="#FF5403" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionChart;
