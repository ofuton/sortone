import "../manifest.json"
import "../styles/content.scss"
import DomObserver, { EventType } from "./kintone/dom-observer"
import {
  DropdownState,
  renderDropdownOptions,
  resetDropdown,
  showCancelButton,
  SORT_MENUS,
  insertDropdownWrapper,
  selectOption,
} from "./sortone-ui/dropdown"
import {
  getPosts,
  SortOrder,
  sortPostElements,
  insertCommentsWrapperElement,
  renderPosts,
  hideOriginCommentComponent,
  SORTONE_COMMENTS_WRAPPER_CLASSNAME,
  showOriginComponentComponent,
  removeCommentsWrapperElement,
  isSortOrder,
} from "./kintone/space-thread"
import { saveSelectedOption, loadSelectedOption } from "./storage/local-storage"

const domObserver = new DomObserver()
domObserver.startCommentComponentObserver()

let postEls: HTMLElement[]

document.addEventListener(EventType.COMMENT_COMPONENT_LOADED, (e) => {
  const targetEl = (e as CustomEvent).detail.element
  postEls = getPosts(targetEl)
  loadSelectedOption((selectedOption) => {
    const wrapperEl = insertDropdownWrapper()
    if (selectedOption !== null) {
      const index = SORT_MENUS.findIndex(
        (menu) => menu.sortType === selectedOption
      )
      if (index >= 0) {
        renderDropdownOptions(
          onChangeMenu_,
          onClickClose_,
          wrapperEl,
          selectedOption
        )
        // FIXME: renderしたときによしなにキャンセルボタンも出したい
        showCancelButton()
        renderSortedPosts(postEls, selectedOption)
        return
      }
    } else {
      renderDropdownOptions(onChangeMenu_, onClickClose_, wrapperEl, null)
    }
  })
})

const renderSortedPosts = (postElements: HTMLElement[], order: SortOrder) => {
  hideOriginCommentComponent()

  const sortedPosts = sortPostElements(postElements, order)
  const wrapperEl = insertCommentsWrapperElement(
    SORTONE_COMMENTS_WRAPPER_CLASSNAME
  )
  if (!wrapperEl) {
    return
  }
  renderPosts(sortedPosts, wrapperEl)
}

const onChangeMenu_ = (e: InputEvent) => {
  if (!e.target) {
    return
  }
  const selectedValue = (e.target as HTMLInputElement).value
  if (!isSortOrder(selectedValue)) {
    throw new Error("unsupported error")
  }
  saveSelectedOption(selectedValue)
  showCancelButton()

  renderSortedPosts(postEls, selectedValue)
}

const onClickClose_ = (e: InputEvent) => {
  removeCommentsWrapperElement()
  showOriginComponentComponent()
  resetDropdown()
}
