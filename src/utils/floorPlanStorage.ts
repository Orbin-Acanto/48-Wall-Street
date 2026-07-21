import { FloorPlanData } from '../types/floorplan.types';
import { validateFloorPlanData } from './exportUtils';

/**
 * localStorage-backed persistence for the floor plan editor.
 *
 * Auto-save writes the current design here (debounced) so a refresh or an
 * accidental tab close does not lose the user's work. On load the editor
 * restores from here automatically. Everything is best-effort: any storage
 * error (private mode, quota, disabled storage) is swallowed so the editor
 * keeps working without persistence rather than crashing.
 */

const STORAGE_KEY = 'fpe:autosave:v1';

export const loadSavedFloorPlan = (): FloorPlanData | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    return validateFloorPlanData(data) ? (data as FloorPlanData) : null;
  } catch {
    return null;
  }
};

export const saveFloorPlan = (data: FloorPlanData): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore — quota exceeded, disabled storage, etc.
  }
};

export const clearSavedFloorPlan = (): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore.
  }
};
