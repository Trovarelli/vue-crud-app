import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

interface Produto {
  id: number;
  nome: string;
  // outras propriedades do produto
}

interface Cliente {
  id: number;
  name: string;
  document: string;
  phone: string;
  ativo: "Sim" | "Não";
  email: string;
}

export default createStore({
  plugins: [createPersistedState()],
  state: {
    produtos: [] as Produto[],
    clientes: [
      {
        id: 1,
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
      const id = state.clientes[state.clientes.length - 1].id + 1;
      state.clientes.push({
        ...novoCliente,
        id,
      });
    },
    editarCliente(state, clienteEditado) {
      const index = state.clientes.findIndex(
        (cliente) => cliente.id === clienteEditado.id
      );
      if (index !== -1) {
        state.clientes.splice(index, 1, clienteEditado);
      }
    },
    removerCliente(state, idCliente) {
      state.clientes = state.clientes.filter(
        (cliente) => cliente.id !== idCliente
      );
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
