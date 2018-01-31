// Action Creators
import * as types from './types';

export const updateCell = (newValue, row, column) => {
  return {
    type: types.UPDATE_CELLS,
    newValue,
    row,
    column
  }
}

export const updateCurrentSelected = (newRow, newColumn) => {
  return {
    type: types.UPDATE_CURRENT_SELECTED,
    newRow,
    newColumn
  }
}
