import { createStore } from "vuex";

interface Produto {
  id: number;
  nome: string;
  // outras propriedades do produto
}

interface Cliente {
  name: string;
  document: string;
  phone: string;
  ativo: "Sim" | "Não";
  email: string;
}

export default createStore({
  state: {
    produtos: [] as Produto[],
    clientes: [
      {
        ativo: "Sim",
        document: "707.333.520-30",
        email: "joaosilva@gmail.com",
        name: "João da Silva Ouriço",
        phone: "(14) 99188-6974",
      },
    ] as Cliente[],
  },
  getters: {
    getProdutos(state) {
      return state.produtos;
    },
    getClientes(state) {
      return state.clientes;
    },
  },
  mutations: {
    adicionarProduto(state, novoProduto: Produto) {
      state.produtos.push(novoProduto);
    },
    adicionarCliente(state, novoCliente: Cliente) {
      state.clientes.push(novoCliente);
    },
  },
  actions: {
    adicionarNovoProduto({ commit }, novoProduto: Produto) {
      commit("adicionarProduto", novoProduto);
    },
    adicionarNovoCliente({ commit }, novoCliente: Cliente) {
      commit("adicionarCliente", novoCliente);
    },
  },
  modules: {},
});
