const url = {
  // base: 'http://106.14.45.19:8089/'
  // base: 'http://192.168.1.2/'
  // base: 'http://tzjc.3w.dkys.org/'
  base: 'http://www.pdzpzx.com/tzFrame/'
}
const constant = {
  censorType: [
    { value: 0, name: '新证' },
    { value: 2, name: '复审' }
  ],
  isDelegate: [
    { name: '是', value: 1 },
    { name: '否', value: 0 }
  ],
  allowExer: [
    { name: '允许', value: 1 },
    { name: '不允许', value: 0 }
  ],
  regSource: [
    { name: '现场报名', value: 1 },
    { name: '网站报名', value: 2 },
    { name: 'App报名', value: 3 }
  ],
  statusXYZT: [
    { value: '0', name: '报名' },
    { value: '1', name: '受理' },
    { value: '2', name: '培训' },
    { value: '3', name: '考试' },
    { value: '4', name: '取证' },
    { value: '5', name: '完成' }
  ],
  statusBJZT: [
    { value: '0', name: '计划' },
    { value: '1', name: '终止报名' },
    { value: '2', name: '开班' },
    { value: '3', name: '完成' }
  ],
  rateWH: Math.round(window.innerWidth * 100 / 320) / 100
}

const remaped = function (arr) {
  const dic = {}
  for (var i = 0; i < arr.length; i++) {
    var item = arr[i]
    dic[item.value] = item.name
  }
  return dic
}

const constantMap = {
  censorType: remaped(constant.censorType),
  isDelegate: remaped(constant.isDelegate),
  allowExer: remaped(constant.allowExer),
  regSource: remaped(constant.regSource),
  statusXYZT: remaped(constant.statusXYZT),
  statusBJZT: remaped(constant.statusBJZT)
}
const app = ['TiK', 'u6', '@pq', '&', '#09', '$A', 'es']
export default {
  url,
  constant,
  constantMap,
  s: app.join('')
}
