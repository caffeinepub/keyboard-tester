import { Activity, Keyboard, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useKeyboardTester } from "../hooks/useKeyboardTester";
import {
  type KeyState,
  arrowCluster,
  laptopKeyboard,
  navigationCluster,
  numpadCluster,
  sysKeyCluster,
} from "../lib/keyboardLayout";
import { KeyCap } from "./KeyCap";

let globalKeyIndex = 0;
function nextIndex() {
  return ++globalKeyIndex;
}

function getKeyState(
  code: string,
  keyStates: Record<string, KeyState>,
): KeyState {
  return keyStates[code] ?? "untested";
}

function getKeyLabel(code: string): string {
  const map: Record<string, string> = {
    Escape: "Esc",
    F1: "F1",
    F2: "F2",
    F3: "F3",
    F4: "F4",
    F5: "F5",
    F6: "F6",
    F7: "F7",
    F8: "F8",
    F9: "F9",
    F10: "F10",
    F11: "F11",
    F12: "F12",
    ArrowUp: "▲",
    ArrowLeft: "◄",
    ArrowDown: "▼",
    ArrowRight: "►",
    Backquote: "`",
    Minus: "-",
    Equal: "=",
    Backspace: "Backspace",
    Tab: "Tab",
    BracketLeft: "[",
    BracketRight: "]",
    Backslash: "\\",
    CapsLock: "Caps",
    Semicolon: ";",
    Quote: "'",
    Enter: "Enter",
    ShiftLeft: "Shift",
    ShiftRight: "Shift",
    Comma: ",",
    Period: ".",
    Slash: "/",
    ControlLeft: "Ctrl",
    ControlRight: "Ctrl",
    MetaLeft: "Win",
    MetaRight: "Win",
    AltLeft: "Alt",
    AltRight: "Alt",
    Space: "Space",
    ContextMenu: "Menu",
    Fn: "Fn",
    PrintScreen: "PrtSc",
    ScrollLock: "ScrLk",
    Pause: "Pause",
  };
  if (code.startsWith("Key")) return code.slice(3);
  if (code.startsWith("Digit")) return code.slice(5);
  return map[code] ?? code;
}

// Confetti piece config
interface ConfettiPiece {
  id: number;
  left: number;
  color: string;
  delay: number;
  size: number;
  duration: number;
}

const CONFETTI_COLORS = [
  "oklch(0.72 0.25 25)",
  "oklch(0.78 0.22 55)",
  "oklch(0.75 0.20 130)",
  "oklch(0.72 0.22 195)",
  "oklch(0.70 0.24 280)",
  "oklch(0.76 0.22 320)",
  "oklch(0.80 0.20 100)",
  "oklch(0.74 0.26 10)",
];

function generateConfetti(count: number): ConfettiPiece[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    delay: Math.random() * 0.8,
    size: 6 + Math.random() * 8,
    duration: 1.5 + Math.random() * 1,
  }));
}

