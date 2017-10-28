import { is } from './utils'
export const _resolveDic = function (obj, desc, value, key, to) {
  if ((!obj.options.length || key === 'ZYXM2') && to[key]) {
    obj.options = _reMap(to[key], desc, value)
  } else if (!obj.options.length && !to[key]) {
    return Promise.resolve(true)
  }
  return Promise.resolve(false)
}
export const _reMap = function (arr, desc, value) {
  return arr.map(function ({ name, title }, index) {
    return {
      [desc]: title,
      [value]: name
    }
  })
}

export const _computedForm = function (formItems, array) {
  const dic = {}
  for (var index = 0; index < array.length; index++) {
    var [key, a, b] = array[index]
    dic[key] = formItems[a][b]
  }
  return dic
}

export const _mapForm = function (formItems) {
  let dic = {}
  for (var index = 0; index < formItems.length; index++) {
    const element = formItems[index]
    if (is.Array(element)) {
      dic = { ...dic, ..._mapForm(element) }
    } else {
      const key = element.model
      dic[key] = element
    }
  }
  return dic
}
