import { useEffect } from 'react';

interface KeyboardShortcutsHandlers {
  onUndo?: () => void;
  onRedo?: () => void;
  onSave?: () => void;
  onDelete?: () => void;
  onEscape?: () => void;
  onToggleGrid?: () => void;
  onToggleDimensions?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onCopy?: () => void;
  onPaste?: () => void;
}

export const useKeyboardShortcuts = (handlers: KeyboardShortcutsHandlers) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInputField =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modifier = isMac ? e.metaKey : e.ctrlKey;

      // Undo
      if (modifier && e.key === 'z' && !e.shiftKey && handlers.onUndo) {
        e.preventDefault();
        handlers.onUndo();
        return;
      }

      // Redo
      if (
        ((modifier && e.key === 'y') ||
          (modifier && e.shiftKey && e.key === 'z')) &&
        handlers.onRedo
      ) {
        e.preventDefault();
        handlers.onRedo();
        return;
      }

      // Save
      if (modifier && e.key === 's' && handlers.onSave) {
        e.preventDefault();
        handlers.onSave();
        return;
      }

      // Copy
      if (
        modifier &&
        e.key.toLowerCase() === 'c' &&
        handlers.onCopy &&
        !isInputField
      ) {
        e.preventDefault();
        handlers.onCopy();
        return;
      }

      // Paste
      if (
        modifier &&
        e.key.toLowerCase() === 'v' &&
        handlers.onPaste &&
        !isInputField
      ) {
        e.preventDefault();
        handlers.onPaste();
        return;
      }

      // Delete
      if (
        (e.key === 'Delete' || e.key === 'Backspace') &&
        !isInputField &&
        handlers.onDelete
      ) {
        e.preventDefault();
        handlers.onDelete();
        return;
      }

      // Cancel
      if (e.key === 'Escape' && handlers.onEscape) {
        handlers.onEscape();
        return;
      }

      // grid Toogle
      if (
        e.key === 'g' &&
        !modifier &&
        !isInputField &&
        handlers.onToggleGrid
      ) {
        e.preventDefault();
        handlers.onToggleGrid();
        return;
      }

      // Dimensions Toogle
      if (
        e.key === 'd' &&
        !modifier &&
        !isInputField &&
        handlers.onToggleDimensions
      ) {
        e.preventDefault();
        handlers.onToggleDimensions();
        return;
      }
      // Zoom Control
      if (
        (e.key === '+' || e.key === '=') &&
        !isInputField &&
        handlers.onZoomIn
      ) {
        e.preventDefault();
        handlers.onZoomIn();
        return;
      }

      if (e.key === '-' && !isInputField && handlers.onZoomOut) {
        e.preventDefault();
        handlers.onZoomOut();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handlers]);
};
