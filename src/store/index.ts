import { createStore } from "vuex";

export default createStore({
  state: {
    produtos: [],
    clientes: [],
    navbar: {
      collapse: true,
      width: 180,
      widthCollapsed: 38,
    }
  },
  getters: {
    getProdutos(state) {
      return state.produtos;
    },
    getClientes(state) {
      return state.clientes;
    },
    getNavbarWidth({navbar}) {
      return navbar.collapse ? 38 : 180
    }
  },
  mutations: {
    setNavbarCollapse({navbar}, collapse: boolean) {
      navbar.collapse = collapse
    },
  },
  modules: {},
});
