<template>
  <div class="basket__code">
    <div class="wrapper__input">
      <input type="text" class="input__code" placeholder="Введите промокод" @blur="changeInputBlur"
      @focus="changeInputFocus"
      >
      <button class="code__btn" :class="{focus: iconFocus}"></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppPromoCode',
  data: ()=>({
    iconFocus: false,
  }),
  methods:{
    changeInputFocus(){
      this.iconFocus = true
    },
    changeInputBlur(){
      this.iconFocus = false
    },
  }
}
</script>

<style lang="scss" scoped>
.basket__code{
  border-radius: 4px;
  padding: 16px 24px;
  background-color: #fff;
}

.wrapper__input{
  position: relative;
}

.input__code{
  padding: 8px 50px 10px 20px;
  color: #70544f;
  background-color: #f8f8f8;
  border-radius: 20px;
  border: 1px solid #f8f8f8;
  transition: .3s;
  &:focus{
    border-color: #009471;
    transition: .3s;
  }
}

.code__btn{
  position: absolute;
  display: block;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  background-color: #bfb7b6;
  border-radius: 50%;
  transition: .3s;
  &::before{
    content: '';
    width: 8px;
    height: 8px;
    border-right: 2px solid #fff;
    border-top: 2px solid #fff;
    position: absolute;
    right: 52%;
    top: 50%;
    transform: translate(50%,-50%) rotate(45deg);
    transition: .3s;
  }
  &:hover{
    background-color: #009471;
    transition: .3s;
  }
  &:hover::before{
    border-color: #fff;
    transition: .3s;
  }
  &.focus::before{
    border-color: #bfb7b6;
    transition: .3s;
  }
  &.focus:hover::before{
    border-color: #fff;
    transition: .3s;
  }
  &.focus{
    background-color: transparent;
  }
  &.focus:hover{
    background-color: #009471;
    transition: .3s;
  }
}
</style>