/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useTheme } from "@/providers";
import { ChartDataPoint } from "../types";

export function ChartComponent({ data }: { data: ChartDataPoint[] }) {
  const { theme } = useTheme();

  // Import recharts only when this component is loaded
  const {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
  } = require("recharts");

  // Theme-aware colors
  const colors = {
    tick: theme === "dark" ? "#737373" : "#525252",
    axis: theme === "dark" ? "#404040" : "#e5e5e5",
    cpuStroke: theme === "dark" ? "#666666" : "#a3a3a3",
    memoryStroke: theme === "dark" ? "#999999" : "#d4d4d4",
  };

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-(--surface-primary) border border-(--border-primary) rounded-md p-2 text-xs shadow-xs">
          <p className="text-(--text-primary) font-medium">{`${label}`}</p>
          <p className="text-(--text-tertiary)">{`CPU: ${payload[0].value}%`}</p>
          <p className="text-(--text-tertiary)">{`Memory: ${payload[1].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div dir="ltr" className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 5, right: 5, left: -40, bottom: -10 }}
        >
          <defs>
            <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={colors.cpuStroke}
                stopOpacity={0.7}
              />
              <stop
                offset="95%"
                stopColor={colors.cpuStroke}
                stopOpacity={0.1}
              />
            </linearGradient>
            <linearGradient id="colorMemory" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={colors.memoryStroke}
                stopOpacity={0.7}
              />
              <stop
                offset="95%"
                stopColor={colors.memoryStroke}
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            tick={{ fill: colors.tick, fontSize: 9 }}
            axisLine={{ stroke: colors.axis }}
            tickLine={{ stroke: colors.axis }}
          />
          <YAxis
            tick={{ fill: colors.tick, fontSize: 9 }}
            axisLine={{ stroke: colors.axis }}
            tickLine={{ stroke: colors.axis }}
            domain={[0, 100]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="cpu"
            name="CPU"
            stroke={colors.cpuStroke}
            fillOpacity={1}
            fill="url(#colorCpu)"
            animationDuration={1000}
          />
          <Area
            type="monotone"
            dataKey="memory"
            name="Memory"
            stroke={colors.memoryStroke}
            fillOpacity={1}
            fill="url(#colorMemory)"
            animationDuration={1000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
