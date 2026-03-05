import { useCallback, useEffect, useState } from "react";
import type { KeyState } from "../lib/keyboardLayout";
import { getAllKeyCodes } from "../lib/keyboardLayout";

const ALL_KEYS = getAllKeyCodes();

export interface KeyboardTesterState {
  keyStates: Record<string, KeyState>;
  lastKey: string | null;
  totalKeys: number;
  testedCount: number;
  reset: () => void;
}

export function useKeyboardTester(): KeyboardTesterState {
  const [keyStates, setKeyStates] = useState<Record<string, KeyState>>({});
  const [lastKey, setLastKey] = useState<string | null>(null);

  const reset = useCallback(() => {
    setKeyStates({});
    setLastKey(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent browser defaults for potentially disruptive keys
      const preventCodes = [
        "F1",
        "F3",
        "F5",
        "F7",
        "F8",
        "F10",
        "F11",
        "F12",
        "Space",
        "Tab",
        "Backspace",
        "Delete",
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "PageUp",
        "PageDown",
        "Home",
        "End",
        "ContextMenu",
      ];
      if (preventCodes.includes(e.code) || preventCodes.includes(e.key)) {
        e.preventDefault();
      }

      const code = e.code;
      setLastKey(code);
      setKeyStates((prev) => ({
        ...prev,
        [code]: "active",
      }));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const code = e.code;
      setKeyStates((prev) => ({
        ...prev,
        [code]: "tested",
      }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const testedCount = ALL_KEYS.filter(
    (code) => keyStates[code] === "tested" || keyStates[code] === "active",
  ).length;

  return {
    keyStates,
    lastKey,
    totalKeys: ALL_KEYS.length,
    testedCount,
    reset,
  };
}
