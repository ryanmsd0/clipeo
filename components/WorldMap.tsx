"use client";

import { useMemo, useRef } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";

type Pt = { lat: number; lng: number; label?: string };
interface MapProps {
  dots?: Array<{ start: Pt; end: Pt }>;
  lineColor?: string;
  animationDuration?: number;
}

export default function WorldMap({
  dots = [],
  lineColor = "#55a4d1",
  animationDuration = 2,
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  const map = useMemo(() => new DottedMap({ height: 100, grid: "diagonal" }), []);
  const svgMap = useMemo(
    () =>
      map.getSVG({
        radius: 0.22,
        color: "#0a124033",
        shape: "circle",
        backgroundColor: "transparent",
      }),
    [map]
  );

  const projectPoint = (lat: number, lng: number) => ({
    x: (lng + 180) * (800 / 360),
    y: (90 - lat) * (400 / 180),
  });

  const createCurvedPath = (s: { x: number; y: number }, e: { x: number; y: number }) => {
    const midX = (s.x + e.x) / 2;
    const midY = Math.min(s.y, e.y) - 50;
    return `M ${s.x} ${s.y} Q ${midX} ${midY} ${e.x} ${e.y}`;
  };

  const staggerDelay = 0.3;
  const totalAnimationTime = dots.length * staggerDelay + animationDuration;
  const pauseTime = 2;
  const fullCycleDuration = totalAnimationTime + pauseTime;

  return (
    <div style={{ width: "100%", aspectRatio: "2 / 1", position: "relative", overflow: "hidden" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        alt="Carte du monde"
        draggable={false}
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
          pointerEvents: "none",
          userSelect: "none",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 45%, #000 60%, transparent 78%)",
          maskImage: "radial-gradient(circle at 50% 45%, #000 60%, transparent 78%)",
        }}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        preserveAspectRatio="xMidYMid meet"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      >
        <defs>
          <linearGradient id="wm-path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <filter id="wm-glow">
            <feMorphology operator="dilate" radius="0.5" />
            <feGaussianBlur stdDeviation="1.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {dots.map((dot, i) => {
          const s = projectPoint(dot.start.lat, dot.start.lng);
          const e = projectPoint(dot.end.lat, dot.end.lng);
          const startTime = (i * staggerDelay) / fullCycleDuration;
          const endTime = (i * staggerDelay + animationDuration) / fullCycleDuration;
          const resetTime = totalAnimationTime / fullCycleDuration;
          const d = createCurvedPath(s, e);
          return (
            <g key={`p-${i}`}>
              <motion.path
                d={d}
                fill="none"
                stroke="url(#wm-path-gradient)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 0, 1, 1, 0] }}
                transition={{
                  duration: fullCycleDuration,
                  times: [0, startTime, endTime, resetTime, 1],
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 0,
                }}
              />
              <motion.circle
                r="3.5"
                fill={lineColor}
                initial={{ opacity: 0 }}
                animate={{
                  offsetDistance: ["0%", "0%", "100%", "100%", "100%"],
                  opacity: [0, 0, 1, 0, 0],
                }}
                transition={{
                  duration: fullCycleDuration,
                  times: [0, startTime, endTime, resetTime, 1],
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 0,
                }}
                style={{ offsetPath: `path('${d}')` }}
              />
            </g>
          );
        })}

        {dots.map((dot, i) => {
          const s = projectPoint(dot.start.lat, dot.start.lng);
          const e = projectPoint(dot.end.lat, dot.end.lng);
          const isParis = i === 0;
          return (
            <g key={`pt-${i}`}>
              {/* origine (France), orange, une seule fois */}
              {isParis && (
                <g>
                  <circle cx={s.x} cy={s.y} r="4" fill="#ff6a3d" filter="url(#wm-glow)" />
                  <circle cx={s.x} cy={s.y} r="4" fill="#ff6a3d" opacity="0.5">
                    <animate attributeName="r" from="4" to="16" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
                  </circle>
                </g>
              )}
              {/* destination */}
              <g>
                <circle cx={e.x} cy={e.y} r="2.6" fill={lineColor} filter="url(#wm-glow)" />
                <circle cx={e.x} cy={e.y} r="2.6" fill={lineColor} opacity="0.5">
                  <animate attributeName="r" from="2.6" to="11" dur="2s" begin="0.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.6" to="0" dur="2s" begin="0.4s" repeatCount="indefinite" />
                </circle>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
