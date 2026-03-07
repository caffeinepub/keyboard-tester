import { motion } from "motion/react";
import type { KeyDef, KeyState } from "../lib/keyboardLayout";

interface KeyCapProps {
  keyDef: KeyDef;
  state: KeyState;
  index: number;
  totalKeys?: number;
}

const WIDTH_UNIT = 40; // px per width unit
const HEIGHT_UNIT = 40; // px per height unit
const KEY_GAP = 4; // px

function getStateClass(state: KeyState): string {
  switch (state) {
    case "active":
      return "key-active";
    case "tested":
      return "";
    default:
      return "key-untested";
  }
}

export function KeyCap({ keyDef, state, index, totalKeys = 104 }: KeyCapProps) {
  const widthPx =
    (keyDef.width ?? 1) * WIDTH_UNIT + ((keyDef.width ?? 1) - 1) * KEY_GAP;
  const heightUnits = keyDef.height ?? 1;
  const heightPx = heightUnits * HEIGHT_UNIT + (heightUnits - 1) * KEY_GAP;
  const isActive = state === "active";
  const isTested = state === "tested";

  // Per-key rainbow hue for tested state
  const keyHue = Math.round((index / totalKeys) * 360);

  // Tested key dynamic style: hue-rotate shifts the base green color across the spectrum
  const testedStyle = isTested
    ? {
        background: "oklch(0.68 0.18 152)",
        borderColor: "oklch(0.76 0.20 152)",
        boxShadow:
          "0 4px 0 oklch(0.40 0.15 152), 0 6px 12px oklch(0.68 0.18 152 / 0.3)",
        color: "oklch(0.08 0.01 260)",
        filter: `hue-rotate(${keyHue}deg) brightness(1.1)`,
      }
    : {};

  return (
    <motion.div
      data-ocid={`keyboard.key.${index}`}
      data-key-code={keyDef.code}
      className={`relative flex flex-col items-center justify-center border rounded-[4px] select-none cursor-default transition-all duration-75 ${getStateClass(state)}`}
      style={{
        width: `${widthPx}px`,
        minWidth: `${widthPx}px`,
        height: `${heightPx}px`,
        flexShrink: 0,
        fontSize: keyDef.label.length > 3 ? "9px" : "11px",
        fontFamily: "Geist Mono, ui-monospace, monospace",
        fontWeight: 600,
        letterSpacing: "0.02em",
        borderWidth: "1px",
        position: "relative",
        overflow: "hidden",
        ...testedStyle,
      }}
      animate={{
        scale: isActive ? 0.94 : 1,
        y: isActive ? 3 : 0,
      }}
      transition={{ duration: 0.05 }}
    >
      {/* Keycap inner shine */}
      <div
        className="absolute inset-0 rounded-[3px] pointer-events-none"
        style={{
          background: isActive
            ? "linear-gradient(to bottom, oklch(1 0 0 / 0.10), transparent 60%)"
            : isTested
              ? "linear-gradient(to bottom, oklch(1 0 0 / 0.15), transparent 60%)"
              : "linear-gradient(to bottom, oklch(1 0 0 / 0.07), transparent 60%)",
        }}
      />

      {/* Indicator dot for tested keys */}
      {isTested && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-1 right-1 w-1 h-1 rounded-full"
          style={{ background: "oklch(0.90 0 0 / 0.5)" }}
        />
      )}

      {/* Ripple animation on active */}
      {isActive && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 5 }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background: "oklch(0.95 0.22 195 / 0.4)",
              animation: "ripple 0.4s ease-out forwards",
            }}
          />
        </div>
      )}

      {/* Active glow burst */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 pointer-events-none rounded-[3px]"
          style={{
            boxShadow:
              "inset 0 0 18px oklch(0.95 0.22 195 / 0.7), 0 0 20px oklch(0.85 0.22 195 / 0.6), 0 0 40px oklch(0.80 0.22 195 / 0.4)",
          }}
        />
      )}

      {/* Label */}
      <span
        className="relative z-10 leading-tight text-center px-0.5"
        style={{
          lineHeight: 1.2,
          wordBreak: "keep-all",
          whiteSpace: "nowrap",
          maxWidth: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {keyDef.label}
      </span>

      {/* Sub-label */}
      {keyDef.subLabel && (
        <span
          className="relative z-10 leading-tight text-center"
          style={{ fontSize: "8px", opacity: 0.6 }}
        >
          {keyDef.subLabel}
        </span>
      )}
    </motion.div>
  );
}
