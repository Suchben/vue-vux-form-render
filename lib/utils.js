export const is = {
  types: ['Array', 'Set', 'Boolean', 'Date', 'Number', 'Object', 'Map', 'RegExp', 'String', 'Window', 'HTMLDocument']
}
for (let type of is.types) {
  Object.assign(is, { [type]: (type => obj => Object.prototype.toString.call(obj).slice(8, -1) === type)(type) })
  // 或者
  // is[type] = (type => obj => Object.prototype.toString.call(obj).slice(8, -1) == type)(type)
}

export const getClass = (obj) => {
  return Object.prototype.toString.call(obj).match(/^\[object\s(.*)\]$/)[1]
}
export const copyJSONObj = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * @description 判断变量是否存在,或者是否以某种类型存在
 * @param {object} o  判断变量是否存在
 * @param {object} type 数据类型  Number,Boolean等
 * @return {Boolean} nResult 返回结果 true或者false
 */
export const exists = (o, type) => {
  return o !== undefined && o !== null && (type ? o.constructor === type : true)
}

export const dataWithPath = (data, path) => {
  if (!data) {
    return undefined
  } else if (!Object.keys(data).length) {
    return undefined
  } else if (!path) {
    return data
  }
  const arr = path.split('.')
  let result = data
  for (var index = 0; index < arr.length; index++) {
    var key = arr[index]
    if (!result || !result.hasOwnProperty(key)) {
      return undefined
    } else {
      result = result[key]
    }
  }
  return result
}

