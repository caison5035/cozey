import { TOrderAddData } from "./interface";

// Check if object has non-empty values
export function hasEmptyValues(obj: TOrderAddData) {
  for (const value of Object.values(obj)) {
    if (value === null || value === undefined || value === '') {
      return true;
    }
  }
  return false;
}