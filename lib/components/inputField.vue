<template>
  <div class="vvfr-input-field">
    <label :class="{require: isRequired}" for="">{{label}}</label>
    <template v-if="type === 'text'">
      <input autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" :name="name" v-model="text" type="text" :placeholder="placeholder" @input="onInput">
    </template>
    <template v-else-if="type === 'password'">
      <input autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" :name="name" ref="a" v-if="!isSec" v-model="text" type="text" :placeholder="placeholder" @input="onInput">
      <input autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" :name="name" ref="b" v-else v-model="text" type="password" :placeholder="placeholder" @input="onInput">
      <span @click="onClick">{{actionName}}</span>
    </template>
    <template v-else-if="type === 'textLong'">
      <textarea autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" :name="name" rows="1" cols="30" v-model="text" :placeholder="placeholder" @input="onInput"></textarea>
    </template>
    <template v-else-if="type === 'mobileRequest'">
      <input disabled autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" :name="name" v-model="text" type="text" :placeholder="placeholder" @input="onInput">
      <button :disabled="!!shutDownTime" type="button" @click="onMobileValidateFetch()">{{shutDownTime===0?'获取验证码':(shutDownTime+'秒')}}</button>
    </template>
  </div>
</template>
<script>
import Vue from 'vue'
import autosize from 'autosize'
export default {
  name: 'vvfr-input-field',
  components: {},
  props: {
    value: [String, Number],
    label: String,
    placeholder: String,
    validate: {
      type: String,
      default: ''
    },
    name: String,
    type: String // password, text, textLong
  },
  data: function () {
    const fetchedTime = localStorage.getItem('fetchedTime-' + this.name)
    return {
      text: '',
      isSec: true,
      fetchedTime: fetchedTime || 0,
      shutDownTime: 0,
      _timerToken: undefined
    }
  },
  computed: {
    actionName: function () {
      return this.isSec ? '显示' : '隐藏'
    },
    isRequired: function () {
      return /required/.test(this.validate)
    }
  },
  watch: {
    fetchedTime: function (to, from) {
      localStorage.setItem('fetchedTime-' + this.name, to)
    }
  },
  // life cycle
  mounted: function () {
    this._value = this.value
    this.fetchedTime && this.onMobileValidateFetch(this.fetchedTime)
    autosize(document.querySelector('textarea'))
  },
  beforeDestroy: function () {
    clearTimeout(this._timerToken)
  },
  methods: {
    onInput: function (e) {
      // if (this.type === 'password') {
      //   console.log(e)
      // }
      this.$emit('input', e.target.value)
    },
    onClick: function (e) {
      this.isSec = !this.isSec
      Vue.nextTick(() => {
        if (this.isSec) {
          this.$refs.b.focus()
        } else {
          this.$refs.a.focus()
        }
      })
    },
    onMobileValidateFetch: function (time) {
      const nowTime = time || new Date().getTime()
      this.fetchedTime = nowTime
      const shutDown = (time, after) => {
        const nowTime = new Date().getTime()
        const sec = after - Math.floor((nowTime - time) / 1000)
        if (sec <= 0) {
          this.shutDownTime = 0
        } else {
          this.shutDownTime = sec
          this._timerToken = setTimeout(() => {
            shutDown(time, after)
            console.log(this, after)
          }, 1000)
        }
      }
      shutDown(nowTime, 60)
      if (!time) {
        this.$emit('handleMobileValidateFetch')
      }
    }
  }
}
</script>
<style lang="less">
.vvfr-input-field {
  display: flex;
  min-height: 35px;
  font-size: 15px;
  label {
    align-self: flex-start;
    flex: 0 0 auto;
    color: #444;
    line-height: 1em;
    margin: 10px 0;
  }
  input {
    font-size: 15px;
    align-self: stretch;
    margin-left: 5px;
    flex: 1 1 100%;
    color: #444;
    border: 0;
    outline: none;
  }
  span {
    flex: 0 0 auto;
    align-self: flex-start;
    line-height: 1em;
    margin: 10px 0;
  }
  input::-webkit-input-placeholder {
    color: #888;
  }
  textarea {
    resize: none;
    font-size: 15px;
    line-height: 19px;
    align-self: stretch;
    margin-left: 5px;
    flex: 1 1 100%;
    color: #444;
    border: 0;
    outline: none;
    padding: 8px 0;
  }
  .require::before {
    content: "*";
    color: red;
    position: absolute;
    left: 5px;
  }
  button {
    border: none;
    background-color: green;
    padding: 5px 8px;
    font-size: 14px;
    color: white;
    flex: 0 0 auto;
    align-self: flex-start;
    line-height: 1em;
    margin: 6px 0 5px;
    border-radius: 5px;
    min-width: 50px;
  }
  button:disabled {
    color: gray;
    background-color: lightGray;
  }
}
</style>