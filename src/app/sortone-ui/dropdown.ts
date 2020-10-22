import "../../styles/sortone-ui/dropdown.scss"
import { html, render } from "lit-html"

const SORTONE_UI_DROPDOWN_PARNT_CLASSNAME = "sortone-ui-dropdown-parent"
const SORTONE_UI_DROPDOWN_CLASSNAME = "sortone-ui-dropdown"
const SORTONE_UI_SELECT_ID = "sortone-ui-select"
const SORTONE_UI_SELECT_MENU_CLASSNAME = "sortone-ui-select-menu"
const SORTONE_UI_SELECT_MENU_SELECTED_CLASSNAME= "sortone-ui-select-menu-selected"
const SORTONE_UI_CANCEL_BUTTON_ID = "sortone-ui-select-cancel"

export const SORT_MENUS = ["いいねが多い順", "いいねが少ない順"]
export class DropdownState {
  public static selected = 0
}

export const renderDropdown = (
  onChangeMenu: { handleEvent(e: any): void },
  onClickClose: { handleEvent(e: any): void }
) => {
  const dropdownWrapperElement = insertDropdownWrapper_()
  render(insertDropdown_(onChangeMenu, onClickClose), dropdownWrapperElement)
}

export const resetDropdown = () => {
  const selectElement = <HTMLSelectElement>(
    document.getElementById(SORTONE_UI_SELECT_ID)
  )
  selectElement.selectedIndex = 0
  hideCancelButton_()
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
    selectMenuElement.className += ` ${SORTONE_UI_SELECT_MENU_SELECTED_CLASSNAME}`
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
    selectMenuElement.classList.remove(SORTONE_UI_SELECT_MENU_SELECTED_CLASSNAME)
  }
}

const insertDropdownWrapper_ = () => {
  const threadBody = document.getElementsByClassName(
    "ocean-space-thread-body"
  )[0]
  threadBody.className += ` ${SORTONE_UI_DROPDOWN_PARNT_CLASSNAME}`

  const element = document.createElement("div")
  element.className = SORTONE_UI_DROPDOWN_CLASSNAME

  threadBody.insertAdjacentElement("beforeend", element)
  return element
}

const insertDropdown_ = (
  onChangeMenu: { handleEvent(e: any): void },
  onClickClose: { handleEvent(e: any): void }
) => {
  const optionTemplates = SORT_MENUS.map((menu, index) => {
    return html`<option value="${index}">${menu}</option>`
  })

  return html`
    <div class="${SORTONE_UI_SELECT_MENU_CLASSNAME}">
      <select id="${SORTONE_UI_SELECT_ID}" @change=${onChangeMenu}>
        <option selected disabled>並び替えの条件</option>
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
