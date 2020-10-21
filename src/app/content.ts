import "../manifest.json"
import "../styles/content.scss"
import DomObserver, { EventType } from "./kintone/dom-observer"
import { renderDropdown } from "./sortone-ui/dropdown"
import {
  getPosts,
  SortOrder,
  sortPostElements,
  insertCommentsWrapperElement,
  hideOriginPosts,
  renderPosts,
} from "./kintone/space-thread"

const SORTONE_COMMENTS_WRAPPER_CLASSNAME = "sortone-comments-wrapper"
console.log("hoge")

const sayHello = (name: String) => {
  return html`<h1>Hello, ${name}!!</h1>`
}

// render(sayHello('ofuton'), document.body);

const domObserver = new DomObserver()
domObserver.startCommentComponentObserver()

document.addEventListener(EventType.COMMENT_COMPONENT_LOADED, (e) => {
  renderDropdown()

  const targetEl = (e as CustomEvent).detail.element
  console.log("comment component loaded", targetEl)
  const postEls = getPosts(targetEl)
  console.log(postEls)
  hideOriginPosts(postEls)
  const sortedPosts = sortPostElements(postEls, SortOrder.LIKE_DESC)
  console.log(sortedPosts)

  const wrapperEl = insertCommentsWrapperElement(
    SORTONE_COMMENTS_WRAPPER_CLASSNAME
  )
  if (!wrapperEl) {
    return
  }
  renderPosts(sortedPosts, wrapperEl)
})
