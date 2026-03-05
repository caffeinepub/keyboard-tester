# Keyboard Tester

## Current State
Full 104-key keyboard tester with main keyboard, navigation cluster, and numpad. Generic layout without HP K100 specific key arrangement.

## Requested Changes (Diff)

### Add
- HP K100 branding label on keyboard body
- HP K100 specific function row with media key labels (F1–F12 with dual-function icons like Mute, Vol-, Vol+, Play, Prev, Next, Stop, etc.)
- Correct bottom row: Ctrl | Win | Alt | Space | Alt | Fn | Menu | Ctrl (already present, keep as is)

### Modify
- Update function row to match HP K100: F1-F4 show media/screen shortcuts, F5-F8 show media playback, F9-F12 show volume/speaker shortcuts
- Add sub-labels to function keys showing HP K100 secondary functions (e.g. F1: "?", F2: "⭳", F3: multimedia, etc.)
- Make keyboard body styling match HP K100's dark matte look with slightly larger key styling
- Header subtitle to say "HP K100 Wired Keyboard"

### Remove
- Generic "PC / Laptop full 104-key layout" subtitle

## Implementation Plan
1. Update keyboardLayout.ts function row keys to include HP K100 sub-labels
2. Update KeyboardTester.tsx header subtitle
3. Update keyboard body to show "HP K100" branding text
