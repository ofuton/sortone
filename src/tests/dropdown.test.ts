import { renderDropdownOptions, SORT_MENUS } from "../app/sortone-ui/dropdown"

test("SORT_MENUSで定義されているものが描画される", () => {
  const e = new Event("dummy")
  renderDropdownOptions(
    (e) => {},
    (e) => {},
    document.body
  )
  const dropdownEl = document.body.querySelector(".sortone-ui-select-menu")
  console.log(dropdownEl)
  expect(dropdownEl).not.toBeNull()
  const optionEls = dropdownEl!.querySelectorAll(".sortone-ui-dropdown-options")
  expect(optionEls.length).toBe(SORT_MENUS.length)
  // 一番上の選択肢が選択されていて、ユーザーが選択出来ないようになっていて、value(SortType)がnullである
  const firstOption = optionEls[0] as HTMLSelectElement
  expect(firstOption.getAttribute("disabled")).not.toBeNull()
  expect(firstOption.getAttribute("selected")).not.toBeNull()
  expect(firstOption.getAttribute("value")).toBeNull()
})
