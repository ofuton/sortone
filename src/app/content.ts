import "../manifest.json"
import "../styles/content.scss"
import DomObserver, { EventType } from "./kintone/dom-observer"

const domObserver = new DomObserver()
domObserver.startCommentComponentObserver()

document.addEventListener(EventType.COMMENT_COMPONENT_LOADED, (e) => {
  const targetEl = (e as CustomEvent).detail.element
  console.log("comment component loaded", targetEl)
})
