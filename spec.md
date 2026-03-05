# Keyboard Tester

## Current State
The app is a gaming-style keyboard tester with a full 104-key desktop layout including:
- A main keyboard section (function row + main keys + bottom row)
- A separate navigation cluster (PrtSc/ScrLk/Pause, Ins/Home/PgUp/Del/End/PgDn, arrows)
- A numpad cluster (NumLock, 0-9, operators, Enter)
- Stats panel with progress tracker, last key pressed, and reset button
- Gaming Mode badge, OKLCH dark color theme, animated key highlights

## Requested Changes (Diff)

### Add
- Laptop-style compact layout with arrow keys integrated into the bottom-right area of the main keyboard (no separate nav cluster panel)
- `Fn` key in the bottom row (already exists in bottom row)

### Modify
- **keyboardLayout.ts**: Remove `numpadCluster` export usage and redefine the layout as a single compact laptop keyboard:
  - Function row: Esc + F1-F12 (no PrtSc/ScrLk/Pause at end)
  - Number row: ` 1 2 3 4 5 6 7 8 9 0 - = Backspace
  - QWERTY row: Tab Q W E R T Y U I O P [ ] \
  - ASDF row: CapsLock A S D F G H J K L ; ' Enter
  - ZXCV row: ShiftLeft Z X C V B N M , . / ShiftRight
  - Bottom row: Ctrl Win Alt Space Alt Fn Ctrl
  - Arrow cluster at bottom-right, tucked next to the bottom row (Up arrow above Down, Left/Down/Right in a row)
- **KeyboardTester.tsx**: Replace three-cluster layout (main + nav + numpad) with a single compact laptop layout. Remove numpad rendering. Integrate arrow keys visually at bottom-right. Update subtitle to "Laptop Keyboard · 75 Keys". Remove nav cluster and numpad panels.
- **getAllKeyCodes()** in keyboardLayout.ts: Only count laptop keys (no numpad, no PrtSc/ScrLk/Pause/Ins/Home/PgUp/Del/End/PgDn).
- Header subtitle: Change from "Full Size Keyboard · 104 Keys" to "Laptop Keyboard · 75 Keys"
- Keyboard product label: Change from "FULL SIZE 104" to "LAPTOP 75"

### Remove
- `numpadCluster` export and rendering
- `navigationCluster` separate panel rendering
- PrtSc, ScrLk, Pause, Insert, Home, PageUp, Delete, End, PageDown keys (not on standard laptop)

## Implementation Plan
1. Rewrite `keyboardLayout.ts`:
   - Remove `numpadCluster`
   - Remove `navigationCluster`
   - Define `laptopKeyboard` as a single KeySection array with all rows including arrow area
   - Create a separate `arrowCluster` definition (Up above, Left/Down/Right row)
   - Update `getAllKeyCodes()` to only include laptop keys
2. Rewrite `KeyboardTester.tsx`:
   - Import `laptopKeyboard` and `arrowCluster` instead of old clusters
   - Render main keyboard rows
   - Render arrow keys in a compact cluster to the right of the bottom row (or below the last row, right-aligned)
   - Update header subtitle and label text
   - Keep all stats, last-key panel, reset, gaming badge unchanged
