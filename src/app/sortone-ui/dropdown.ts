import "../../styles/sortone-ui/dropdown.scss"
import { html, render } from "lit-html"
import { SortOrder, isSortOrder } from "../kintone/space-thread"
import {
  saveSelectedOption,
  removeSelectedOption,
} from "../storage/local-storage"

const SORTONE_UI_DROPDOWN_PARENT_CLASSNAME = "sortone-ui-dropdown-parent"
const SORTONE_UI_DROPDOWN_CLASSNAME = "sortone-ui-dropdown"
const SORTONE_UI_DROPDOWN_OPTIONS_CLASSNAME = "sortone-ui-dropdown-options"
const SORTONE_UI_DROPDOWN_FIXED_CLASSNAME = "sortone-ui-dropdown-fixed"
const SORTONE_UI_SELECT_ID = "sortone-ui-select"
const SORTONE_UI_SELECT_MENU_CLASSNAME = "sortone-ui-select-menu"
const SORTONE_UI_SELECT_MENU_SELECTED_CLASSNAME =
  "sortone-ui-select-menu-selected"
const SORTONE_UI_CANCEL_BUTTON_ID = "sortone-ui-select-cancel"

// ドロップダウンメニューに表示する選択肢
export const SORT_MENUS = [
  { label: "並び替えの条件", sortType: null },
  { label: "いいねが多い順", sortType: SortOrder.LIKE_DESC },
  { label: "いいねが少ない順", sortType: SortOrder.LIKE_ASC },
  { label: "日付が新しい順", sortType: SortOrder.CREATED_DESC },
  { label: "返信が多い順", sortType: SortOrder.REPLY_DESC },
]

export class DropdownState {
  static selected: SortOrder | null = null
}

export const renderDropdownOptions = (
  onChangeMenu: (e: InputEvent) => void,
  onClickClose: (e: InputEvent) => void,
  wrapperElement: HTMLElement,
  initialSortOrder: SortOrder | null
) => {
  render(
    makeDropdownOptions_(onChangeMenu, onClickClose, initialSortOrder),
    wrapperElement
  )
}

export const resetDropdown = () => {
  if (selectOption(0)) {
    removeSelectedOption()
    hideCancelButton_()
  }
}

/**
 * select出来たらtrue
 * @param option
 */
export const selectOption = (index: number): boolean => {
  const selectElement = document.getElementById(SORTONE_UI_SELECT_ID)
  if (!selectElement) {
    return false
  }
  ;(selectElement as HTMLSelectElement).selectedIndex = index
  return true
}

export const showCancelButton = () => {
  const cancelButton = <HTMLButtonElement>(
    document.getElementById(SORTONE_UI_CANCEL_BUTTON_ID)
  )
  if (cancelButton) {
    cancelButton.style.removeProperty("display")
  }
  const selectMenuElement = document.getElementsByClassName(
    SORTONE_UI_SELECT_MENU_CLASSNAME
  )[0]
  if (selectMenuElement) {
    selectMenuElement.classList.add(SORTONE_UI_SELECT_MENU_SELECTED_CLASSNAME)
  }
}

const hideCancelButton_ = () => {
  const cancelButton = <HTMLButtonElement>(
    document.getElementById(SORTONE_UI_CANCEL_BUTTON_ID)
  )
  if (cancelButton) {
    cancelButton.style.display = "none"
  }
  const selectMenuElement = document.getElementsByClassName(
    SORTONE_UI_SELECT_MENU_CLASSNAME
  )[0]
  if (selectMenuElement) {
    selectMenuElement.classList.remove(
      SORTONE_UI_SELECT_MENU_SELECTED_CLASSNAME
    )
  }
}

export const insertDropdownWrapper = () => {
  const threadBody = document.getElementsByClassName(
    "ocean-space-thread-body"
  )[0]
  threadBody.classList.add(SORTONE_UI_DROPDOWN_PARENT_CLASSNAME)

  const element = document.createElement("div")
  element.className = SORTONE_UI_DROPDOWN_CLASSNAME

  threadBody.insertAdjacentElement("beforeend", element)
  return element
}

const makeDropdownOptions_ = (
  onChangeMenu: (e: InputEvent) => void,
  onClickClose: (e: InputEvent) => void,
  initialSortOrder: SortOrder | null
) => {
  const optionTemplates = SORT_MENUS.map((menu) => {
    if (menu.sortType === null) {
      return html`<option
        class="${SORTONE_UI_DROPDOWN_OPTIONS_CLASSNAME}"
        ?selected=${initialSortOrder === null}
        disabled
      >
        ${menu.label}
      </option>`
    } else {
      return html`<option
        class="${SORTONE_UI_DROPDOWN_OPTIONS_CLASSNAME}"
        value=${menu.sortType}
        ?selected=${initialSortOrder === menu.sortType}
      >
        ${menu.label}
      </option>`
    }
  })

  return html`
    <div class="${SORTONE_UI_SELECT_MENU_CLASSNAME}">
      <select id="${SORTONE_UI_SELECT_ID}" @change=${onChangeMenu}>
        ${optionTemplates}
      </select>
      <div class="sortone-ui-select-cancel-wrapper">
        <button
          id="${SORTONE_UI_CANCEL_BUTTON_ID}"
          class="sortone-ui-select-cancel"
          style="display: none"
          @click=${onClickClose}
        ></button>
      </div>
    </div>
  `
}

window.addEventListener("scroll", (e) => {
  const commentForm = document.getElementsByClassName(
    "ocean-ui-comments-commentform"
  )[0]
  if (!commentForm) {
    return
  }
  const commentFormBottom = commentForm.getBoundingClientRect().bottom

  const dropdownElement = document.getElementsByClassName(
    SORTONE_UI_DROPDOWN_CLASSNAME
  )[0]
  if (!dropdownElement) {
    return
  }
  if (0 >= commentFormBottom) {
    dropdownElement.classList.add(SORTONE_UI_DROPDOWN_FIXED_CLASSNAME)
  } else {
    dropdownElement.classList.remove(SORTONE_UI_DROPDOWN_FIXED_CLASSNAME)
  }
})
