import { Cliente } from "@/types/ClienteModel";
import { Produto } from "@/types/ProdutoModel";
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  plugins: [createPersistedState()],
  state: {
    produtos: [
      {
        id: 1,
        nome: "Arroz",
      },
    ] as Produto[],
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
    getClienteById: (state) => (id: number) => {
      return id !== 0 ? state.clientes.find((todo) => todo.id === id) : null;
    },
  },
  mutations: {
    adicionarProduto(state, novoProduto: Produto) {
      state.produtos.push(novoProduto);
    },
    adicionarCliente(state, novoCliente: Cliente) {
      const id =
        state.clientes.length > 0
          ? state.clientes[state.clientes.length - 1].id + 1
          : 1;
      state.clientes.push({
        ...novoCliente,
        id,
      });
    },
    editarCliente(state, clienteEditado: Cliente) {
      const index = state.clientes.findIndex(
        (cliente) => cliente.id === clienteEditado.id
      );
      if (index !== -1) {
        state.clientes.splice(index, 1, clienteEditado);
      }
    },
    ativarDesativarCliente(state, idCliente: number) {
      state.clientes = state.clientes.map((cliente) => {
        if (cliente.id === idCliente) {
          return {
            ...cliente,
            ativo: cliente.ativo === "Sim" ? "Não" : "Sim",
          };
        }
        return cliente;
      });
    },
  },
  actions: {
    adicionarNovoProduto({ commit }, novoProduto: Produto) {
      commit("adicionarProduto", novoProduto);
    },
    adicionarNovoCliente({ commit }, novoCliente: Cliente) {
      commit("adicionarCliente", novoCliente);
    },
    editarClienteExistente({ commit }, novoCliente: Cliente) {
      commit("editarCliente", novoCliente);
    },
    ativarDesativarClienteExistente({ commit }, clienteId: number) {
      commit("ativarDesativarCliente", clienteId);
    },
  },
  modules: {},
});
