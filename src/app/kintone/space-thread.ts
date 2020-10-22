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
  wrapperEl.style.border = "4px solid #cacaca"
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

export const SortOrder = {
  LIKE_ASC: "like_asc",
  LIKE_DESC: "like_desc",
} as const

export type SortOrder = typeof SortOrder[keyof typeof SortOrder]
