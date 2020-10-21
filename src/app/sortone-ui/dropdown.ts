import "../../styles/sortone-ui/dropdown.scss"
import { html, render } from "lit-html"

const menus = ["------", "いいねが多い順", "日付が新しい順", "返信が多い順"]

let selected = 0

const onChangeMenu = {
  handleEvent(e: any) {
    console.log(
      `onChangeMenu.Test: 「${menus[e.target.value]}」が選択されました`
    )
    selected = e.target.value
  },
}

const insertDropdownWrapper = () => {
  const threadBody = document.getElementsByClassName(
    "ocean-space-thread-body"
  )[0]
  threadBody.className += " sortone-ui-dropdown-parent"

  const element = document.createElement("div")
  element.className = "sortone-ui-dropdown"

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
    <div class="sortone-ui-select-menu">
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
