import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    page: 1,
    limit: 25,
    selectedSection: "",
    listOfItems: [],
    totalPages: "",
    searchItem: "",
    selectedShape: "",
    checkbox: false,
    avarageSum: "",
    loading: false,
  },
  getters: {
    getPage: (state) => state.page,
    getPageLimit: (state) => state.limit,
    getSectedSection: (state) => state.selectedSection,
    getListOfItems: (state) => state.listOfItems,
    getTotalPages: (state) => state.totalPages,
    getSearchItem: (state) => state.searchItem,
    getCheckbox: (state) => state.checkbox,
    getAvarageSum: (state) => state.avarageSum,
    getLoading: (state) => state.loading,
  },
  mutations: {
    updatePage(state, page) {
      state.page = page;
    },
    updateSection(state, section) {
      state.selectedSection = section;
    },
    setItemsToState(state, data) {
      state.listOfItems = data.result;
      state.totalPages = data.totalPage;
      state.avarageSum = data.avarageSum;
      state.loading = false;
    },
    updateSearchItem(state, data) {
      state.searchItem = data;
    },
    updateSelectedShape(state, data) {
      state.selectedShape = data;
    },
    updateCheckbox(state, data) {
      state.checkbox = data;
    },
  },
  actions: {
    UPDATE_PAGE_ACTION({ commit }, value) {
      commit("updatePage", value);
    },
    UPDATE_SECTION_ACTION({ commit }, value) {
      commit("updateSection", value);
    },
    UPDATE_SEARCH_ITEM_ACTION({ commit }, value) {
      commit("updateSearchItem", value);
    },
    GET_ITEMS_FROM_DB({ commit }) {
      axios
        .get(
          `http://localhost:5000/electronic/getItems?page=${this.state.page}&limit=${this.state.limit}&category=${this.state.selectedSection}&search=${this.state.searchItem}&subCategory=${this.state.selectedShape}`
        )
        .then((response) => commit("setItemsToState", response.data));
    },
    UPDATE_SELECTED_SHAPE({ commit }, data) {
      commit("updateSelectedShape", data);
    },
    UPDATE_CHECKBOX_ACTION({ commit }, data) {
      commit("updateCheckbox", data);
    },
  },
});
