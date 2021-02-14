<template>
  <div class="select">
    <div class="backdrop" v-show="open" @click="openCloseSelect"></div>
    <label class="input__title">{{label}}</label>
    <div class="select__input input" @click="openCloseSelect" :class="{opened : open}">{{placeholder}}</div>
    <div class="select__dropdown" v-if="open">
      <ul class="select__list">
        <li class="select__item"
          :class="{active : item === placeholder}"
          v-for="(item,index) in items" :key="index"
          @click="selectItem(item)"
        >{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppSelect',
  props:{
    label:{
      type: String,
      default: ''
    },
    placeholder:{
      type: String,
      default: ''
    },
    items:{
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    open: false
  }),
  methods:{
    openCloseSelect(){
      this.open = !this.open
    },
    selectItem(item){
      if(item === this.placeholder) return
      this.openCloseSelect()
      this.$emit('selectItem', item)
    },
  }
}
</script>

<style lang="scss" scoped>
.select{
  display: block;
  width: 100%;
  position: relative;

  &__input{
    position: relative;
    height: 49px;
    color: #70544f;
    font-weight: 500;
    display: flex;
    align-items: center;
    font-size: 16px;
    padding: 10px 42px 10px 14px;
    background-color: #F5F5F5;
    cursor: pointer;
    &::after{
      content: '';
      position: absolute;
      right: 21px;
      top: 50%;
      transform: translateY(-50%);
      width: 16px;
      height: 9px;
      background: url('../../assets/img/dropdown.svg') no-repeat;
      background-size: 16px 9px;
    }

    &.opened{
      border-color:#0880AE;
      transition: .3s;
    }
  }
  &__dropdown{
    position: absolute;
    top: 79px;
    left: 0;
    right: 0;
    z-index: 200;
    padding: 12px 0;
    max-height: 200px;
    overflow-y: auto;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04), 0px 20px 20px rgba(44, 39, 56, 0.04);
    background-color: #fff;
  }
}

.input__title{
  display: inline-block;
  font-size: 14px;
  color: #a69895;
  margin-bottom: 7px;
}

.select__item{
  font-size: 16px;
  color: #756F86;
  padding: 12px 15px;
  cursor: pointer;
  transition: .3s;
  &:hover{
    background-color: #EBF4F8;
    transition: .3s;
  }
  &.active{
    background-color: #EBF4F8;
    transition: .3s;
  }
}

.backdrop{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  background-color: rgba(0,0,0,0);
}
</style>