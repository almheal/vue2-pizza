<template>
  <div class="order">
    <div class="container">
      <div class="order__inner">
        <div class="order__body">
          <order-basket
            :total="getTotal"
            :products="getBasket"
          />
        <template v-if="getBasket.length">
          <div class="section">
            <basket-title
              class="cursor-default"
              :title="'Контактная информация'"
            />
            <div class="forms">
              <app-input
                class="form__item"
                v-for="(item, index) in contactForms" :key="index"
                :label="item.label"
                :value="item[item.objName]"
                :schema="item.schema"
                @changeInput="(value) => order[item.objName] = value"
              />
            </div>
          </div>
          <div class="section delivery">
            <div class="section__header">
              <basket-title
                class="mr-35"
                :title="'Доставка'"
              />
              <basket-title
                class="color-grey"
                :title="'Самовывоз'"
              />
            </div>
            <div class="forms forms-delivery">
              <app-input
                class="form__item"
                v-for="(item, index) in deliveryForms" :key="index"
                :label="item.label"
                :value="order[item.objName]"
                :placeholder="item.placeholder"
                @changeInput="(value) => order[item.objName] = value"
              />
              <div class="dropdown__title" @click="intercomDropdown">
                Указать домофон и подъезд
                <app-triangle-icon :anim="isIntercom"/>
              </div>
            </div>
            <div
              class="forms forms-intercom"
              :class="{show: isIntercom}"
            >
              <app-input
                class="form__item"
                v-for="(item, index) in intercomForms" :key="index"
                :label="item.label"
                :value="order[item.objName]"
                :placeholder="item.placeholder"
                @changeInput="(value) => order[item.objName] = value"
              />
            </div>
          </div>
          <div class="section time-delivery" :class="{disabled: getDisable}">
            <basket-title
              class="cursor-default"
              :title="'Время доставки'"
            />
            <div class="inputs__row">
              <app-radio
                class="radio__item"
                v-for="(item, index) in timeForms" :key="index"
                :label="item.label"
                :name="item.objName"
                :value="item.label"
                :checked="item.checked"
                :id="item.id"
                @changeRadio="(value) => order[item.objName] = value"
              />
            </div>
            <div class="inputs__row" v-if="order.timeStatus === 'Выбрать время'">
              <app-select
                class="width-50"
                v-for="(item, index) in time" :key="index"
                :label="item.label"
                :placeholder="order[item.objName]"
                :items="item.items"
                @selectItem="(value) => order[item.objName]= value"
              />
            </div>
            <basket-title
              class="cursor-default"
              :title="'Оплата'"
            />
            <div class="inputs__row">
              <app-radio
                class="radio__item"
                v-for="(item, index) in paymentForm" :key="index"
                :label="item.label"
                :name="item.objName"
                :value="item.label"
                :checked="item.checked"
                :id="item.id"
                @changeRadio="(value) => order[item.objName] = value"
              />
            </div>
            <app-input
              v-if="order.paymentMethod === 'Наличными'"
              class="width-50"
              :label="'Сдача с'"
              :value="order.oddMoney"
              @changeInput="(value) => order.oddMoney = value"
            />
            <div class="dropdown__title" @click="commentDropdown">
              Комментарий к заказу для курьера
              <app-triangle-icon :anim="isComment"/>
            </div>
            <div class="dropdown__comment" v-if="isComment">
              <textarea
                class="textarea"
                :placeholder="commentPlaceholder"
                v-model="order.comment"
              />
            </div>
            <div class="wrapper__btn">
              <app-button
                :name="orderBtn"
                @buttonOnClick="sendOrder"
                :disable="getDisable"
              />
            </div>
          </div>
        </template>
        </div>
        <app-promo-code class="code"/>
      </div>
    </div>
  </div>
</template>

