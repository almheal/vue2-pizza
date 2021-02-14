<template>
  <div class="empty__basket">
    <div class="wrapper__empty__img">
      <img class="empty__img" src="../../assets/img/empty-basket.jpg" alt="empty basket">
    </div>
    <div class="empty__text">
      Корзина пуста. Выберите пиццу из меню или повторите предыдущий заказ
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasketEmpty'
}
</script>

<style lang="scss" scoped>
.wrapper__empty__img{
  max-width: 147px;
  width: 100%;
  margin: 0 auto;
  height: 100%;
  margin-bottom: 8px;
}

.empty__img{
  width: 100%;
}

.empty__text{
  color: #a69895;
  line-height: 1.4;
  text-align: center
}
</style>