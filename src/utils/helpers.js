export const getOrderedList = (data) => {
    return data.sort(function (a, b) {
    let itemA = a.id.toLowerCase()
    let itemB = b.id.toLowerCase()
    return (itemA < itemB) ? -1 : (itemA > itemB) ? 1 : 0
  })
}