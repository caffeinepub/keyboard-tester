import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyState } from "../lib/keyboardLayout";
import { getAllKeyCodes } from "../lib/keyboardLayout";

const ALL_KEYS = getAllKeyCodes();

export interface KeyboardTesterState {
  keyStates: Record<string, KeyState>;
  lastKey: string | null;
  totalKeys: number;
  testedCount: number;
  streak: number;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  reset: () => void;
}

function playClickSound() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 800;
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch {
    // AudioContext may be unavailable in some environments
  }
}

export function useKeyboardTester(): KeyboardTesterState {
  const [keyStates, setKeyStates] = useState<Record<string, KeyState>>({});
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const streakTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const soundEnabledRef = useRef(soundEnabled);
  soundEnabledRef.current = soundEnabled;

  const reset = useCallback(() => {
    setKeyStates({});
    setLastKey(null);
    setStreak(0);
    if (streakTimerRef.current) {
      clearTimeout(streakTimerRef.current);
      streakTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    // Track active keys to handle missing keyup for F-keys
    const activeKeyTimers: Record<string, ReturnType<typeof setTimeout>> = {};

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent browser defaults for all function keys and navigation keys
      // Always call preventDefault first to intercept before browser acts
      const preventCodes = [
        "F1",
        "F2",
        "F3",
        "F4",
        "F5",
        "F6",
        "F7",
        "F8",
        "F9",
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
        "PrintScreen",
        "ScrollLock",
        "Pause",
        "Insert",
      ];
      if (preventCodes.includes(e.code) || preventCodes.includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
      }

      // Play sound if enabled
      if (soundEnabledRef.current) {
        playClickSound();
      }

      const code = e.code;
      setLastKey(code);
      setKeyStates((prev) => ({
        ...prev,
        [code]: "active",
      }));

      // For function keys and keys that may not fire keyup, auto-transition to tested
      const isFunctionKey = /^F\d+$/.test(code);
      if (isFunctionKey) {
        if (activeKeyTimers[code]) clearTimeout(activeKeyTimers[code]);
        activeKeyTimers[code] = setTimeout(() => {
          setKeyStates((prev) => ({
            ...prev,
            [code]: "tested",
          }));
          delete activeKeyTimers[code];
        }, 300);
      }

      // Update streak
      setStreak((prev) => prev + 1);

      // Reset streak timer
      if (streakTimerRef.current) {
        clearTimeout(streakTimerRef.current);
      }
      streakTimerRef.current = setTimeout(() => {
        setStreak(0);
      }, 2000);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const code = e.code;
      // Cancel auto-timer if keyup fires normally
      if (activeKeyTimers[code]) {
        clearTimeout(activeKeyTimers[code]);
        delete activeKeyTimers[code];
      }
      setKeyStates((prev) => ({
        ...prev,
        [code]: "tested",
      }));
    };

    // Use capture phase so we intercept F-keys before browser handles them
    window.addEventListener("keydown", handleKeyDown, { capture: true });
    window.addEventListener("keyup", handleKeyUp, { capture: true });

    return () => {
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
      window.removeEventListener("keyup", handleKeyUp, { capture: true });
      // Clear all auto-timers
      for (const timer of Object.values(activeKeyTimers)) {
        clearTimeout(timer);
      }
    };
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (streakTimerRef.current) {
        clearTimeout(streakTimerRef.current);
      }
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
    streak,
    soundEnabled,
    setSoundEnabled,
    reset,
  };
}
