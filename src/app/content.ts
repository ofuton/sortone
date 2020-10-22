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
  handleEvent(e: any) {
    console.log(
      `onChangeMenu.Test: 「${SORT_MENUS[e.target.value]}」が選択されました`
    )
    DropdownState.selected = e.target.value
    showCancelButton()
    switch (SORT_MENUS[e.target.value]) {
      case "いいねが多い順":
        sortPost(SortOrder.LIKE_DESC)
        break
      case "いいねが少ない順":
        sortPost(SortOrder.LIKE_ASC)
        break
      default:
        throw new Error("unsupported error")
    }
  },
}

const onClickClose = {
  handleEvent(e: any) {
    console.log(
      `onClickClose.Test: 「キャンセル」がクリックされました`
    )
    removeCommentsWrapperElement()
    showOriginComponentComponent()
    resetDropdown()
  },
}
