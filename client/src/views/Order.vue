<template>
  <div class="order">
    <div class="container">
      <div class="order__inner" v-if="!accessOrder">
        <div class="order__body">
          <order-basket
            :total="getTotal"
            :products="getBasket"
          />
        <template v-if="getBasket.length">
          <order-contacts
            :name="order.name"
            :number="order.number"
            :email="order.email"
            @changeContactInput="changeOrderProperty"
          />
          <order-delivery
            :address="order.address"
            :appartament="order.appartament"
            :floor="order.floor"
            :intercom="order.intercom"
            :entrance="order.entrance"
            @changeDeliveryInput="changeOrderProperty"
          />
          <order-time-delivery
            :activeTimeStatus="order.timeStatus"
            :activePayment="order.paymentMethod"
            :comment="order.comment"
            :disabled="getValidInputs"
            @changeTimeInput="changeOrderProperty"
          >
            <div class="wrapper__btn">
              <app-button
                :name="orderBtn"
                :disable="!getValidInputs"
                @buttonOnClick="sendOrder"
              />
            </div>
          </order-time-delivery>
        </template>
        </div>
        <app-promo-code class="code"/>
      </div>
      <order-access :order="order" v-else/>
    </div>
  </div>
</template>

<script>
import AppPromoCode from '@/components/AppPromoCode'
import OrderBasket from '@/components/order/OrderBasket'
import OrderContacts from '@/components/order/OrderContacts'
import OrderDelivery from '@/components/order/OrderDelivery'
import OrderTimeDelivery from '@/components/order/OrderTimeDelivery'
import OrderAccess from '@/components/order/OrderAccess'
import AppButton from '@/components/AppButton'
import { mapActions, mapGetters } from 'vuex'
import {required, minLength, maxLength, email} from 'vuelidate/lib/validators'

export default {
  name: 'Order',
  components:{
    OrderBasket,
    OrderContacts,
    OrderDelivery,
    OrderTimeDelivery,
    OrderAccess,
    AppPromoCode,
    AppButton,
  },
  data: () => ({
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
      intercom: '',
      entrance: '',
      paymentMethod: 'Наличными',
      oddMoney: '',
      comment: '',
      products: [],
      total: null
    },
    orderBtn: 'Заказать',
    accessOrder: false,
  }),
  computed:{
    ...mapGetters({
      getBasket: 'basket/getBasket',
      getTotal: 'basket/getTotal'
    }),
    getValidInputs(){
      const validationProperties = ['name', 'number', 'email', 'address']
      const someValid = validationProperties.every(item => !this.$v.order[item].$invalid)
      return someValid
    }
  },
  methods:{
    ...mapActions({
      getProductsFromLocal: 'basket/getProductsFromLocal',
      calculateTotalBasket: 'basket/calculateTotalBasket',
      removeFromBasket: 'basket/removeFromBasket'
    }),
    changeOrderProperty(value, property){
      this.$v.$touch()
      this.order[property] = value
    },
    sendOrder(){
      this.order.products = this.getBasket
      this.order.total = this.getTotal + '₽'
      this.accessOrder = true
    },
    removeProductHandler(product){
      this.removeFromBasket(product)
    },
  },
  validations:{
    order:{
      name: {required},
      number: {required, maxLength: maxLength(11), minLength: minLength(11)},
      email: {required, email},
      address: {required}
    }
  },
  async mounted(){
    await this.getProductsFromLocal()
    this.calculateTotalBasket()
  }
}
</script>

<style lang="scss" scoped>
.order{
  padding: 50px 0;
  background-color: #F8F8F8;
  min-height: 100vh;
}

.order__inner{
  display: flex;
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

.mr-35{
  margin-right: 35px;
}

.wrapper__btn{
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
}
</style>