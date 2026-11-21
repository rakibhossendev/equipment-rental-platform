"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, PieChart as PieIcon, TrendingUp, AlertCircle } from "lucide-react";

// ==========================================
// 1. AREA / LINE CHART COMPONENT
// ==========================================
interface AreaChartProps {
  title: string;
  description?: string;
  data: { label: string; value: number }[];
  valuePrefix?: string;
  color?: string;
}

export function AreaChartComponent({
  title,
  description,
  data,
  valuePrefix = "৳",
  color = "#f59e0b",
}: AreaChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const hasData = data && data.length > 0 && data.some((d) => d.value > 0);

  const width = 600;
  const height = 240;
  const paddingX = 40;
  const paddingTop = 25;
  const paddingBottom = 35;

  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingTop - paddingBottom;

  const maxValue = hasData ? Math.max(...data.map((d) => d.value)) * 1.15 : 100;
  const minValue = 0;

  const points = data.map((d, index) => {
    const x = paddingX + (index / (data.length - 1 || 1)) * chartWidth;
    const y = paddingTop + chartHeight - ((d.value - minValue) / (maxValue - minValue || 1)) * chartHeight;
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, curr, idx) => {
    return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
  }, "");

  const areaD = points.length > 0
    ? `${pathD} L ${points[points.length - 1].x} ${paddingTop + chartHeight} L ${points[0].x} ${paddingTop + chartHeight} Z`
    : "";

  return (
    <Card className="glass-card border-border/70 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          {description && <CardDescription className="text-xs">{description}</CardDescription>}
        </div>
        <div className="flex size-9 items-center justify-center rounded-xl bg-brand/10 text-brand">
          <TrendingUp className="size-4" />
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        {!hasData ? (
          <div className="flex h-56 flex-col items-center justify-center rounded-xl border border-dashed border-border/70 text-center">
            <AlertCircle className="mb-2 size-6 text-muted-foreground" />
            <p className="text-sm font-medium text-muted-foreground">No transaction data recorded yet</p>
            <p className="text-xs text-muted-foreground/80">Completed payments will reflect in this chart</p>
          </div>
        ) : (
          <div className="relative w-full overflow-hidden">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
              <defs>
                <linearGradient id={`area-gradient-${title.replace(/\s+/g, "")}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity="0.35" />
                  <stop offset="100%" stopColor={color} stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                const y = paddingTop + chartHeight * ratio;
                const tickVal = Math.round(maxValue * (1 - ratio));
                return (
                  <g key={i}>
                    <line
                      x1={paddingX}
                      y1={y}
                      x2={width - paddingX}
                      y2={y}
                      stroke="currentColor"
                      strokeOpacity="0.1"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={paddingX - 6}
                      y={y + 3}
                      textAnchor="end"
                      className="fill-muted-foreground text-[10px]"
                    >
                      {valuePrefix}{tickVal >= 1000 ? `${(tickVal / 1000).toFixed(1)}k` : tickVal}
                    </text>
                  </g>
                );
              })}

              {/* Area & Line */}
              <path d={areaD} fill={`url(#area-gradient-${title.replace(/\s+/g, "")})`} />
              <path d={pathD} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />

              {/* Data points & X Labels */}
              {points.map((p, idx) => (
                <g key={idx}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={hoveredIndex === idx ? 6 : 4}
                    fill={color}
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                  <text
                    x={p.x}
                    y={height - 8}
                    textAnchor="middle"
                    className="fill-muted-foreground text-[10px]"
                  >
                    {p.label}
                  </text>
                </g>
              ))}
            </svg>

            {/* Hover tooltip */}
            {hoveredIndex !== null && points[hoveredIndex] && (
              <div
                className="pointer-events-none absolute -top-1 rounded-md bg-foreground px-2.5 py-1 text-xs text-background shadow-md transition-all"
                style={{
                  left: `${(points[hoveredIndex].x / width) * 100}%`,
                  transform: "translateX(-50%)",
                }}
              >
                <div className="font-semibold">{points[hoveredIndex].label}</div>
                <div>{valuePrefix}{points[hoveredIndex].value.toLocaleString()}</div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ==========================================
// 2. BAR CHART COMPONENT
// ==========================================
interface BarChartProps {
  title: string;
  description?: string;
  data: { label: string; value: number }[];
  barColor?: string;
  valueSuffix?: string;
}

export function BarChartComponent({
  title,
  description,
  data,
  barColor = "#3b82f6",
  valueSuffix = "",
}: BarChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const hasData = data && data.length > 0 && data.some((d) => d.value > 0);

  const width = 600;
  const height = 240;
  const paddingX = 40;
  const paddingTop = 25;
  const paddingBottom = 35;

  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingTop - paddingBottom;

  const maxValue = hasData ? Math.max(...data.map((d) => d.value)) * 1.2 : 10;
  const barWidth = Math.min(36, chartWidth / (data.length * 1.6));

  return (
    <Card className="glass-card border-border/70 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          {description && <CardDescription className="text-xs">{description}</CardDescription>}
        </div>
        <div className="flex size-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
          <BarChart3 className="size-4" />
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        {!hasData ? (
          <div className="flex h-56 flex-col items-center justify-center rounded-xl border border-dashed border-border/70 text-center">
            <AlertCircle className="mb-2 size-6 text-muted-foreground" />
            <p className="text-sm font-medium text-muted-foreground">No bookings activity recorded yet</p>
            <p className="text-xs text-muted-foreground/80">Rental bookings will display here month by month</p>
          </div>
        ) : (
          <div className="relative w-full overflow-hidden">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
              {/* Horizontal grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                const y = paddingTop + chartHeight * ratio;
                const tickVal = Math.round(maxValue * (1 - ratio));
                return (
                  <g key={i}>
                    <line
                      x1={paddingX}
                      y1={y}
                      x2={width - paddingX}
                      y2={y}
                      stroke="currentColor"
                      strokeOpacity="0.1"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={paddingX - 6}
                      y={y + 3}
                      textAnchor="end"
                      className="fill-muted-foreground text-[10px]"
                    >
                      {tickVal}
                    </text>
                  </g>
                );
              })}

              {/* Bars */}
              {data.map((d, idx) => {
                const x = paddingX + (idx + 0.5) * (chartWidth / data.length) - barWidth / 2;
                const barHeight = Math.max(3, (d.value / (maxValue || 1)) * chartHeight);
                const y = paddingTop + chartHeight - barHeight;
                const isHovered = hoveredIndex === idx;

                return (
                  <g key={idx}>
                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={barHeight}
                      rx={4}
                      fill={barColor}
                      fillOpacity={isHovered ? 1 : 0.85}
                      className="cursor-pointer transition-all duration-200"
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    />
                    <text
                      x={x + barWidth / 2}
                      y={height - 8}
                      textAnchor="middle"
                      className="fill-muted-foreground text-[10px]"
                    >
                      {d.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Hover tooltip */}
            {hoveredIndex !== null && data[hoveredIndex] && (
              <div
                className="pointer-events-none absolute -top-1 rounded-md bg-foreground px-2.5 py-1 text-xs text-background shadow-md transition-all"
                style={{
                  left: `${((paddingX + (hoveredIndex + 0.5) * (chartWidth / data.length)) / width) * 100}%`,
                  transform: "translateX(-50%)",
                }}
              >
                <div className="font-semibold">{data[hoveredIndex].label}</div>
                <div>{data[hoveredIndex].value} {valueSuffix}</div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ==========================================
// 3. PIE / DONUT CHART COMPONENT
// ==========================================
interface DonutChartProps {
  title: string;
  description?: string;
  data: { label: string; value: number }[];
  colors?: string[];
}

const DEFAULT_PALETTE = [
  "#f59e0b", // Amber
  "#3b82f6", // Blue
  "#10b981", // Green
  "#8b5cf6", // Purple
  "#ec4899", // Pink
  "#06b6d4", // Cyan
  "#f97316", // Orange
  "#6b7280", // Gray
];

function computeDonutSlices(
  cleanData: { label: string; value: number }[],
  total: number,
  circumference: number,
  colors: string[]
) {
  let accumulated = 0;
  return cleanData.map((d, idx) => {
    const percent = d.value / (total || 1);
    const offset = accumulated;
    accumulated += percent;
    return {
      ...d,
      idx,
      percent,
      strokeDasharray: `${percent * circumference} ${circumference}`,
      strokeDashoffset: -offset * circumference,
      color: colors[idx % colors.length],
    };
  });
}

export function DonutChartComponent({
  title,
  description,
  data,
  colors = DEFAULT_PALETTE,
}: DonutChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const cleanData = data.filter((d) => d.value > 0);
  const total = cleanData.reduce((acc, curr) => acc + curr.value, 0);
  const hasData = cleanData.length > 0 && total > 0;

  // Donut calculations
  const size = 180;
  const center = size / 2;
  const radius = 68;
  const strokeWidth = 24;
  const circumference = 2 * Math.PI * radius;

  const slices = computeDonutSlices(cleanData, total, circumference, colors);

  return (
    <Card className="glass-card border-border/70 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          {description && <CardDescription className="text-xs">{description}</CardDescription>}
        </div>
        <div className="flex size-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500">
          <PieIcon className="size-4" />
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        {!hasData ? (
          <div className="flex h-56 flex-col items-center justify-center rounded-xl border border-dashed border-border/70 text-center">
            <AlertCircle className="mb-2 size-6 text-muted-foreground" />
            <p className="text-sm font-medium text-muted-foreground">No categorical distribution data</p>
            <p className="text-xs text-muted-foreground/80">Active equipment listings will populate this chart</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-around py-2">
            {/* SVG Donut */}
            <div className="relative size-[180px] shrink-0">
              <svg viewBox={`0 0 ${size} ${size}`} className="size-full -rotate-90">
                {slices.map((slice) => {
                  const isHovered = hoveredIdx === slice.idx;

                  return (
                    <circle
                      key={slice.idx}
                      cx={center}
                      cy={center}
                      r={radius}
                      fill="transparent"
                      stroke={slice.color}
                      strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                      strokeDasharray={slice.strokeDasharray}
                      strokeDashoffset={slice.strokeDashoffset}
                      className="cursor-pointer transition-all duration-200"
                      onMouseEnter={() => setHoveredIdx(slice.idx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                    />
                  );
                })}
              </svg>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-bold tracking-tight text-foreground">
                  {hoveredIdx !== null ? cleanData[hoveredIdx].value : total}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {hoveredIdx !== null ? cleanData[hoveredIdx].label : "Total Items"}
                </span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto w-full sm:w-auto pr-2">
              {slices.map((slice) => {
                const pct = ((slice.value / total) * 100).toFixed(0);
                const isHovered = hoveredIdx === slice.idx;

                return (
                  <div
                    key={slice.idx}
                    className={`flex items-center justify-between gap-4 rounded-md px-2 py-1 text-xs transition-colors cursor-pointer ${
                      isHovered ? "bg-muted font-medium" : "text-muted-foreground hover:bg-muted/50"
                    }`}
                    onMouseEnter={() => setHoveredIdx(slice.idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="size-2.5 rounded-full" style={{ backgroundColor: slice.color }} />
                      <span className="truncate max-w-[120px] text-foreground">{slice.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{slice.value}</span>
                      <span className="text-[10px] text-muted-foreground">({pct}%)</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
