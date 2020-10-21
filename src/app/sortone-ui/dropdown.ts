import "../../styles/sortone-ui/dropdown.scss"
import { html, render } from "lit-html"

const menus = [
    "-----",
    "いいねが多い順",
    "日付が新しい順",
    "返信が多い順",
]

let selected = "-----"

const insertDropdownWrapper = () => {
    const threadBody = document.getElementsByClassName("ocean-space-thread-body")[0]
    threadBody.className += " sortone-ui-dropdown-parent"
    
    const element = document.createElement("div")
    element.className = "sortone-ui-dropdown"
    
    threadBody.insertAdjacentElement("beforeend", element)
    return element
}

const insertDropdown = () => {
    const menusTemplates = [];
    for (const m of menus) {
        menusTemplates.push(
            html`
                <div class="goog-menuitem goog-option ${selected === m ? "goog-option-selected goog-menuitem-highlight" : ""}">
                    <div class="goog-menuitem-content">
                        <div class="goog-menuitem-checkbox"></div>
                        ${m}
                    </div>
                </div>
            `
        );
    }

    return html`
        <div class="select-cybozu">
            <div class="gaia-argoui-select">
                <span class="gaia-argoui-select-label">${selected}</span>
                <span class="gaia-argoui-select-arrow"></span>
            </div>
        </div>
        <div class="sortone-ui-selectmenu">
            <ul class="gaia-argoui-selectmenu gaia-argoui-selectmenu-vertical sortone-ui-selectmenu" style="visibility: visible; min-width: 198px">
                ${menusTemplates}
            </ul>
        </div>
    `
}

export const renderDropdown = () => {
    const dropdownWrapperElement = insertDropdownWrapper()
    render(insertDropdown(), dropdownWrapperElement)
}
