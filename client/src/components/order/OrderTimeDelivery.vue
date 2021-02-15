<template>
  <div class="order__section" :class="{'section-disabled': !disabled}">
    <basket-title
      class="cursor-default"
      :title="'Время доставки'"
    />
    <div class="forms">
      <app-radio
        class="radio__item"
        v-for="(item, index) in timeStatusOptions" :key="index"
        :label="item.label"
        :name="item.property"
        :value="item.label"
        :checked="item.checked"
        :id="item.id"
        @changeRadio="changeTimeInput"
      />
    </div>
    <div class="forms" v-if="activeTimeStatus === 'Выбрать время'">
      <app-select
        class="form-select width-50"
        v-for="(item, index) in time" :key="index"
        :label="item.label"
        :items="item.items"
        :property="item.property"
        @selectItem="changeTimeInput"
      />
    </div>
    <basket-title
      class="cursor-default"
      :title="'Оплата'"
    />
    <div class="forms">
      <app-radio
        class="radio__item"
        v-for="(item, index) in paymentOptions" :key="index"
        :label="item.label"
        :name="item.property"
        :value="item.label"
        :checked="item.checked"
        :id="item.id"
        @changeRadio="changeTimeInput"
      />
    </div>
    <div class="form-group width-50" v-if="activePayment === 'Наличными'">
        <label class="input__name">Сдача с</label>
        <input class="input" type="number" @input="changeTimeInput($event.target.value, 'oddMoney')">
    </div>
    <div class="dropdown__title" @click="commentDropdown">
      Комментарий к заказу для курьера
      <app-triangle-icon :anim="isComment"/>
    </div>
    <div class="dropdown__comment" :class="{show: isComment}">
      <textarea
        class="textarea"
        :placeholder="commentPlaceholder"
        @input="changeTimeInput($event.target.value, 'comment')"
      />
    </div>
    <slot></slot>
  </div>
</template>

<script>
import BasketTitle from '@/components/basket/BasketTitle'
import AppRadio from '@/components/inputs/AppRadio'
import AppSelect from '@/components/inputs/AppSelect'
import AppTriangleIcon from '@/components/AppTriangleIcon'

export default {
  name: 'OrderTimeDelivery',
  components:{
    BasketTitle,
    AppRadio,
    AppSelect,
    AppTriangleIcon
  },
  props:{
    activeTimeStatus: {
      type: String,
      required: true
    },
    activePayment:{
      type: String,
      required: true
    },
    comment:{
      type: String,
      default: ''
    },
    disabled:{
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    isComment: false,
    commentPlaceholder: 'Ваш комментарий увидит только курьер, когда заказ будет готов к доставке. Чтобы изменить ингредиенты, вернитесь в раздел меню',
    timeStatusOptions:[
      {
        property: 'timeStatus',
        label: 'Как можно скорее',
        checked: true,
        id: 'sooner'
      },
      {
        property: 'timeStatus',
        label: 'Выбрать время',
        id: 'select-time'
      },
    ],
    time:[
      {
        label: 'День',
        property: 'timeDay',
        items: []
      },
      {
        label: 'Время',
        property: 'time',
        items: []
      }
    ],
    paymentOptions:[
      {
        property: 'paymentMethod',
        label: 'Наличными',
        checked: true,
        id: 'cashPayment'
      },
      {
        property: 'paymentMethod',
        label: 'Картой курьеру',
        id: 'cardPayment'
      }
    ],
  }),
  methods:{
    commentDropdown(){
      this.isComment = !this.isComment
    },
    changeTimeInput(value, property){
      this.$emit('changeTimeInput', value, property)
    },
    getDays(){
      const monthNames = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
        "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"]
      const dateObj = new Date()
      const month = monthNames[dateObj.getMonth()]
      const day = String(dateObj.getDate()).padStart(2, '0')
      const days = []
      days.push('Сегодня')
      for(let i = 1; i < 7; i++){
        days.push(`${Number(day) + i} ${month}`)
      }
      this.time[0].items = days
    },
    getTimes(){
      const dateObj = new Date()
      const actualHour = dateObj.getHours()
      const hours = []
      if(actualHour === 24){
        hours.push('24:00 - 1:00')
      }
      for(let i = 0; i < Math.abs(24 - actualHour); i++){
        hours.push(`${actualHour + i}:00 - ${actualHour + i + 1}:00`)
      }
      this.time[1].items = hours
    }
  },
  mounted(){
    this.getDays()
    this.getTimes()
    this.changeTimeInput(this.time[1].items[0], 'time')
  }
}
</script>

<style lang="scss" scoped>
.order__section{
  &.section-disabled{
    position: relative;

  &.section-disabled::before{
    display: block;
  }

  &::before{
    content: '';
    display: none;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 500;
    background-color: rgba(255,255,255,0.6);
  }
  }
}

.dropdown__title{
  display: inline-block;
  position: relative;
  padding-right: 15px;
  cursor: pointer;
  color: #009471;
  font-size: 14px;
}

.radio__item{
  margin-right: 30px;
}

.form-select{
  width: calc(50% - 10px);
}

.dropdown__comment{
  height: 0;
  overflow: hidden;
  margin-top: 5px;
  transition: .3s;
  &.show{
    height: 142px;
    transition: .3s;
  }
}

.textarea{
  width: 100%;
  font-size: 16px;
  padding: 12px 16px;
  color: #70544f;
  background-color: #f5f5f5;
  resize: none;
  height: 100%;
}
</style>