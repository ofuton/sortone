import "../../styles/sortone-ui/dropdown.scss"
import { html, render } from "lit-html"

const insertDropdownWrapper = () => {
    const threadBody = document.getElementsByClassName("ocean-space-thread-body")[0]
    threadBody.className += " sortone-ui-dropdown-parent"
    
    const element = document.createElement("div")
    element.className = "sortone-ui-dropdown"
    
    threadBody.insertAdjacentElement("beforeend", element)
    return element
}

const insertDropdown = () => {
    return html`
        <div class="select-cybozu">
            <div class="gaia-argoui-select">
                <span class="gaia-argoui-select-label">-----</span>
                <span class="gaia-argoui-select-arrow"></span>
            </div>
        </div>
        <div class="sortone-ui-selectmenu">
            <ul class="gaia-argoui-selectmenu gaia-argoui-selectmenu-vertical sortone-ui-selectmenu" style="visibility: visible; min-width: 198px">
                <div class="goog-menuitem goog-option goog-option-selected goog-menuitem-highlight">
                    <div class="goog-menuitem-content">
                        <div class="goog-menuitem-checkbox"></div>
                        -----
                    </div>
                </div>
                <div class="goog-menuitem goog-option">
                    <div class="goog-menuitem-content">
                        <div class="goog-menuitem-checkbox"></div>
                        いいね順
                    </div>
                </div>
                <div class="goog-menuitem goog-option">
                    <div class="goog-menuitem-content">
                        <div class="goog-menuitem-checkbox"></div>
                        日付が新しい順
                    </div>
                </div>
                <div class="goog-menuitem goog-option">
                    <div class="goog-menuitem-content">
                        <div class="goog-menuitem-checkbox"></div>
                        返信が多い順
                    </div>
                </div>
            </ul>
        </div>
    `
}

export const renderDropdown = () => {
    const dropdownWrapperElement = insertDropdownWrapper()
    render(insertDropdown(), dropdownWrapperElement)
}
