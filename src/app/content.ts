import "../manifest.json"
import "../styles/content.scss"
import DomObserver, { EventType } from "./kintone/dom-observer"
import { renderDropdown } from "./sortone-ui/dropdown"
import {
  getPosts,
  SortOrder,
  sortPostElements,
  insertCommentsWrapperElement,
  renderPosts,
  hideOriginCommentComponent,
} from "./kintone/space-thread"

const SORTONE_COMMENTS_WRAPPER_CLASSNAME = "sortone-comments-wrapper"

const domObserver = new DomObserver()
domObserver.startCommentComponentObserver()

let postEls: HTMLElement[]

document.addEventListener(EventType.COMMENT_COMPONENT_LOADED, (e) => {
  renderDropdown()
  hideOriginCommentComponent()

  const targetEl = (e as CustomEvent).detail.element
  console.log("comment component loaded", targetEl)

  postEls = getPosts(targetEl)
  console.log(postEls)

  const wrapperEl = insertCommentsWrapperElement(
    SORTONE_COMMENTS_WRAPPER_CLASSNAME
  )
  if (!wrapperEl) {
    return
  }
  renderPosts(postEls, wrapperEl)
})

export const sortPost = (order: SortOrder) => {
  const sortedPosts = sortPostElements(postEls, order)
  console.log(sortedPosts)

  const wrapperEl = insertCommentsWrapperElement(
    SORTONE_COMMENTS_WRAPPER_CLASSNAME
  )
  if (!wrapperEl) {
    return
  }
  renderPosts(sortedPosts, wrapperEl)
}
