import { Activity, Keyboard, RotateCcw } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useKeyboardTester } from "../hooks/useKeyboardTester";
import {
  type KeyDef,
  type KeyState,
  mainKeyboard,
  navigationCluster,
  numpad,
} from "../lib/keyboardLayout";
import { KeyCap } from "./KeyCap";

const KEY_SIZE = 40;

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
    PrintScreen: "PrtSc",
    ScrollLock: "ScrLk",
    Pause: "Pause",
    Insert: "Ins",
    Home: "Home",
    PageUp: "PgUp",
    Delete: "Del",
    End: "End",
    PageDown: "PgDn",
    ArrowUp: "▲",
    ArrowLeft: "◄",
    ArrowDown: "▼",
    ArrowRight: "►",
    NumLock: "Num",
    NumpadDivide: "/",
    NumpadMultiply: "*",
    NumpadSubtract: "−",
    NumpadAdd: "+",
    NumpadEnter: "Enter",
    NumpadDecimal: ".",
    Numpad0: "0",
    Numpad1: "1",
    Numpad2: "2",
    Numpad3: "3",
    Numpad4: "4",
    Numpad5: "5",
    Numpad6: "6",
    Numpad7: "7",
    Numpad8: "8",
    Numpad9: "9",
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
  };
  if (code.startsWith("Key")) return code.slice(3);
  if (code.startsWith("Digit")) return code.slice(5);
  return map[code] ?? code;
}

