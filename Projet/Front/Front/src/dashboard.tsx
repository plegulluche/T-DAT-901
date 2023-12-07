// DASHBOARD PAGE //

import { FavouriteBook, StatsReport } from "iconoir-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

const data = [
  {
    name: "10h",
    price: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "11h",
    price: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "12h",
    price: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "13h",
    price: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "14h",
    price: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "15h",
    price: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "16h",
    price: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const data2 = [
  {
    name: "10h",
    price: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "11h",
    price: 2000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "12h",
    price: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "13h",
    price: 3780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "14h",
    price: 2890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "15h",
    price: 1390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "16h",
    price: 4000,
    pv: 2400,
    amt: 2400,
  },
];

export default function Dashboard() {
  const [time, setTime] = useState<string>("Daily");
  return (
    <div className="p-5">
      <div className="flex items-center gap-2 w-full justify-between py-2 px-5 bg-[#1B1B1B] rounded">
        <div className="flex gap-3 items-center">
          <FavouriteBook className="text-white dark:text-black" />
          <p className="text-white dark:text-black text-base font-normal">
            Favorite Cryptos
          </p>
        </div>
        <div className="pr-5">
          <select
            className="w-40 py-2 rounded bg-[#292929] text-white px-2"
            onChange={(e) => setTime(e.target.value)}
          >
            <option>Filter</option>
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
            <option>Yearly</option>
          </select>
        </div>
      </div>
      <div className="mt-5 w-full grid grid-cols-2 gap-5">
        <div className="flex flex-col justify-between items-center gap-2 w-full p-2 bg-[#1B1B1B] rounded h-[300px]">
          <p className="text-white font-semibold">BTC/USDT</p>
          <AreaChart
            width={680}
            height={260}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9159DC" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#9159DC" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} />
            <CartesianGrid opacity={0.2} strokeDasharray="1 1" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#9159DC"
              fillOpacity={0.6}
              fill="#481093"
            />
          </AreaChart>
        </div>
        <div className="flex flex-col justify-between items-center gap-2 w-full p-2 bg-[#1B1B1B] rounded h-[300px]">
          <p className="text-white font-semibold">ETH/USDT</p>
          <AreaChart
            width={680}
            height={260}
            data={data2}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9159DC" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#9159DC" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} />
            <CartesianGrid opacity={0.2} strokeDasharray="1 1" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#9159DC"
              fillOpacity={0.6}
              fill="#481093"
            />
          </AreaChart>
        </div>
        <div className="flex flex-col justify-between items-center gap-2 w-full p-2 bg-[#1B1B1B] rounded h-[300px]">
          <p className="text-white font-semibold">MATIC/USDT</p>
          <AreaChart
            width={680}
            height={260}
            data={data2}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9159DC" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#9159DC" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} />
            <CartesianGrid opacity={0.2} strokeDasharray="1 1" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#9159DC"
              fillOpacity={0.6}
              fill="#481093"
            />
          </AreaChart>
        </div>
        <div className="flex flex-col justify-between items-center gap-2 w-full p-2 bg-[#1B1B1B] rounded h-[300px]">
          <p className="text-white font-semibold">DOT/USDT</p>
          <AreaChart
            width={680}
            height={260}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9159DC" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#9159DC" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} />
            <CartesianGrid opacity={0.2} strokeDasharray="1 1" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#9159DC"
              fillOpacity={0.6}
              fill="#481093"
            />
          </AreaChart>
        </div>
      </div>
      <div className="flex items-center gap-2 w-full justify-between py-2 px-5 bg-[#1B1B1B] rounded mt-10">
        <div className="flex gap-3 items-center">
          <StatsReport className="text-white dark:text-black" />
          <p className="text-white dark:text-black text-base font-normal">
            Secondary Cryptos
          </p>
        </div>
        <div className="pr-5">
          <select
            className="w-40 py-2 rounded bg-[#292929] text-white px-2"
            onChange={(e) => setTime(e.target.value)}
          >
            <option>Filter</option>
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
            <option>Yearly</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-5 mt-5">
        <div className="flex flex-col justify-between items-center gap-2 w-full p-2 bg-[#1B1B1B] rounded h-[250px]">
          <p className="text-white font-semibold">XRP/USDT</p>
          <AreaChart
            width={350}
            height={200}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9159DC" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#9159DC" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} />
            <CartesianGrid opacity={0.2} strokeDasharray="1 1" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#9159DC"
              fillOpacity={0.6}
              fill="#481093"
            />
          </AreaChart>
        </div>
        <div className="flex flex-col justify-between items-center gap-2 w-full p-2 bg-[#1B1B1B] rounded h-[250px]">
          <p className="text-white font-semibold">XRP/USDT</p>
          <AreaChart
            width={350}
            height={200}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9159DC" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#9159DC" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} />
            <CartesianGrid opacity={0.2} strokeDasharray="1 1" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#9159DC"
              fillOpacity={0.6}
              fill="#481093"
            />
          </AreaChart>
        </div>
        <div className="flex flex-col justify-between items-center gap-2 w-full p-2 bg-[#1B1B1B] rounded h-[250px]">
          <p className="text-white font-semibold">XRP/USDT</p>
          <AreaChart
            width={350}
            height={200}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9159DC" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#9159DC" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} />
            <CartesianGrid opacity={0.2} strokeDasharray="1 1" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#9159DC"
              fillOpacity={0.6}
              fill="#481093"
            />
          </AreaChart>
        </div>
        <div className="flex flex-col justify-between items-center gap-2 w-full p-2 bg-[#1B1B1B] rounded h-[250px]">
          <p className="text-white font-semibold">XRP/USDT</p>
          <AreaChart
            width={350}
            height={200}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9159DC" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#9159DC" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} />
            <CartesianGrid opacity={0.2} strokeDasharray="1 1" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#9159DC"
              fillOpacity={0.6}
              fill="#481093"
            />
          </AreaChart>
        </div>
        <div className="flex flex-col justify-between items-center gap-2 w-full p-2 bg-[#1B1B1B] rounded h-[250px]">
          <p className="text-white font-semibold">XRP/USDT</p>
          <AreaChart
            width={350}
            height={200}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9159DC" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#9159DC" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} />
            <CartesianGrid opacity={0.2} strokeDasharray="1 1" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#9159DC"
              fillOpacity={0.6}
              fill="#481093"
            />
          </AreaChart>
        </div>
        <div className="flex flex-col justify-between items-center gap-2 w-full p-2 bg-[#1B1B1B] rounded h-[250px]">
          <p className="text-white font-semibold">XRP/USDT</p>
          <AreaChart
            width={350}
            height={200}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9159DC" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#9159DC" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} />
            <CartesianGrid opacity={0.2} strokeDasharray="1 1" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#9159DC"
              fillOpacity={0.6}
              fill="#481093"
            />
          </AreaChart>
        </div>
        <div className="flex flex-col justify-between items-center gap-2 w-full p-2 bg-[#1B1B1B] rounded h-[250px]">
          <p className="text-white font-semibold">XRP/USDT</p>
          <AreaChart
            width={350}
            height={200}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9159DC" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#9159DC" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} />
            <CartesianGrid opacity={0.2} strokeDasharray="1 1" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#9159DC"
              fillOpacity={0.6}
              fill="#481093"
            />
          </AreaChart>
        </div>
        <div className="flex flex-col justify-between items-center gap-2 w-full p-2 bg-[#1B1B1B] rounded h-[250px]">
          <p className="text-white font-semibold">XRP/USDT</p>
          <AreaChart
            width={350}
            height={200}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9159DC" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#9159DC" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} />
            <CartesianGrid opacity={0.2} strokeDasharray="1 1" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#9159DC"
              fillOpacity={0.6}
              fill="#481093"
            />
          </AreaChart>
        </div>
      </div>
    </div>
  );
}
