"use client";

import { motion } from "framer-motion";

interface PantherMascotProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

export default function PantherMascot({
  className = "",
  size = 280,
  animated = true,
}: PantherMascotProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Glow effect behind mascot */}
      {animated && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Panther SVG - stylized black panther cub with golden cybernetic accents */}
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full h-full"
      >
        {/* Body silhouette */}
        <motion.path
          d="M200 80c-30 0-55 15-70 35-15 20-25 50-25 80 0 40 15 70 35 90 20 20 45 30 60 35 15 5 30 5 45 0 15-5 40-15 60-35 20-20 35-50 35-90 0-30-10-60-25-80-15-20-40-35-70-35h-45z"
          fill="#0B0B0F"
          stroke="#1A1A22"
          strokeWidth="1"
          animate={animated ? { scale: [1, 1.01, 1] } : undefined}
          transition={
            animated
              ? { duration: 6, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
        />

        {/* Head shape */}
        <path
          d="M155 120c0-25 20-50 45-50s45 25 45 50c0 15-5 30-15 40-10 10-20 15-30 15s-20-5-30-15c-10-10-15-25-15-40z"
          fill="#12121A"
        />

        {/* Left ear */}
        <path
          d="M160 90l-15-30c-2-4 0-8 4-9 8-2 18 5 22 15l-3 20z"
          fill="#12121A"
          stroke="#D4AF37"
          strokeWidth="0.5"
          opacity="0.6"
        />

        {/* Right ear */}
        <path
          d="M240 90l15-30c2-4 0-8-4-9-8-2-18 5-22 15l3 20z"
          fill="#12121A"
          stroke="#D4AF37"
          strokeWidth="0.5"
          opacity="0.6"
        />

        {/* Cybernetic circuit lines - left */}
        <motion.path
          d="M155 130l-20 10-15 25-5 30 5 20"
          stroke="#D4AF37"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          opacity="0.4"
          animate={
            animated
              ? { opacity: [0.2, 0.6, 0.2], pathLength: [0.8, 1, 0.8] }
              : undefined
          }
          transition={
            animated
              ? { duration: 4, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
        />

        {/* Cybernetic circuit lines - right */}
        <motion.path
          d="M245 130l20 10 15 25 5 30-5 20"
          stroke="#D4AF37"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          opacity="0.4"
          animate={
            animated
              ? {
                  opacity: [0.2, 0.6, 0.2],
                  pathLength: [0.8, 1, 0.8],
                }
              : undefined
          }
          transition={
            animated
              ? {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }
              : undefined
          }
        />

        {/* Cybernetic dots */}
        {[
          [130, 165],
          [120, 195],
          [115, 225],
          [270, 165],
          [280, 195],
          [285, 225],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r="2"
            fill="#D4AF37"
            opacity="0.4"
            animate={
              animated
                ? { opacity: [0.2, 0.7, 0.2], r: [1.5, 2.5, 1.5] }
                : undefined
            }
            transition={
              animated
                ? {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }
                : undefined
            }
          />
        ))}

        {/* Left eye */}
        <motion.ellipse
          cx="180"
          cy="115"
          rx="12"
          ry="8"
          fill="#D4AF37"
          animate={
            animated
              ? { opacity: [0.8, 1, 0.8], ry: [8, 7, 8] }
              : undefined
          }
          transition={
            animated
              ? { duration: 5, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
        />
        {/* Left pupil */}
        <ellipse cx="182" cy="115" rx="5" ry="6" fill="#0B0B0F" />
        <ellipse cx="183" cy="113" rx="2" ry="2" fill="#E8C84A" opacity="0.8" />

        {/* Right eye */}
        <motion.ellipse
          cx="220"
          cy="115"
          rx="12"
          ry="8"
          fill="#D4AF37"
          animate={
            animated
              ? { opacity: [0.8, 1, 0.8], ry: [8, 7, 8] }
              : undefined
          }
          transition={
            animated
              ? {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2,
                }
              : undefined
          }
        />
        {/* Right pupil */}
        <ellipse cx="222" cy="115" rx="5" ry="6" fill="#0B0B0F" />
        <ellipse cx="223" cy="113" rx="2" ry="2" fill="#E8C84A" opacity="0.8" />

        {/* Nose */}
        <path
          d="M195 130l5 5 5-5"
          stroke="#D4AF37"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />

        {/* Whiskers left */}
        <line
          x1="170"
          y1="128"
          x2="140"
          y2="125"
          stroke="#D4AF37"
          strokeWidth="0.5"
          opacity="0.3"
        />
        <line
          x1="170"
          y1="132"
          x2="140"
          y2="135"
          stroke="#D4AF37"
          strokeWidth="0.5"
          opacity="0.3"
        />

        {/* Whiskers right */}
        <line
          x1="230"
          y1="128"
          x2="260"
          y2="125"
          stroke="#D4AF37"
          strokeWidth="0.5"
          opacity="0.3"
        />
        <line
          x1="230"
          y1="132"
          x2="260"
          y2="135"
          stroke="#D4AF37"
          strokeWidth="0.5"
          opacity="0.3"
        />

        {/* Front paws */}
        <path
          d="M160 280c0 15-5 30 0 40 3 6 10 8 15 8s12-2 15-8c5-10 0-25 0-40"
          fill="#0B0B0F"
          stroke="#1A1A22"
          strokeWidth="0.5"
        />
        <path
          d="M225 280c0 15-5 30 0 40 3 6 10 8 15 8s12-2 15-8c5-10 0-25 0-40"
          fill="#0B0B0F"
          stroke="#1A1A22"
          strokeWidth="0.5"
        />

        {/* Gold accent on paws */}
        <motion.circle
          cx="175"
          cy="315"
          r="3"
          fill="#D4AF37"
          opacity="0.3"
          animate={animated ? { opacity: [0.2, 0.5, 0.2] } : undefined}
          transition={
            animated
              ? { duration: 4, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
        />
        <motion.circle
          cx="240"
          cy="315"
          r="3"
          fill="#D4AF37"
          opacity="0.3"
          animate={animated ? { opacity: [0.2, 0.5, 0.2] } : undefined}
          transition={
            animated
              ? {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }
              : undefined
          }
        />

        {/* Tail */}
        <motion.path
          d="M270 250c20-10 40-5 50 10 10 15 5 30-10 35"
          stroke="#12121A"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          animate={
            animated
              ? {
                  d: [
                    "M270 250c20-10 40-5 50 10 10 15 5 30-10 35",
                    "M270 250c25-15 45-3 52 12 8 18 3 32-12 37",
                    "M270 250c20-10 40-5 50 10 10 15 5 30-10 35",
                  ],
                }
              : undefined
          }
          transition={
            animated
              ? { duration: 8, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
        />
        {/* Tail gold tip */}
        <motion.circle
          cx="310"
          cy="295"
          r="4"
          fill="#D4AF37"
          opacity="0.5"
          animate={
            animated
              ? {
                  opacity: [0.3, 0.7, 0.3],
                  cx: [310, 312, 310],
                  cy: [295, 297, 295],
                }
              : undefined
          }
          transition={
            animated
              ? { duration: 8, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
        />

        {/* Spine circuit */}
        <motion.path
          d="M200 160l0 50 0 40"
          stroke="#D4AF37"
          strokeWidth="0.8"
          strokeDasharray="4 6"
          fill="none"
          opacity="0.25"
          animate={animated ? { strokeDashoffset: [0, -20] } : undefined}
          transition={
            animated
              ? { duration: 4, repeat: Infinity, ease: "linear" }
              : undefined
          }
        />
      </svg>

      {/* VIX text below mascot if size allows */}
      {size >= 200 && (
        <motion.div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <span
            className="text-xs tracking-[0.4em] uppercase font-medium"
            style={{ color: "rgba(212,175,55,0.4)" }}
          >
            VIX
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}
