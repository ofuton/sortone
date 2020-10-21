import "../../styles/sortone-ui/dropdown.scss"
import { html, render } from "lit-html"
import { sortPost } from "../content"
import { SortOrder } from "../kintone/space-thread"

const SORTONE_UI_DROPDOWN_PARNT_CLASSNAME = "sortone-ui-dropdown-parent"
const SORTONE_UI_DROPDOWN_CLASSNAME = "sortone-ui-dropdown"
const SORTONE_UI_SELECT_MENU_CLASSNAME = "sortone-ui-select-menu"

const menus = ["------", "いいねが多い順", "いいねが少ない順"]

let selected = 0

const onChangeMenu = {
  handleEvent(e: any) {
    console.log(
      `onChangeMenu.Test: 「${menus[e.target.value]}」が選択されました`
    )
    selected = e.target.value
    switch (menus[e.target.value]) {
      case "いいねが多い順":
        sortPost(SortOrder.LIKE_DESC)
        break
      case "いいねが多い順":
        sortPost(SortOrder.LIKE_ASC)
        break
      default:
        break
    }
  },
}

const insertDropdownWrapper = () => {
  const threadBody = document.getElementsByClassName(
    "ocean-space-thread-body"
  )[0]
  threadBody.className += ` ${SORTONE_UI_DROPDOWN_PARNT_CLASSNAME}`

  const element = document.createElement("div")
  element.className = SORTONE_UI_DROPDOWN_CLASSNAME

  threadBody.insertAdjacentElement("beforeend", element)
  return element
}

const insertDropdown = () => {
  const optionTemplates = menus.map((menu, index) => {
    return html`<option value="${index}" ?selected=${index === selected}>
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

export const renderDropdown = () => {
  const dropdownWrapperElement = insertDropdownWrapper()
  render(insertDropdown(), dropdownWrapperElement)
}