<script>
import AppTriangleIcon from '@/components/AppTriangleIcon'
import OrderBasket from '@/components/order/OrderBasket'
import AppPromoCode from '@/components/AppPromoCode'
import BasketTitle from '@/components/basket/BasketTitle'
import AppInput from '@/components/inputs/AppInput'
import AppRadio from '@/components/inputs/AppRadio'
import AppSelect from '@/components/inputs/AppSelect'
import AppButton from '@/components/AppButton'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Order',
  components:{
    AppTriangleIcon,
    OrderBasket,
    AppPromoCode,
    BasketTitle,
    AppInput,
    AppRadio,
    AppSelect,
    AppButton
  },
  data: () => ({
    contactForms: [
      {
        objName: 'name',
        label: 'Имя *',
      },
      {
        objName: 'number',
        label: 'Номер телефона *'
      },
      {
        objName: 'email',
        label: 'E-mail *'
      },
    ],
    deliveryForms:[
      {
        objName: 'address',
        label: 'Адрес *',
        placeholder: 'Адрес'
      },
      {
        objName: 'appartament',
        placeholder: 'Квартира'
      },
      {
        objName: 'floor',
        placeholder: 'Этаж'
      }
    ],
    intercomForms:[
      {
        objName: 'interdom',
        value: '',
        placeholder: 'Домофон'
      },
      {
        objName: 'entrance',
        placeholder: 'Подъезд'
      }
    ],
    timeForms:[
      {
        objName: 'timeStatus',
        label: 'Как можно скорее',
        checked: true,
        id: 'sooner'
      },
      {
        objName: 'timeStatus',
        label: 'Выбрать время',
        id: 'select-time'
      },
    ],
    time:[
      {
        label: 'День',
        objName: 'timeDay',
        items: []
      },
      {
        label: 'Время',
        objName: 'time',
        items: []
      }
    ],
    paymentForm:[
      {
        objName: 'paymentMethod',
        label: 'Наличными',
        checked: true,
        id: 'cashPayment'
      },
      {
        objName: 'paymentMethod',
        label: 'Картой курьеру',
        id: 'cardPayment'
      }
    ],
    order: {
      name: '',
      number: '',
      email: '',
      address: '',
      appartament: '',
      timeStatus: 'Как можно скорее',
      timeDay: 'Сегодня',
      time: '',
      floor: '',
      interdom: '',
      entrance: '',
      paymentMethod: 'Наличными',
      oddMoney: '',
      comment: '',
      products: []
    },
    isIntercom: false,
    isComment: false,
    basketTitle: 'Корзина',
    contactTitle: 'Контактная информация',
    commentPlaceholder: 'Ваш комментарий увидит только курьер, когда заказ будет готов к доставке. Чтобы изменить ингредиенты, вернитесь в раздел меню',
    orderBtn: 'Заказать'
  }),
  computed:{
    ...mapGetters({
      getBasket: 'basket/getBasket',
      getTotal: 'basket/getTotal'
    }),
    getDisable(){
      if(this.order.address && this.order.name){
        return false
      }else{
        return true
      }
    }
  },
  methods:{
    ...mapActions({
      getProductsFromLocal: 'basket/getProductsFromLocal',
      calculateTotalBasket: 'basket/calculateTotalBasket',
      removeFromBasket: 'basket/removeFromBasket'
    }),
    sendOrder(){
      this.order.products = this.getBasket
    },
    removeProductHandler(product){
      this.removeFromBasket(product)
    },
    intercomDropdown(){
      this.isIntercom = !this.isIntercom
    },
    commentDropdown(){
      this.isComment = !this.isComment
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
  validations:{

  },
  async mounted(){
    await this.getProductsFromLocal()
    this.calculateTotalBasket()
    this.getDays()
    this.getTimes()
    this.order.time = this.time[1].items[0]
  }
}
</script>

<style lang="scss" scoped>
.order{
  background-color: #F8F8F8;
}

.section{
  padding: 32px 64px 24px;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 6px;
}

.order__inner{
  display: flex;
  padding: 50px 0;
  align-items: flex-start;
  min-height: 100vh;
}

.order__body{
  width: 75%;
  margin-right: 30px;
}

.code{
  width: 25%;
}

.forms{
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
}

.form__item{
  width: 50%;
  width: calc(50% - 10px);
  &:nth-child(odd){
    margin-right: 10px;
  }
  &:nth-child(even){
    margin-left: 10px;
  }
}

.forms.forms-delivery{
  & .form__item:nth-child(even){
    margin: 0 10px 20px 0;
  }

  & .form__item:nth-child(odd){
    margin: 0 0 20px 10px;
  }

  & .form__item:first-child{
    width: 100%;
    margin: 0 0 20px 0;
  }
}

.forms.forms-intercom{
  overflow: hidden;
  height: 0;
  margin-top: 0;
  transition: .3s;
  &.show{
    height: 64px;
    margin-top: 15px;
    transition: .3s;
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

.time-delivery{
  position: relative;
  &.disabled::before{
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

.inputs__row{
  display: flex;
  margin: 30px 0;
}

.width-50{
  width: 50%;
  margin-right: 20px;
}

.radio__item{
  margin-right: 30px;
}

.mr-35{
  margin-right: 35px;
}

.dropdown__comment{
  margin-top: 5px;
}

.textarea{
  width: 100%;
  font-size: 16px;
  padding: 12px 16px;
  color: #70544f;
  background-color: #f5f5f5;
  resize: none;
  min-height: 142px;
}

.wrapper__btn{
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
}
</style>