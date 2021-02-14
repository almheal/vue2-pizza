<template>
  <div class="filter">
    <div class="filter__inner">
      <ul class="filter__list" v-for="(category, index) in categories" :key="index">
        <div class="list__title">{{category.title}}</div>
        <template v-for="(item,index) in items">
          <filter-item
            v-if="item.category === category._id"
            :key="index"
            :filterItem="item"
            @selectItem="selectItemHandler"
          />
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import FilterItem from '@/components/filter/FilterItem'

export default {
  name: 'AppFilter',
  components:{
    FilterItem
  },
  props:{
    items:{
      type: Array,
      default: () => []
    },
    categories:{
      type: Array,
      default: () => []
    },
  },
  methods:{
    async selectItemHandler(item){
      this.$emit('selectItemHandler', item)
    }
  },
}
</script>

<style lang="scss" scoped>
.filter{
  height: 500px;
  padding: 20px 30px;
  margin-bottom: 24px;
  background-color: #fff;
  margin-right: 5px;
}

.filter__inner{
  display: flex;
  align-items: flex-start;
}

.list__title{
  font-weight: 600;
  margin-bottom: 10px;
  padding-left: 30px;
}
</style>