<template>
  <div>
    <v-card class="item" elevation="2">
      <div>
        <v-img
          :lazy-src="item.itemImg"
          :max-height="200"
          :max-width="400"
          :src="item.itemImg"
          alt="ФОТО ТОВАРУ"
        >
        </v-img>
      </div>
      <div class="item-info">
        <p><strong>Назва товару:</strong>{{ item.itemName }}</p>
        <p>Ціна товару:{{ item.itemPrice }}</p>
        <p><a :href="item.itemURL">Посилання на товар</a></p>
      </div>
      <div
        class="perOfAdvantage"
        v-if="getAvarageSum != undefined"
        :style="`color: ${getPercent.stl}`"
      >
        {{ getPercent.advantage }}
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters(["getAvarageSum"]),
    getPercent() {
      let attrs = this.item.itemPrice.split(" ");
      let percentOfAdvantage =
        (parseInt(attrs.join("")) * 100) / this.getAvarageSum - 100;
      if (attrs.includes("$") || attrs.includes("€")) {
        percentOfAdvantage =
          (parseInt(attrs.join("")) * 29 * 100) / this.getAvarageSum - 100;
      }
      if (percentOfAdvantage < 0) {
        return { advantage: `${percentOfAdvantage.toFixed(2)}%`, stl: "green" };
      } else {
        return { advantage: `${percentOfAdvantage.toFixed(2)}%`, stl: "red" };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  width: 70%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 5px solid black;
  margin: auto;
  margin-bottom: 15px;
  padding: 0 15px;
}
.item-info {
  margin: 50px;
}
.perOfAdvantage {
  position: absolute;
  right: 0;
}
</style>
