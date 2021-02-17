<template>
  <div class="user__info"
    :class="{
      edit: toggleBackground,
      'info__name': profileInfo.property === 'name'
    }"
    >
    <div class="info__title">{{profileInfo.label}}</div>
    <div class="info__content" v-if="!toggleBackground">
      <div class="info__value" v-if="profileInfo.property === 'number'">{{getMaskNumber}}</div>
      <div class="info__value" v-else>{{user[profileInfo.property]}}</div>
      <div class="wrapper__icon"
        v-if="profileInfo.property !== 'dateOfBirth' || user[profileInfo.property]"
        @click="changeEdit(true)"
      >
        <svg class="edit__icon">
          <use xlink:href="#pen"></use>
        </svg>
      </div>
    </div>
    <div class="form-group"
      v-if="toggleBackground &&
      profileInfo.property !== 'dateOfBirth'"
    >
      <input
        class="input"
        :value="user[profileInfo.property]"
        type="text"
        @change="updateUser($event.target.value)"
      >
    </div>
    <template
      v-if="!user[profileInfo.property] &&
      profileInfo.property === 'dateOfBirth' ||
      toggleBackground && user[profileInfo.property] && profileInfo.property === 'dateOfBirth'"
    >
      <date-picker
        :value="user[profileInfo.property]"
        valueType="DD MM YYYYг"
        placeholder="Указать дату рождения"
        @change="updateUser"
        @close="changeEdit(false)"
      />
    </template>
    <div class="background" v-if="toggleBackground" @click="changeEdit(false)"></div>
    <div class="danger-message" v-if="profileInfo.invalid">{{profileInfo.invalid}}</div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css';

export default {
  name: 'ProfileItem',
  components:{
    DatePicker
  },
  props:{
    user:{
      type: Object,
      required: true
    },
    profileInfo:{
      type: Object,
      required: true
    }
  },
  data: () => ({
    toggleBackground: false
  }),
  computed:{
    getMaskNumber(){
      const maskNumber = this.user.number.split('')
      maskNumber.splice(1,0,' ')
      maskNumber.splice(5,0,' ')
      maskNumber.splice(9,0,'-')
      maskNumber.splice(12,0,'-')
      return maskNumber.join('')
    },
  },
  methods:{
    changeEdit(value){
      this.toggleBackground = value
    },
    updateUser(value){
      if(this.profileInfo.property === 'dateOfBirth'){
        value = this.changeFormatDate(value)
      }
      this.$emit('updateUser', {value, item: this.profileInfo})
    },
    changeFormatDate(date){
      const monthArr = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']
      const format = date.split(' ').reduce((acc, item, index) =>{
        if(index === 1){
          const month = item[0] == 0 ? item[1] - 1 : item - 1
          acc.push(monthArr[month])
          return acc
        }
        acc.push(item)
        return acc
      },[])
      return format.join(' ')
    },
  }
}
</script>

<style lang="scss" scoped>
.user__info{
  margin-bottom: 30px;
  &.edit{
    position: relative;
    z-index: 160;
  }
  &.info__name .info__content{
    font-family: 'Gotham';
    font-weight: 700;
    font-size: 18px;
    justify-content: center;
  }
  &:last-child{
    margin-bottom: 0;
  }
}

.info__title{
  font-size: 12px;
  color: #a69895;
  margin-bottom: 16px;
}

.info__content{
  display: flex;
  font-family: 'Roboto';
  font-weight: 500;
  justify-content: flex-start;
  align-items: center;
  font-size: 16px;
}

.wrapper__icon{
  cursor: pointer;
  &:hover .edit__icon{
    fill: #009471;
    transition: .3s;
  }
}

.edit__icon{
  width: 24px;
  height: 24px;
  padding: 3px;
  fill: #ededed;
  margin-left: 5px;
  transition: .3s;
}

.background{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background-color: rgba(0,0,0,0);
}

.info__button{
  color: #009471;
  transition: .3s;
  &:hover{
    color: #006d54;
    transition: .3s;
  }
}

.danger-message{
  color: #c21313;
  margin-top: 5px;
}
</style>