export default function KeyboardTester() {
  const {
    keyStates,
    lastKey,
    totalKeys,
    testedCount,
    streak,
    soundEnabled,
    setSoundEnabled,
    reset,
  } = useKeyboardTester();
  const progressPct = totalKeys > 0 ? (testedCount / totalKeys) * 100 : 0;

  // Confetti: show only once when 100% is reached
  const confettiFiredRef = useRef(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPieces] = useState(() => generateConfetti(20));

  useEffect(() => {
    if (
      testedCount === totalKeys &&
      totalKeys > 0 &&
      !confettiFiredRef.current
    ) {
      confettiFiredRef.current = true;
      setShowConfetti(true);
      // Remove confetti after animation
      setTimeout(() => setShowConfetti(false), 2500);
    }
    // Reset confetti flag on reset (when testedCount drops back to 0)
    if (testedCount === 0) {
      confettiFiredRef.current = false;
    }
  }, [testedCount, totalKeys]);

  // Reset global key index before render
  globalKeyIndex = 0;

  return (
    <div
      className="min-h-screen flex flex-col items-center scanline-bg"
      style={{ background: "oklch(0.11 0.008 260)" }}
    >
      {/* Confetti overlay */}
      {showConfetti && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 50,
            overflow: "hidden",
          }}
        >
          {confettiPieces.map((piece) => (
            <div
              key={piece.id}
              style={{
                position: "absolute",
                top: "-20px",
                left: `${piece.left}%`,
                width: `${piece.size}px`,
                height: `${piece.size}px`,
                background: piece.color,
                borderRadius: Math.random() > 0.5 ? "50%" : "2px",
                animation: `confettiFall ${piece.duration}s ease-in ${piece.delay}s forwards`,
              }}
            />
          ))}
        </div>
      )}

      {/* Header */}
      <header className="w-full max-w-[1100px] px-6 pt-8 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-1"
        >
          <div
            className="p-2 rounded-md border"
            style={{
              background: "oklch(0.18 0.015 255)",
              borderColor: "oklch(0.28 0.02 255)",
            }}
          >
            <Keyboard size={20} style={{ color: "oklch(0.80 0.20 195)" }} />
          </div>
          <div>
            <h1
              className="text-xl font-bold tracking-tight glow-cyan flex items-center gap-2"
              style={{
                fontFamily: "Geist Mono, ui-monospace, monospace",
                color: "oklch(0.88 0.20 195)",
              }}
            >
              KEYBOARD TESTER
              <sup
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  padding: "1px 5px",
                  borderRadius: "4px",
                  background: "oklch(0.20 0.05 195)",
                  border: "1px solid oklch(0.50 0.18 195)",
                  color: "oklch(0.82 0.22 195)",
                  verticalAlign: "super",
                  lineHeight: 1.4,
                }}
              >
                3.0
              </sup>
            </h1>
            <p className="text-xs" style={{ color: "oklch(0.50 0.015 200)" }}>
              Full-Size Keyboard · 104 Keys · v3.0
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Activity size={14} style={{ color: "oklch(0.55 0.015 200)" }} />
            <span
              className="text-xs"
              style={{ color: "oklch(0.55 0.015 200)" }}
            >
              Press any key to test
            </span>
          </div>
        </motion.div>
      </header>

      {/* Stats panel */}
      <motion.section
        data-ocid="keyboard.stats_panel"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full max-w-[1100px] px-6 mb-5"
      >
        <div
          className="rounded-lg border p-4 flex flex-col sm:flex-row sm:items-center gap-4"
          style={{
            background: "oklch(0.15 0.01 260)",
            borderColor: "oklch(0.24 0.015 255)",
          }}
        >
          {/* Progress */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-xs font-semibold"
                style={{ color: "oklch(0.60 0.015 200)" }}
              >
                KEYS TESTED
              </span>
              <div className="flex items-center gap-3">
                {/* Big animated percentage */}
                <motion.span
                  key={Math.round(progressPct)}
                  initial={{ scale: 0.85, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="text-3xl font-bold glow-cyan"
                  style={{
                    color:
                      progressPct === 100
                        ? "oklch(0.72 0.18 152)"
                        : "oklch(0.82 0.20 195)",
                    fontFamily: "Geist Mono, ui-monospace, monospace",
                    lineHeight: 1,
                  }}
                >
                  {Math.round(progressPct)}%
                </motion.span>
                <span
                  className="text-sm font-bold"
                  style={{
                    color:
                      progressPct === 100
                        ? "oklch(0.72 0.18 152)"
                        : "oklch(0.82 0.20 195)",
                  }}
                >
                  {testedCount} / {totalKeys}
                </span>
              </div>
            </div>
            {/* Progress bar with shimmer */}
            <div
              className="relative h-2 rounded-full overflow-hidden"
              style={{ background: "oklch(0.20 0.01 260)" }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full overflow-hidden"
                style={{
                  background:
                    progressPct === 100
                      ? "linear-gradient(to right, oklch(0.60 0.18 152), oklch(0.72 0.18 152))"
                      : "linear-gradient(to right, oklch(0.60 0.20 195), oklch(0.82 0.20 195))",
                  boxShadow:
                    progressPct === 100
                      ? "0 0 8px oklch(0.68 0.18 152 / 0.6)"
                      : "0 0 8px oklch(0.80 0.20 195 / 0.6)",
                }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.3 }}
              >
                {/* Shimmer overlay */}
                <div className="absolute inset-0 shimmer-overlay rounded-full" />
              </motion.div>
            </div>
            <div className="flex mt-1.5 gap-4">
              <span
                className="text-xs"
                style={{ color: "oklch(0.45 0.01 200)" }}
              >
                {Math.round(progressPct)}% complete
              </span>
              {progressPct === 100 && (
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xs font-semibold glow-green"
                  style={{ color: "oklch(0.72 0.18 152)" }}
                >
                  ✓ All keys tested!
                </motion.span>
              )}
            </div>
          </div>

          {/* Legend */}
          <div className="flex gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-[2px] border"
                style={{
                  background: "oklch(0.18 0.01 255)",
                  borderColor: "oklch(0.28 0.015 255)",
                }}
              />
              <span
                className="text-xs"
                style={{ color: "oklch(0.50 0.010 200)" }}
              >
                Untested
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-[2px] border"
                style={{
                  background: "oklch(0.80 0.20 195)",
                  borderColor: "oklch(0.88 0.18 195)",
                }}
              />
              <span
                className="text-xs"
                style={{ color: "oklch(0.50 0.010 200)" }}
              >
                Active
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-[2px] border"
                style={{
                  background: "oklch(0.68 0.18 152)",
                  borderColor: "oklch(0.76 0.20 152)",
                }}
              />
              <span
                className="text-xs"
                style={{ color: "oklch(0.50 0.010 200)" }}
              >
                Tested
              </span>
            </div>
          </div>

          {/* Gaming Mode Badge */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-bold tracking-widest select-none"
            style={{
              background: "oklch(0.16 0.04 30)",
              borderColor: "oklch(0.55 0.22 35)",
              color: "oklch(0.85 0.22 35)",
              fontFamily: "Geist Mono, ui-monospace, monospace",
              letterSpacing: "0.14em",
              animation: "gamingBadgePulse 2s ease-in-out infinite",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "oklch(0.75 0.28 35)",
                display: "inline-block",
                boxShadow: "0 0 6px oklch(0.75 0.28 35 / 0.9)",
                flexShrink: 0,
              }}
            />
            GAMING MODE
          </div>

          {/* Streak counter */}
          <AnimatePresence>
            {streak > 0 && (
              <motion.div
                key="streak"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-bold select-none glow-orange"
                style={{
                  background: "oklch(0.16 0.04 45)",
                  borderColor: "oklch(0.55 0.22 45)",
                  color: "oklch(0.80 0.22 45)",
                  fontFamily: "Geist Mono, ui-monospace, monospace",
                  letterSpacing: "0.10em",
                }}
              >
                🔥 STREAK: {streak}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sound toggle */}
          <button
            type="button"
            data-ocid="keyboard.sound_toggle"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-2 px-4 py-2 rounded-md border text-xs font-semibold transition-all duration-150"
            style={{
              background: soundEnabled
                ? "oklch(0.18 0.04 195)"
                : "oklch(0.18 0.01 260)",
              borderColor: soundEnabled
                ? "oklch(0.60 0.18 195)"
                : "oklch(0.28 0.015 255)",
              color: soundEnabled
                ? "oklch(0.82 0.20 195)"
                : "oklch(0.65 0.015 200)",
              letterSpacing: "0.05em",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "oklch(0.22 0.015 260)";
              e.currentTarget.style.borderColor = "oklch(0.82 0.20 195)";
              e.currentTarget.style.color = "oklch(0.82 0.20 195)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = soundEnabled
                ? "oklch(0.18 0.04 195)"
                : "oklch(0.18 0.01 260)";
              e.currentTarget.style.borderColor = soundEnabled
                ? "oklch(0.60 0.18 195)"
                : "oklch(0.28 0.015 255)";
              e.currentTarget.style.color = soundEnabled
                ? "oklch(0.82 0.20 195)"
                : "oklch(0.65 0.015 200)";
            }}
          >
            {soundEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
            {soundEnabled ? "SFX ON" : "SFX OFF"}
          </button>

          {/* Reset */}
          <button
            type="button"
            data-ocid="keyboard.reset_button"
            onClick={reset}
            className="flex items-center gap-2 px-4 py-2 rounded-md border text-xs font-semibold transition-all duration-150"
            style={{
              background: "oklch(0.18 0.01 260)",
              borderColor: "oklch(0.28 0.015 255)",
              color: "oklch(0.65 0.015 200)",
              letterSpacing: "0.05em",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "oklch(0.22 0.015 260)";
              e.currentTarget.style.borderColor = "oklch(0.82 0.20 195)";
              e.currentTarget.style.color = "oklch(0.82 0.20 195)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "oklch(0.18 0.01 260)";
              e.currentTarget.style.borderColor = "oklch(0.28 0.015 255)";
              e.currentTarget.style.color = "oklch(0.65 0.015 200)";
            }}
          >
            <RotateCcw size={12} />
            RESET
          </button>
        </div>
      </motion.section>

      {/* Last key panel */}
      <motion.div
        data-ocid="keyboard.last_key_panel"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="w-full max-w-[1100px] px-6 mb-4"
      >
        <div
          className="rounded-md border px-4 py-2 flex items-center gap-3"
          style={{
            background: "oklch(0.14 0.008 260)",
            borderColor: "oklch(0.22 0.012 255)",
            minHeight: "38px",
          }}
        >
          <span className="text-xs" style={{ color: "oklch(0.45 0.01 200)" }}>
            LAST KEY:
          </span>
          <AnimatePresence mode="wait">
            {lastKey ? (
              <motion.span
                key={lastKey}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.12 }}
                className="text-sm font-bold"
                style={{
                  color: "oklch(0.88 0.20 195)",
                  fontFamily: "Geist Mono, ui-monospace, monospace",
                }}
              >
                {getKeyLabel(lastKey)}
                <span
                  className="ml-2 text-xs font-normal"
                  style={{ color: "oklch(0.45 0.01 200)" }}
                >
                  ({lastKey})
                </span>
              </motion.span>
            ) : (
              <motion.span
                key="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs"
                style={{ color: "oklch(0.38 0.01 200)" }}
              >
                — waiting for input...
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Keyboard */}
      <motion.main
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-[1100px] px-4 pb-6"
      >
        <div
          data-ocid="keyboard.canvas_target"
          className="keyboard-bg rounded-xl p-4 overflow-x-auto"
        >
          {/* Full 104-key layout: main block + nav cluster + numpad */}
          <div className="inline-flex flex-row gap-3 min-w-max items-start">
            {/* ── Left block: function row + main keys + arrow cluster ── */}
            <div className="flex flex-col gap-1">
              {laptopKeyboard.map((section) =>
                section.rows.map((row, rowIdx) => {
                  const isLastMainRow =
                    section.id === "main-keys" &&
                    rowIdx === section.rows.length - 1;

                  return (
                    <div
                      key={`${section.id}-${rowIdx}`}
                      className="flex gap-1 items-end"
                      style={{
                        marginBottom: section.id === "function-row" ? "6px" : 0,
                      }}
                    >
                      {row.keys.map((keyDef) => {
                        const idx = nextIndex();
                        return (
                          <KeyCap
                            key={keyDef.code}
                            keyDef={keyDef}
                            state={getKeyState(keyDef.code, keyStates)}
                            index={idx}
                            totalKeys={totalKeys}
                          />
                        );
                      })}

                      {/* Arrow cluster on bottom row */}
                      {isLastMainRow && (
                        <div className="flex flex-col gap-1 ml-1">
                          <div className="flex justify-center">
                            <KeyCap
                              keyDef={arrowCluster.upKey}
                              state={getKeyState(
                                arrowCluster.upKey.code,
                                keyStates,
                              )}
                              index={nextIndex()}
                              totalKeys={totalKeys}
                            />
                          </div>
                          <div className="flex gap-1">
                            {arrowCluster.bottomRow.map((keyDef) => (
                              <KeyCap
                                key={keyDef.code}
                                keyDef={keyDef}
                                state={getKeyState(keyDef.code, keyStates)}
                                index={nextIndex()}
                                totalKeys={totalKeys}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }),
              )}
            </div>

            {/* ── Middle: sys keys (PrtSc/ScrLk/Pause) + nav cluster ── */}
            <div
              className="flex flex-col gap-1"
              style={{
                marginTop: "calc(40px + 10px)" /* align below fn row gap */,
              }}
            >
              {/* PrtSc / ScrLk / Pause row */}
              {sysKeyCluster.rows.map((row, rowIdx) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: fixed-order rows
                  key={`sys-${rowIdx}`}
                  className="flex gap-1"
                  style={{ marginBottom: "6px" }}
                >
                  {row.keys.map((keyDef) => (
                    <KeyCap
                      key={keyDef.code}
                      keyDef={keyDef}
                      state={getKeyState(keyDef.code, keyStates)}
                      index={nextIndex()}
                      totalKeys={totalKeys}
                    />
                  ))}
                </div>
              ))}
              {/* Ins/Home/PgUp + Del/End/PgDn */}
              {navigationCluster.rows.map((row, rowIdx) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: fixed-order rows
                  key={`nav-${rowIdx}`}
                  className="flex gap-1"
                >
                  {row.keys.map((keyDef) => (
                    <KeyCap
                      key={keyDef.code}
                      keyDef={keyDef}
                      state={getKeyState(keyDef.code, keyStates)}
                      index={nextIndex()}
                      totalKeys={totalKeys}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* ── Right: numpad ── */}
            <div
              className="flex flex-col gap-1"
              style={{ marginTop: "calc(40px + 10px)" }}
            >
              {numpadCluster.rows.map((row, rowIdx) => {
                // Numpad+ spans rows 1-2, NumpadEnter spans rows 3-4
                const isPhantomRow =
                  (rowIdx === 2 &&
                    row.keys.every((k) => k.code === "NumpadAdd")) ||
                  (rowIdx === 4 &&
                    row.keys.every((k) => k.code === "NumpadEnter"));

                if (isPhantomRow) return null;

                return (
                  <div
                    // biome-ignore lint/suspicious/noArrayIndexKey: fixed-order rows
                    key={`numpad-${rowIdx}`}
                    className="flex gap-1 items-start"
                  >
                    {row.keys.map((keyDef) => (
                      <KeyCap
                        key={keyDef.code}
                        keyDef={keyDef}
                        state={getKeyState(keyDef.code, keyStates)}
                        index={nextIndex()}
                        totalKeys={totalKeys}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Product label */}
          <div className="flex justify-end mt-1 pr-1 pointer-events-none">
            <span
              className="text-xs tracking-widest font-semibold select-none"
              style={{
                color: "oklch(0.72 0.22 195)",
                opacity: 0.55,
                fontFamily: "Geist Mono, ui-monospace, monospace",
                letterSpacing: "0.18em",
                fontSize: "9px",
              }}
            >
              GAMING 3.0 · 104 KEYS
            </span>
          </div>
        </div>
      </motion.main>

      {/* Footer */}
      <footer className="w-full max-w-[1100px] px-6 py-4 mt-auto">
        <p
          className="text-center text-xs"
          style={{ color: "oklch(0.35 0.01 200)" }}
        >
          Keyboard Tester v3.0 ·{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline transition-colors"
            style={{ color: "oklch(0.50 0.015 200)" }}
          >
            Built with ♥ using caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
