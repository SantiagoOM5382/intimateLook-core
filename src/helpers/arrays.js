const orderBy = (array, key, order = 'ASC') => {
  if (order === 'DESC') {
    return array.sort((a, b) => {
      if (a?.[key] < b?.[key]) return 1
      if (a?.[key] > b?.[key]) return -1
      return 0
    })
  }

  return array.sort((a, b) => {
    if (a?.[key] < b?.[key]) return -1
    if (a?.[key] > b?.[key]) return 1
    return 0
  })
}

const removeItem = (array, item) => {
  const i = array.indexOf(item)
  if (i !== -1) {
    array.splice(i, 1)
  }
}

const differenceBetweenArrays = (arr1, arr2) => {
  return arr1.filter(elemento => arr2.indexOf(elemento) === -1)
}

const filterMap = (arr, filterFn = null, mapFn = null) => {
  return arr.reduce((acc, item, i) => {
    if (filterFn(item, i) === false) return acc
    const newItem = mapFn(item, i)
    return [...acc, newItem]
  }, [])
}

const mutableFilter = (arr, filterFn = null) => {
  const filterArray = []
  for (let i = 0; i < arr.length; i++) {
    if (filterFn(arr[i], i) !== false) {
      filterArray.push(arr[i])
      arr.splice(i, 1)
      i--
    }
  }
  return filterArray
}

module.exports = {
  orderBy,
  removeItem,
  differenceBetweenArrays,
  filterMap,
  mutableFilter
}
