<template>
  <div class="itemsList">
      <list-item :item="item" v-for="item in listOfItems" :key="item._id"/>
  </div>
</template>

<script>
import listItem from "@/components/ListItem";
export default {

  components: {
    listItem,
  },
  props: {
      listOfItems: {
          type: Array,
          default: () => []
      },
  },
};
</script>

<style lang="scss" scoped>
.itemsList{
  display: flex;
  flex-direction:column;
  justify-content: center;
}
</style>
