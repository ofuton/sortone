import "../../styles/sortone-ui/dropdown.scss"
import { html, render } from "lit-html"

const SORTONE_UI_DROPDOWN_PARNT_CLASSNAME = "sortone-ui-dropdown-parent"
const SORTONE_UI_DROPDOWN_CLASSNAME = "sortone-ui-dropdown"
const SORTONE_UI_SELECT_MENU_CLASSNAME = "sortone-ui-select-menu"

export const SORT_MENUS = ["------", "いいねが多い順", "いいねが少ない順"]
export class DropdownState {
  public static selected = 0
}

export const renderDropdown = (onChangeMenu: { handleEvent(e: any): void }) => {
  const dropdownWrapperElement = insertDropdownWrapper_()
  render(insertDropdown_(onChangeMenu), dropdownWrapperElement)
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

const insertDropdown_ = (onChangeMenu: { handleEvent(e: any): void }) => {
  const optionTemplates = SORT_MENUS.map((menu, index) => {
    return html`<option
      value="${index}"
      ?selected=${index === DropdownState.selected}
    >
      ${menu}
    </option>`
  })

  return html`
    <div class="${SORTONE_UI_SELECT_MENU_CLASSNAME}">
      <select @change=${onChangeMenu}>
        ${optionTemplates}
      </select>
    </div>
  `
}
