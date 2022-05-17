<template>
  <div>
    <v-container>
      <div class="CategorySelector">
        <div class="filterAndSearch">
          <div class="filterParams">
            <div class="filterItem">
              <div>
                <label>Виберіть категорію</label>
              </div>
              <v-select
                name="electronic"
                v-model="selectedSection"
                :items="items"
              >
              </v-select>
            </div>
            <div class="filterItem">
              <div>
                <label>Виберіть стан товару</label>
              </div>
              <v-select v-model="selectedShape" :items="shape"> </v-select>
            </div>
            <div class="filterItem">
              <v-checkbox
                v-model="checkbox"
                label="Сортування за ціною"
                @click="GET_ITEMS_FROM_DB"
              ></v-checkbox>
            </div>
          </div>
          <div class="searchItm">
            <div>
              <v-text-field
                v-model="searchItem"
                placeholder="Пошук"
              ></v-text-field>
            </div>
            <div>
              <v-btn @click="GET_ITEMS_FROM_DB">Пошук</v-btn>
            </div>
          </div>
        </div>
        <div>
          <div v-if="getLoading">klkaf;sdfa</div>
          <div v-else><items-list :listOfItems="sortedListOfItems" /></div>
        </div>
        <div>
          <paginated-buttons-list :pageLength="getTotalPages || 0" />
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import ItemsList from "@/components/ItemsList";
import PaginatedButtonsList from "@/components/PaginatedButtonsList";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      items: [
        "kompyutery-i-komplektuyuschie",
        "nastolnye-kompyutery",
        "servery",
        "komplektuyuschie-i-aksesuary",
        "monitory",
        "vneshnie-nakopiteli",
        "rashodnye-materialy",
        "drugoe",
      ],
      shape: ["", "Б/в", "Нові"],
      
    };
  },
  computed: {
    ...mapGetters([
      "getSectedSection",
      "getListOfItems",
      "getTotalPages",
      "getSearchItem",
      "getCheckbox",
      "getLoading"
    ]),
    sortedListOfItems() {
      if (this.checkbox) {
        let arr1 = this.getListOfItems;
        arr1.sort((a, b) => {
          let attrs1 = a.itemPrice.split(" ");
          let attrs2 = b.itemPrice.split(" ");
          let num1 =
            attrs1.includes("$") || attrs1.includes("€")
              ? parseInt(attrs1.join("")) * 29
              : parseInt(attrs1.join(""));
          let num2 =
            attrs2.includes("$") || attrs2.includes("€")
              ? parseInt(attrs2.join("")) * 29
              : parseInt(attrs2.join(""));
          return num1 - num2;
        });
        return arr1;
      } else {
        return this.getListOfItems;
      }
    },
    selectedSection: {
      get() {
        return this.getSectedSection;
      },
      set(value) {
        this.UPDATE_SECTION_ACTION(value);
      },
    },
    checkbox: {
      get() {
        return this.getCheckbox;
      },
      set(value) {
        this.UPDATE_CHECKBOX_ACTION(value);
      },
    },
    searchItem: {
      get() {
        return this.getSearchItem;
      },
      set(value) {
        this.UPDATE_SEARCH_ITEM_ACTION(value);
      },
    },
    selectedShape: {
      get() {
        return this.getSelectedShape;
      },
      set(value) {
        this.UPDATE_SELECTED_SHAPE(value);
      },
    },
  },

  components: {
    ItemsList,
    PaginatedButtonsList,
  },
  methods: {
    ...mapActions([
      "UPDATE_SECTION_ACTION",
      "GET_ITEMS_FROM_DB",
      "UPDATE_SEARCH_ITEM_ACTION",
      "UPDATE_SELECTED_SHAPE",
      "UPDATE_CHECKBOX_ACTION",
    ]),
  },
  created() {
    this.GET_ITEMS_FROM_DB();
  },
};
</script>

<style lang="scss" scoped>
.filterParams {
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  border: 3px solid black;
  width: 50%;
  margin: auto;
  margin-bottom: 10px;
}
.filterItem {
  padding: 10px;
}
.searchItm {
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
}
.filterAndSearch {
  margin-bottom: 10px;
}
</style>
