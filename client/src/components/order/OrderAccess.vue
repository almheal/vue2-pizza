<template>
  <app-notification :title="accessTitle">
    <div class="order__info">
      <div class="access__subtitle">Информация о заказе:</div>
      <ul class="order__list">
        <template v-for="(item, index) in orderList">
          <li class="order__item" :key="index" v-if="order[item.property]">
            {{item.name + ':'}} {{order[item.property]}}
          </li>
        </template>
      </ul>
    </div>

  </app-notification>
</template>

<script>
import AppNotification from '@/components/AppNotification'

export default {
  name: 'OrderAccess',
  components:{
    AppNotification
  },
  props:{
    order: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    accessTitle: 'Заказ принят',
    orderList: [
      {
        name: 'Имя',
        property: 'name'
      },
      {
        name: 'Номер телефона',
        property: 'number'
      },
      {
        name: 'E-mail',
        property: 'email'
      },
      {
        name: 'Адрес',
        property: 'address'
      },
      {
        name: 'Квартира',
        property: 'appartament'
      },
      {
        name: 'Этаж',
        property: 'floor'
      },
      {
        name: 'Домофон',
        property: 'intercom'
      },
      {
        name: 'Оплата',
        property: 'paymentMethod'
      },
      {
        name: 'Цена',
        property: 'total'
      }
    ]
  })
}
</script>

<style lang="scss" scoped>
.order__info{
  padding: 20px 0;
  width: 100%;
}

.access__subtitle{
  font-size: 18px;
  margin-bottom: 10px;
}

.order__item{
  color: #009471;
  font-size: 16px;
  margin-bottom: 12px;
}
</style>