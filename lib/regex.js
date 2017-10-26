const Email = /\w+([-+.]\w+)*\w+([-.]\w+)*\.\w+([-.]\w+)*/
const Mobile = /^[1][0-9]{10}$/
const Password = /^([A-Z]|[a-z]|[0-9]|[_]){6,20}$/
const CName = /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]){2,6}$/

const vildateIDCard = function (cID) {
  const value = cID
  let length = 0
  if (!value) {
    return false
  } else {
    length = value.length
    if (length !== 15 && length !== 18) {
      return false
    }
  }
  // 省份代码
  const areasArray = ['11', '12', '13', '14', '15', '21', '22', '23', '31', '32', '33', '34', '35', '36', '37', '41', '42', '43', '44', '45', '46', '50', '51', '52', '53', '54', '61', '62', '63', '64', '65', '71', '81', '82', '91']
  let valueStart2 = value.substr(0, 2)
  if (areasArray.indexOf(valueStart2) === -1) {
    return false
  }
  let regularExpression
  let dateMatch

  let year = 0
  switch (length) {
    case 15:
      year = Number(value.substr(6, 2)) + 1900
      if (year % 4 === 0 || (year % 100 === 0 && year % 4 === 0)) {
        regularExpression = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/
      } else {
        regularExpression = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/
      }
      return regularExpression.test(value)
    case 18:
      year = value.substr(6, 4)
      if (year % 4 === 0 || (year % 100 === 0 && year % 4 === 0)) {
        regularExpression = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/
      } else {
        regularExpression = /[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/
      }
      dateMatch = regularExpression.test(value)
      console.log('dateMatch', dateMatch)
      if (dateMatch > 0) {
        let S = (Number(value.substr(0, 1)) + Number(value.substr(10, 1))) * 7 + (Number(value.substr(1, 1)) + Number(value.substr(11, 1))) * 9 + (Number(value.substr(2, 1)) + Number(value.substr(12, 1))) * 10 + (Number(value.substr(3, 1)) + Number(value.substr(13, 1))) * 5 + (Number(value.substr(4, 1)) + Number(value.substr(14, 1))) * 8 + (Number(value.substr(5, 1)) + Number(value.substr(15, 1))) * 4 + (Number(value.substr(6, 1)) + Number(value.substr(16, 1))) * 2 + Number(value.substr(7, 1)) * 1 + Number(value.substr(8, 1)) * 6 + Number(value.substr(9, 1)) * 3
        let Y = S % 11
        let M = 'F'
        let JYM = '10X98765432'
        M = JYM.substr(Y, 1)// 判断校验位
        if (M === value.substr(17, 1).toUpperCase()) {
          return true// 检测ID的校验位
        } else {
          return false
        }
      } else {
        return false
      }
    default:
      return false
  }
}

export default {
  isEmail: (e) => Email.test(e),
  isMobile: (m) => Mobile.test(m),
  isPassword: (p) => Password.test(p),
  isTypeID: (t) => vildateIDCard(t),
  isCName: (c) => CName.test(c)
}
