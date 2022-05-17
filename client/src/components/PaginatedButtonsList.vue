<template>
  <div>
    <div class="text-center" @click="GET_ITEMS_FROM_DB">
      <v-pagination
        v-model="page"
        :length="pageLength"
        :total-visible="7"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    pageLength: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    ...mapActions(["UPDATE_PAGE_ACTION","GET_ITEMS_FROM_DB"]),
  },
  computed: {
    ...mapGetters(["getPage"]),
    page: {
      get() {
        return this.getPage;
      },
      set(value) {
        this.UPDATE_PAGE_ACTION(value);
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
