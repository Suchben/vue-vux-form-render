import VeeValidate from 'vee-validate'
var Validator = VeeValidate.Validator

import CN from './zh_CN'
import regex from './regex'
console.log(Validator)
Validator.localize('zh_CN', CN)

Validator.extend('mobile', {
  getMessage: field => '请输入11位手机号码',
  validate: value => {
    return value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  }
})

Validator.extend('password', {
  getMessage: field => '6至18位：字母、数字和下划线',
  validate: value => {
    return /^[a-zA-Z0-9_]{6,18}$/.test(value)
  }
})

Validator.extend('phone', {
  getMessage: field => '请输入电话号码',
  validate: value => {
    // /^(0[0-9]{2,3}/-)?([2-9][0-9]{6,7})+(/-[0-9]{1,4})?$/.test(value)
    return /^((0\d{2}-\d{8}(-\d{1,4})?)|(0\d{3}-\d{7,8}(-\d{1,4})?))$/.test(value)
  }
})

Validator.extend('highSchool', {
  getMessage: field => '该作业项目要求您的学历在高中或者高中以上',
  validate: value => {
    return /[^AB]/.test(value)
  }
})

Validator.extend('postcode', {
  getMessage: field => '请输入6位邮政编码',
  validate: value => {
    return /^[1-9]\d{5}$/.test(value)
  }
})

Validator.extend('typeID', {
  getMessage: field => '请输入正确的身份证号码',
  validate: value => {
    return regex.isTypeID(value)
  }
})

Validator.extend('typeIDMinAge18', {
  getMessage: field => '您的年龄应满18周岁',
  validate: value => {
    let date, now
    if (value.length === 18) {
      date = new Date(value.substr(6, 4) + '-' + value.substr(10, 2) + '-' + value.substr(12, 2))
      date.setFullYear(date.getFullYear() + 18)
      now = new Date()
      return now >= date
    } else {
      return false
    }
  }
})

Validator.extend('birthdayMinAge18', {
  getMessage: field => '您的年龄应满18周岁',
  validate: value => {
    let date, now
    date = new Date(value)
    date.setFullYear(date.getFullYear() + 18)
    now = new Date()
    return now >= date
  }
})

Validator.extend('typeIDMaxAge60', {
  getMessage: field => '您的年龄应不大于60周岁',
  validate: value => {
    let date, now
    if (value.length === 18) {
      date = new Date(value.substr(6, 4) + '-' + value.substr(10, 2) + '-' + value.substr(12, 2))
      date.setFullYear(date.getFullYear() + 60)
      now = new Date()
      return now <= date
    } else {
      return false
    }
  }
})

Validator.extend('birthdayMaxAge60', {
  getMessage: field => '您的年龄应不大于60周岁',
  validate: value => {
    let date, now
    date = new Date(value)
    date.setFullYear(date.getFullYear() + 60)
    now = new Date()
    return now <= date
  }
})

export default VeeValidate
