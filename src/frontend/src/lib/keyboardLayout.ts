export type KeyState = "untested" | "active" | "tested";

export interface KeyDef {
  code: string;
  label: string;
  /** Tailwind width units as a number (default 1 = w-10) */
  width?: number;
  /** optional sub-label for numpad keys etc */
  subLabel?: string;
}

export interface KeyRow {
  keys: KeyDef[];
}

export interface KeySection {
  id: string;
  rows: KeyRow[];
}

// Main keyboard sections
export const mainKeyboard: KeySection[] = [
  {
    id: "function-row",
    rows: [
      {
        keys: [
          { code: "Escape", label: "Esc", subLabel: "fn" },
          { code: "F1", label: "F1", subLabel: "Help" },
          { code: "F2", label: "F2", subLabel: "Dim" },
          { code: "F3", label: "F3", subLabel: "Search" },
          { code: "F4", label: "F4", subLabel: "Close" },
          { code: "F5", label: "F5", subLabel: "Refr" },
          { code: "F6", label: "F6" },
          { code: "F7", label: "F7", subLabel: "|◄◄" },
          { code: "F8", label: "F8", subLabel: "►||" },
          { code: "F9", label: "F9", subLabel: "►►|" },
          { code: "F10", label: "F10", subLabel: "Mute" },
          { code: "F11", label: "F11", subLabel: "Vol-" },
          { code: "F12", label: "F12", subLabel: "Vol+" },
          { code: "PrintScreen", label: "PrtSc" },
          { code: "ScrollLock", label: "ScrLk" },
          { code: "Pause", label: "Pause" },
        ],
      },
    ],
  },
  {
    id: "main-keys",
    rows: [
      {
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
        keys: [
          { code: "ControlLeft", label: "Ctrl", width: 1.25 },
          { code: "MetaLeft", label: "⊞ Win", width: 1.25 },
          { code: "AltLeft", label: "Alt", width: 1.25 },
          { code: "Space", label: "", width: 6.25 },
          { code: "AltRight", label: "Alt", width: 1.25 },
          { code: "Fn", label: "Fn", width: 1.25 },
          { code: "ContextMenu", label: "☰", width: 1.25 },
          { code: "ControlRight", label: "Ctrl", width: 1.25 },
        ],
      },
    ],
  },
];

export const navigationCluster: KeySection = {
  id: "nav-cluster",
  rows: [
    {
      keys: [
        { code: "Insert", label: "Ins" },
        { code: "Home", label: "Home" },
        { code: "PageUp", label: "PgUp" },
      ],
    },
    {
      keys: [
        { code: "Delete", label: "Del" },
        { code: "End", label: "End" },
        { code: "PageDown", label: "PgDn" },
      ],
    },
    {
      keys: [], // spacer row
    },
    {
      keys: [{ code: "ArrowUp", label: "▲" }],
    },
    {
      keys: [
        { code: "ArrowLeft", label: "◄" },
        { code: "ArrowDown", label: "▼" },
        { code: "ArrowRight", label: "►" },
      ],
    },
  ],
};

export const numpad: KeySection = {
  id: "numpad",
  rows: [
    {
      keys: [
        { code: "NumLock", label: "Num" },
        { code: "NumpadDivide", label: "/" },
        { code: "NumpadMultiply", label: "*" },
        { code: "NumpadSubtract", label: "−" },
      ],
    },
    {
      keys: [
        { code: "Numpad7", label: "7", subLabel: "Home" },
        { code: "Numpad8", label: "8", subLabel: "▲" },
        { code: "Numpad9", label: "9", subLabel: "PgUp" },
        { code: "NumpadAdd", label: "+", width: 1 },
      ],
    },
    {
      keys: [
        { code: "Numpad4", label: "4", subLabel: "◄" },
        { code: "Numpad5", label: "5" },
        { code: "Numpad6", label: "6", subLabel: "►" },
      ],
    },
    {
      keys: [
        { code: "Numpad1", label: "1", subLabel: "End" },
        { code: "Numpad2", label: "2", subLabel: "▼" },
        { code: "Numpad3", label: "3", subLabel: "PgDn" },
        { code: "NumpadEnter", label: "↵", width: 1 },
      ],
    },
    {
      keys: [
        { code: "Numpad0", label: "0", subLabel: "Ins", width: 2 },
        { code: "NumpadDecimal", label: ".", subLabel: "Del" },
      ],
    },
  ],
};

// Collect all key codes for stats
export function getAllKeyCodes(): string[] {
  const codes: string[] = [];
  for (const section of mainKeyboard) {
    for (const row of section.rows) {
      for (const key of row.keys) {
        if (key.code !== "Fn") codes.push(key.code);
      }
    }
  }
  for (const row of navigationCluster.rows) {
    for (const key of row.keys) {
      codes.push(key.code);
    }
  }
  for (const row of numpad.rows) {
    for (const key of row.keys) {
      codes.push(key.code);
    }
  }
  return codes;
}
