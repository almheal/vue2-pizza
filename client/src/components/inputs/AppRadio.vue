<template>
  <div class="wrapper__radio">
    <input class="radio__input"
      type="radio"
      :id="id"
      :name="name"
      :checked="checked"
      :value="value"
      @input="changeRadio({value: $event.target.value, property: name})"
    >
    <label :for="id" class="radio__name">{{label}}</label>
  </div>
</template>

<script>
export default {
  name: 'AppRadio',
  props:{
    label:{
      type: String,
      default: ''
    },
    name:{
      type: String,
      default: ''
    },
    checked:{
      type: Boolean,
      default: false
    },
    value:{
      type: String,
      default: ''
    },
    id:{
      type: String,
      default: ''
    }
  },
  methods:{
    changeRadio({value, property}){
      this.$emit('changeRadio', value, property)
    }
  }
}
</script>

<style lang="scss" scoped>
.radio__input{
  display: none;
  &:checked + .radio__name::after{
    display: block;
  }
}

.radio__name{
  position: relative;
  padding-left: 24px;
  cursor: pointer;
  &::before,
  &::after{
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid #70544f;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  &::after{
    width: 8px;
    height: 8px;
    left: 4px;
    border: none;
    background-color: #70544f;
    display: none;
  }
}

.radio__icon{

  &:checked{
    border-radius: 0;
  }
}
</style>