import "../manifest.json"
import "../styles/content.scss"
import DomObserver, { EventType } from "./kintone/dom-observer"
import {
  DropdownState,
  renderDropdown,
  resetDropdown,
  showCancelButton,
  SORT_MENUS,
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
} from "./kintone/space-thread"

const domObserver = new DomObserver()
domObserver.startCommentComponentObserver()

let postEls: HTMLElement[]

document.addEventListener(EventType.COMMENT_COMPONENT_LOADED, (e) => {
  renderDropdown(onChangeMenu, onClickClose)

  const targetEl = (e as CustomEvent).detail.element
  postEls = getPosts(targetEl)
})

const sortPost = (order: SortOrder) => {
  hideOriginCommentComponent()

  const sortedPosts = sortPostElements(postEls, order)
  const wrapperEl = insertCommentsWrapperElement(
    SORTONE_COMMENTS_WRAPPER_CLASSNAME
  )
  if (!wrapperEl) {
    return
  }
  renderPosts(sortedPosts, wrapperEl)
}

const onChangeMenu = {
  handleEvent(e: InputEvent) {
    if (!e.target) {
      return
    }
    const selectedValue = (e.target as HTMLInputElement).value
    // DropdownState.selected = selectedValue
    showCancelButton()

    if (SORT_MENUS.some((menu) => menu.sortType === selectedValue)) {
      // ↑でSORT_MENUSにあるかどうか見ているので下のキャストは必ず成功するはず
      sortPost(selectedValue as SortOrder)
    } else {
      throw new Error("unsupported error")
    }
  },
}

const onClickClose = {
  handleEvent(e: any) {
    removeCommentsWrapperElement()
    showOriginComponentComponent()
    resetDropdown()
  },
}
