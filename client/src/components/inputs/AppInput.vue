<template>
  <div class="wrapper__input">
    <label class="input__name">{{label}}</label>
    <input class="input" :type="type" :placeholder="placeholder" :value="value" @input="changeInput">
  </div>
</template>

<script>

export default {
  name: 'AppInput',
  props:{
    value:{
      type: String,
      default:''
    },
    label:{
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder:{
      type: String,
      default: ''
    }
  },
  methods:{
    changeInput(e){
      this.$emit('changeInput',e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper__input{
  width: 100%;
  margin-bottom: 20px;
  border-radius: 4px;
}

.input__name{
  display: inline-block;
  font-size: 14px;
  color: #a69895;
  margin-bottom: 7px;
}

.input{
  width: 100%;
  background-color: #F5F5F5;
  padding: 12px 16px;
  font-size: 18px;
  border-radius: 4px;
}
</style>