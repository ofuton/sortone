export const SORTONE_COMMENTS_WRAPPER_CLASSNAME = "sortone-comments-wrapper"

export const getPosts = (
  targetCommentComponentEl: HTMLElement
): HTMLElement[] => {
  return Array.from(
    targetCommentComponentEl.querySelectorAll(".ocean-ui-comments-post")
  )
}

/**
 * postElementsをsortOrderで指定した順序に入れ替える
 * 返す値はshallow copyしたもの
 * @param postElements
 * @param sortOrder
 */
export const sortPostElements = (
  postElements: HTMLElement[],
  sortOrder: SortOrder
): HTMLElement[] => {
  return sortInner_(postElements, sortOrder).concat()
}

export const insertCommentsWrapperElement = (
  className: string
): HTMLElement | null => {
  const commentComponentEl = document.querySelector(
    ".ocean-ui-comments-commentcomponent"
  )
  if (!commentComponentEl) {
    return null
  }
  const wrapperEl = document.createElement("div")
  wrapperEl.className = className
  commentComponentEl.insertAdjacentElement("afterend", wrapperEl)
  return wrapperEl
}

export const removeCommentsWrapperElement = () => {
  const commentComponentEl = document.querySelector(
    `.${SORTONE_COMMENTS_WRAPPER_CLASSNAME}`
  )
  if (!commentComponentEl) {
    return
  }
  if (!commentComponentEl.parentNode) {
    return
  }
  commentComponentEl.parentNode.removeChild(commentComponentEl)
}

export const hideOriginCommentComponent = () => {
  const commentComponentEl = document.querySelector(
    ".ocean-ui-comments-commentcomponent"
  )
  if (!commentComponentEl) {
    return
  }
  ;(commentComponentEl as HTMLElement).style.display = "none"
}

export const showOriginComponentComponent = () => {
  const commentComponentEl = document.querySelector(
    ".ocean-ui-comments-commentcomponent"
  )
  if (!commentComponentEl) {
    return
  }
  ;(commentComponentEl as HTMLElement).style.removeProperty("display")
}

export const renderPosts = (
  postElements: HTMLElement[],
  container: HTMLElement
) => {
  container.append(
    ...postElements.map((el) => {
      return el.cloneNode(true)
    })
  )
}

const sortInner_ = (postElements: HTMLElement[], sortOrder: SortOrder) => {
  switch (sortOrder) {
    case SortOrder.LIKE_ASC:
      return sortLikeAsc_(postElements)
    case SortOrder.LIKE_DESC:
      return sortLikeDesc_(postElements)
    case SortOrder.CREATED_DESC:
      return sortCreatedDesc_(postElements)
    case SortOrder.REPLY_DESC:
      return sortReplyDesc_(postElements)
    default:
      throw new Error("unsupported error")
  }
}

const sortLikeAsc_ = (postElements: HTMLElement[]) => {
  return postElements.sort((a, b) => {
    const likeCountA = extractLikeCount_(a)
    const likeCountB = extractLikeCount_(b)
    if (likeCountA > likeCountB) {
      return 1
    } else if (likeCountA === likeCountB) {
      return 0
    } else {
      return -1
    }
  })
}

const sortLikeDesc_ = (postElements: HTMLElement[]) => {
  return postElements.sort((a, b) => {
    const likeCountA = extractLikeCount_(a)
    const likeCountB = extractLikeCount_(b)
    if (likeCountA < likeCountB) {
      return 1
    } else if (likeCountA === likeCountB) {
      return 0
    } else {
      return -1
    }
  })
}

const sortCreatedDesc_ = (postElements: HTMLElement[]) => {
  return postElements.sort((a, b) => {
    const createdAtA = extractCreatedAt_(a)
    const createdAtB = extractCreatedAt_(b)
    if (createdAtA === null || createdAtB === null) {
      if (createdAtA !== null) {
        return 1
      } else if (createdAtA === createdAtB) {
        return 0
      } else {
        return -1
      }
    } else {
      if (createdAtA < createdAtB) {
        return 1
      } else if (createdAtA === createdAtB) {
        return 0
      } else {
        return -1
      }
    }
  })
}

const sortReplyDesc_ = (postElements: HTMLElement[]) => {
  return postElements.sort((a, b) => {
    const replyCountA = extractReply_(a)
    const replyCountB = extractReply_(b)
    if (replyCountA < replyCountB) {
      return 1
    } else if (replyCountA === replyCountB) {
      return 0
    } else {
      return -1
    }
  })
}

const extractLikeCount_ = (element: HTMLElement): Number => {
  const likeCountTextEl = element.querySelector(
    ".ocean-ui-comments-commentbase-like-count-text"
  )
  if (!likeCountTextEl) {
    return 0
  }
  const likeCountText = (likeCountTextEl as HTMLElement).innerText
  if (likeCountText === "") {
    return 0
  }
  return parseInt(likeCountText)
}

const extractReply_ = (element: HTMLElement): Number => {
  const commentHolderEl = element.querySelector(
    ".ocean-ui-comments-post-commentholder"
  )
  if (!commentHolderEl) {
    return 0
  }
  return commentHolderEl.childElementCount
}

// 0詰め
const fill = (text: string | number) => {
  return ("0" + text).slice(-2)
}

const extractCreatedAt_ = (element: HTMLElement): string | null => {
  const createdAtLinkEl = element.querySelector(
    ".ocean-ui-comments-commentbase-time"
  )
  if (!createdAtLinkEl) {
    return null
  }
  // パターン1 XX:XX
  const p1 = /(?<hours>\d{2}|\d):(?<minutes>\d{2}|\d)/
  // パターン2 XX/XX XX:XX
  const p2 = /(?<month>\d{2}|\d)\/(?<day>\d{2}|\d) (?<hours>\d{2}|\d):(?<minutes>\d{2}|\d)/
  // パターン3 XXXX/XX/XX XX:XX
  const p3 = /(?<year>\d{4})\/(?<month>\d{2}|\d)\/(?<day>\d{2}|\d) (?<hours>\d{2}|\d):(?<minutes>\d{2}|\d)/
  const dateText = (createdAtLinkEl as HTMLElement).innerText
  const now = new Date()
  if (dateText.match(p3)) {
    const result = dateText.match(p3)!
    const g = result.groups!
    return `${g.year}/${fill(g.month)}/${fill(g.day)} ${fill(g.hours)}:${fill(
      g.minutes
    )}`
  } else if (dateText.match(p2)) {
    const result = dateText.match(p2)!
    const g = result.groups!
    return `${now.getFullYear()}/${fill(g.month)}/${fill(g.day)} ${fill(
      g.hours
    )}:${fill(g.minutes)}`
  } else if (dateText.match(p1)) {
    const result = dateText.match(p1)!
    const g = result.groups!
    return `${now.getFullYear()}/${fill(now.getMonth() + 1)}/${fill(
      now.getDate()
    )} ${fill(g.hours)}:${fill(g.minutes)}`
  }
  return null
}

export const SortOrder = {
  LIKE_ASC: "like_asc",
  LIKE_DESC: "like_desc",
  CREATED_DESC: "created_desc",
  REPLY_DESC: "reply_desc",
} as const

export type SortOrder = typeof SortOrder[keyof typeof SortOrder]
