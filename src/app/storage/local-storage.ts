import { SortOrder, isSortOrder } from "../kintone/space-thread"

const SORTONE_SELECTED_OPTION = "sortone:selected-option"

export const loadSelectedOption = (
  callback: (selectedOption: SortOrder | null) => void
) => {
  const lastSelectedOption = localStorage.getItem(SORTONE_SELECTED_OPTION)
  if (isSortOrder(lastSelectedOption)) {
    callback(lastSelectedOption)
  } else {
    callback(null)
  }
}

export const saveSelectedOption = (selectedOption: SortOrder) => {
  // 念のため
  if (isSortOrder(selectedOption)) {
    localStorage.setItem(SORTONE_SELECTED_OPTION, selectedOption)
  }
}
