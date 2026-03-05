export type KeyState = "untested" | "active" | "tested";

export interface KeyDef {
  code: string;
  label: string;
  /** Width multiplier (default 1 = 40px unit) */
  width?: number;
  /** Height units (default 1). */
  height?: number;
  /** optional sub-label */
  subLabel?: string;
}

export interface KeyRow {
  keys: KeyDef[];
}

export interface KeySection {
  id: string;
  rows: KeyRow[];
}

// Compact laptop keyboard layout (no numpad, no nav cluster)
export const laptopKeyboard: KeySection[] = [
  {
    id: "function-row",
    rows: [
      {
        keys: [
          { code: "Escape", label: "Esc" },
          { code: "F1", label: "F1", subLabel: "🔆" },
          { code: "F2", label: "F2", subLabel: "🔅" },
          { code: "F3", label: "F3", subLabel: "⊞" },
          { code: "F4", label: "F4", subLabel: "⌕" },
          { code: "F5", label: "F5", subLabel: "⟳" },
          { code: "F6", label: "F6", subLabel: "🔇" },
          { code: "F7", label: "F7", subLabel: "◄◄" },
          { code: "F8", label: "F8", subLabel: "▶||" },
          { code: "F9", label: "F9", subLabel: "▶▶" },
          { code: "F10", label: "F10", subLabel: "Mute" },
          { code: "F11", label: "F11", subLabel: "Vol-" },
          { code: "F12", label: "F12", subLabel: "Vol+" },
        ],
      },
    ],
  },
  {
    id: "main-keys",
    rows: [
      {
        // Number row
        keys: [
          { code: "Backquote", label: "`" },
          { code: "Digit1", label: "1" },
          { code: "Digit2", label: "2" },
          { code: "Digit3", label: "3" },
          { code: "Digit4", label: "4" },
          { code: "Digit5", label: "5" },
          { code: "Digit6", label: "6" },
          { code: "Digit7", label: "7" },
          { code: "Digit8", label: "8" },
          { code: "Digit9", label: "9" },
          { code: "Digit0", label: "0" },
          { code: "Minus", label: "-" },
          { code: "Equal", label: "=" },
          { code: "Backspace", label: "⌫ Back", width: 2 },
        ],
      },
      {
        // QWERTY row
        keys: [
          { code: "Tab", label: "Tab →", width: 1.5 },
          { code: "KeyQ", label: "Q" },
          { code: "KeyW", label: "W" },
          { code: "KeyE", label: "E" },
          { code: "KeyR", label: "R" },
          { code: "KeyT", label: "T" },
          { code: "KeyY", label: "Y" },
          { code: "KeyU", label: "U" },
          { code: "KeyI", label: "I" },
          { code: "KeyO", label: "O" },
          { code: "KeyP", label: "P" },
          { code: "BracketLeft", label: "[" },
          { code: "BracketRight", label: "]" },
          { code: "Backslash", label: "\\", width: 1.5 },
        ],
      },
      {
        // ASDF row
        keys: [
          { code: "CapsLock", label: "Caps", width: 1.75 },
          { code: "KeyA", label: "A" },
          { code: "KeyS", label: "S" },
          { code: "KeyD", label: "D" },
          { code: "KeyF", label: "F" },
          { code: "KeyG", label: "G" },
          { code: "KeyH", label: "H" },
          { code: "KeyJ", label: "J" },
          { code: "KeyK", label: "K" },
          { code: "KeyL", label: "L" },
          { code: "Semicolon", label: ";" },
          { code: "Quote", label: "'" },
          { code: "Enter", label: "Enter ↵", width: 2.25 },
        ],
      },
      {
        // ZXCV row
        keys: [
          { code: "ShiftLeft", label: "⇧ Shift", width: 2.25 },
          { code: "KeyZ", label: "Z" },
          { code: "KeyX", label: "X" },
          { code: "KeyC", label: "C" },
          { code: "KeyV", label: "V" },
          { code: "KeyB", label: "B" },
          { code: "KeyN", label: "N" },
          { code: "KeyM", label: "M" },
          { code: "Comma", label: "," },
          { code: "Period", label: "." },
          { code: "Slash", label: "/" },
          { code: "ShiftRight", label: "⇧ Shift", width: 2.75 },
        ],
      },
      {
        // Bottom row
        keys: [
          { code: "ControlLeft", label: "Ctrl", width: 1.5 },
          { code: "MetaLeft", label: "⊞ Win", width: 1.25 },
          { code: "AltLeft", label: "Alt", width: 1.25 },
          { code: "Space", label: "", width: 5.25 },
          { code: "AltRight", label: "Alt", width: 1.25 },
          { code: "Fn", label: "Fn", width: 1 },
          { code: "ControlRight", label: "Ctrl", width: 1.5 },
        ],
      },
    ],
  },
];

// Arrow key cluster for laptop (Up above, then Left/Down/Right)
export const arrowCluster = {
  upKey: { code: "ArrowUp", label: "▲" } as KeyDef,
  bottomRow: [
    { code: "ArrowLeft", label: "◄" } as KeyDef,
    { code: "ArrowDown", label: "▼" } as KeyDef,
    { code: "ArrowRight", label: "►" } as KeyDef,
  ],
};

// Collect all key codes for the laptop layout
export function getAllKeyCodes(): string[] {
  const codes: string[] = [];
  for (const section of laptopKeyboard) {
    for (const row of section.rows) {
      for (const key of row.keys) {
        // Fn key doesn't fire a real keycode, skip from count
        if (key.code !== "Fn") codes.push(key.code);
      }
    }
  }
  // Arrow keys
  codes.push(arrowCluster.upKey.code);
  for (const k of arrowCluster.bottomRow) {
    codes.push(k.code);
  }
  return codes;
}

// Keep these exports for backward compat (unused but avoid import errors)
export const mainKeyboard = laptopKeyboard;
export const navigationCluster = { id: "nav", rows: [] };
export const numpadCluster = { id: "numpad", rows: [] };