export default function KeyboardTester() {
  const { keyStates, lastKey, totalKeys, testedCount, reset } =
    useKeyboardTester();
  const progressPct = totalKeys > 0 ? (testedCount / totalKeys) * 100 : 0;

  // Reset global key index before render
  globalKeyIndex = 0;

  const year = new Date().getFullYear();

  return (
    <div
      className="min-h-screen flex flex-col items-center scanline-bg"
      style={{ background: "oklch(0.11 0.008 260)" }}
    >
      {/* Header */}
      <header className="w-full max-w-[1200px] px-6 pt-8 pb-4">
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
              className="text-xl font-bold tracking-tight glow-cyan"
              style={{
                fontFamily: "Geist Mono, ui-monospace, monospace",
                color: "oklch(0.88 0.20 195)",
              }}
            >
              KEYBOARD TESTER
            </h1>
            <p className="text-xs" style={{ color: "oklch(0.50 0.015 200)" }}>
              HP K100 Wired Keyboard · 104 Keys
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
        className="w-full max-w-[1200px] px-6 mb-5"
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
            {/* Progress bar */}
            <div
              className="relative h-2 rounded-full overflow-hidden"
              style={{ background: "oklch(0.20 0.01 260)" }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
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
              />
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
        className="w-full max-w-[1200px] px-6 mb-4"
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
        className="w-full max-w-[1200px] px-4 pb-6"
      >
        <div
          data-ocid="keyboard.canvas_target"
          className="keyboard-bg rounded-xl p-4 overflow-x-auto"
        >
          <div className="inline-flex gap-3 min-w-max relative">
            {/* Left: main keyboard */}
            <div className="flex flex-col gap-1">
              {mainKeyboard.map((section) => (
                <div key={section.id} className="flex flex-col gap-1">
                  {section.rows.map((row, rowIdx) => (
                    <div
                      // biome-ignore lint/suspicious/noArrayIndexKey: keyboard rows are fixed-order
                      key={rowIdx}
                      className="flex gap-1"
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
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Right clusters */}
            <div className="flex gap-2 ml-1">
              {/* Navigation cluster */}
              <div className="flex flex-col gap-1 mt-[46px]">
                {navigationCluster.rows.map((row, rowIdx) => (
                  <div
                    // biome-ignore lint/suspicious/noArrayIndexKey: nav cluster rows are fixed-order
                    key={rowIdx}
                    className="flex gap-1"
                    style={{
                      height:
                        row.keys.length === 0 ? `${KEY_SIZE}px` : undefined,
                      justifyContent: rowIdx === 3 ? "center" : "flex-start",
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
                        />
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Numpad */}
              <div className="flex flex-col gap-1 mt-[46px]">
                {numpad.rows.map((row, rowIdx) => (
                  <NumpadRow
                    // biome-ignore lint/suspicious/noArrayIndexKey: numpad rows are fixed-order
                    key={rowIdx}
                    row={row}
                    keyStates={keyStates}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* HP K100 product label */}
          <div className="absolute bottom-0 right-0 pb-0.5 pr-1 pointer-events-none">
            <span
              className="text-xs tracking-widest font-semibold select-none"
              style={{
                color: "oklch(0.55 0.012 200)",
                opacity: 0.4,
                fontFamily: "Geist Mono, ui-monospace, monospace",
                letterSpacing: "0.18em",
                fontSize: "9px",
              }}
            >
              HP K100
            </span>
          </div>
        </div>
      </motion.main>

      {/* Footer */}
      <footer className="w-full max-w-[1200px] px-6 py-4 mt-auto">
        <p
          className="text-center text-xs"
          style={{ color: "oklch(0.35 0.01 200)" }}
        >
          © {year}.{" "}
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

// Numpad rows need special handling for the tall + and Enter keys
function NumpadRow({
  row,
  keyStates,
}: {
  row: { keys: KeyDef[] };
  keyStates: Record<string, KeyState>;
}) {
  const KEY_SIZE_PX = 40;
  const KEY_GAP_PX = 4;

  const tallKeys: Record<string, number> = {
    NumpadAdd: 2,
    NumpadEnter: 2,
  };

  return (
    <div className="flex gap-1">
      {row.keys.map((keyDef) => {
        const isTall = !!tallKeys[keyDef.code];
        const idx = nextIndex();
        const widthPx =
          (keyDef.width ?? 1) * KEY_SIZE_PX +
          ((keyDef.width ?? 1) - 1) * KEY_GAP_PX;
        const heightPx = isTall ? 2 * KEY_SIZE_PX + KEY_GAP_PX : KEY_SIZE_PX;

        const state = getKeyState(keyDef.code, keyStates);

        return (
          <TallKeyCap
            key={keyDef.code}
            keyDef={keyDef}
            state={state}
            index={idx}
            widthPx={widthPx}
            heightPx={heightPx}
          />
        );
      })}
    </div>
  );
}

interface TallKeyCapProps {
  keyDef: KeyDef;
  state: KeyState;
  index: number;
  widthPx: number;
  heightPx: number;
}

function TallKeyCap({
  keyDef,
  state,
  index,
  widthPx,
  heightPx,
}: TallKeyCapProps) {
  const isActive = state === "active";
  const isTested = state === "tested";

  function getStateClass(s: KeyState): string {
    switch (s) {
      case "active":
        return "key-active";
      case "tested":
        return "key-tested";
      default:
        return "key-untested";
    }
  }

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
      }}
      animate={{
        scale: isActive ? 0.94 : 1,
        y: isActive ? 3 : 0,
      }}
      transition={{ duration: 0.05 }}
    >
      {/* Shine */}
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
      {isTested && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-1 right-1 w-1 h-1 rounded-full"
          style={{ background: "oklch(0.90 0 0 / 0.5)" }}
        />
      )}
      <span
        className="relative z-10 leading-tight text-center px-0.5"
        style={{
          fontSize: keyDef.label.length > 3 ? "9px" : "11px",
          lineHeight: 1.2,
        }}
      >
        {keyDef.label}
      </span>
      {keyDef.subLabel && (
        <span
          className="relative z-10 leading-tight"
          style={{ fontSize: "8px", opacity: 0.6 }}
        >
          {keyDef.subLabel}
        </span>
      )}
    </motion.div>
  );
}
