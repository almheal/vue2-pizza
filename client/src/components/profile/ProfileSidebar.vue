<template>
  <div class="sidebar">
    <div class="sidebar__body">
      <div class="user__avatar">
        <img class="user__img" src="../../assets/avatar.svg" alt="avatar">
      </div>
      <template v-for="(item, index) in infoList">
        <div class="user__info"
          :class="{
            edit: item.toggle,
            'info__name': item.property === 'name'
          }"
          :key="index"
        >
          <div class="info__title" v-if="item.label">{{item.label}}</div>
          <div class="info__content"
            v-if="!item.toggle"
          >
            <div class="info__value" v-if="item.property === 'number'">{{getMaskNumber}}</div>
            <div class="info__value"
              v-if="item.property !== 'number' &&
              item.property !== 'password'"
            >{{user[item.property]}}</div>
            <div class="wrapper__icon" @click="changeEdit(item.property)">
              <svg class="edit__icon">
                <use xlink:href="#pen"></use>
              </svg>
            </div>
          </div>
          <div class="form-group"
            v-if="item.toggle &&
            item.property !== 'dateOfBirth'"
          >
            <input
              class="input"
              v-model="user[item.property]"
              :type="item.property === 'password' ? 'password' : 'text'"
              @change="updateUser()"
            >
          </div>
          <template
            v-if="!user[item.property] &&
            item.property === 'dateOfBirth' ||
            item.toggle && user[item.property] && item.property === 'dateOfBirth'">
            <date-picker
              :value="item[item.property]"
              valueType="DD MM YYYYг"
              placeholder="Указать дату рождения"
              @change="selectDateOfBirth"
              @close="closeDatePicker(item)"
              @clear="closeDatePicker(item)"
            />
          </template>
          <div class="background" v-if="item.toggle" @click="changeEdit(item.property)"></div>
          <div class="danger-message" v-if="item.invalid">{{item.invalid}}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css';
import { mapActions } from 'vuex';
import {minLength, required, maxLength, email} from 'vuelidate/lib/validators'

export default {
  name: 'ProfileSidebar',
  components:{
    DatePicker
  },
  props:{
    user:{
      type: Object,
      required: true
    }
  },
  data: () => ({
    infoList: [
      {
        property: 'name',
        toggle: false,
        invalid: ''
      },
      {
        label: 'Мой номер',
        property: 'number',
        toggle: false,
        invalid: ''
      },
      {
        label: 'E-mail',
        property: 'email',
        toggle: false,
        invalid: ''
      },
      {
        label: 'Пол',
        property: 'gender',
        toggle: false,
      },
      {
        label: 'Дата рождения',
        property: 'dateOfBirth',
        toggle: false
      },
    ]
  }),
  computed:{
    getMaskNumber(){
      const maskNumber = this.user.number.split('').reduce((acc, item, index) =>{
        if(index === 1 || index === 4){
          acc.push(' ')
        }else if(index === 7 || index === 9){
          acc.push('-')
        }
        acc.push(item)
        return acc
      },[])
      return maskNumber.join('')
    },
  },
  methods:{
    ...mapActions({
      fetchUpdateUser: 'user/fetchUpdateUser'
    }),
    changeEdit(property){
      this.infoList.forEach(item => {
        if(item.property === property){
          item.toggle = !item.toggle
        }
      })
      this.background = !this.background
    },
    async updateUser(){
      if(this.$v.$invalid){
        this.$v.$touch()
        this.setInvalidMessages()
        return
      }
      await this.fetchUpdateUser(this.user)
    },
    closeDatePicker(item){
      item.toggle = false
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
    async selectDateOfBirth(date){
      this.user.dateOfBirth = this.changeFormatDate(date)
      this.updateUser()
    },
    setInvalidMessages(){
      const properties = ['name', 'number', 'email', 'password']
      const invalidProperties = properties.filter(item => this.$v.user[item].$invalid)
      if(invalidProperties.length){
        invalidProperties.forEach(name =>{
          for(let i = 0; i < this.infoList.length; i++){
            if(this.infoList[i].property === name){
              this.infoList[i].invalid = 'Не корректное значение'
            }
          }
        })
      }
    }
  },
  validations:{
    user:{
      name: {required},
      number: {required, minLength: minLength(11), maxLength: maxLength(11)},
      email: {required, email},
      password: {minLength: minLength(6)}
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar{
  width: 25%;
  background-color: #fff;
  border-radius: 6px;
}

.sidebar__body{
  padding: 28px;
}

.user__avatar{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -98px auto 28px;
  position: relative;
  bottom: 30px;
  width: 135px;
  height: 135px;
  border-radius: 50%;
  &::before{
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url('../../assets/avatar-background.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
}

.user__img{
  position: relative;
  width: 131px;
  height: 131px;
  z-index: 2;
  border-radius: 50%;
}

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