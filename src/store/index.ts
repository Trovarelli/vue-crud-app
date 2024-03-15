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
        name: "Arroz",
        ativo: "Sim",
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
    getProdutoById: (state) => (id: number) => {
      return id !== 0 ? state.produtos.find((el) => el.id === id) : null;
    },
    getClientes(state) {
      return state.clientes;
    },
    getClienteById: (state) => (id: number) => {
      return id !== 0 ? state.clientes.find((el) => el.id === id) : null;
    },
  },
  mutations: {
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

    adicionarProduto(state, novoProduto: Produto) {
      const id =
        state.produtos.length > 0
          ? state.produtos[state.produtos.length - 1].id + 1
          : 1;
      state.produtos.push({
        ...novoProduto,
        id,
      });
    },
    editarProduto(state, produtoEditado: Produto) {
      const index = state.produtos.findIndex(
        (produto) => produto.id === produtoEditado.id
      );
      if (index !== -1) {
        state.produtos.splice(index, 1, produtoEditado);
      }
    },
    ativarDesativarProduto(state, idProduto: number) {
      state.produtos = state.produtos.map((produto) => {
        if (produto.id === idProduto) {
          return {
            ...produto,
            ativo: produto.ativo === "Sim" ? "Não" : "Sim",
          };
        }
        return produto;
      });
    },
  },
  actions: {
    adicionarNovoCliente({ commit }, novoCliente: Cliente) {
      commit("adicionarCliente", novoCliente);
    },
    editarClienteExistente({ commit }, novoCliente: Cliente) {
      commit("editarCliente", novoCliente);
    },
    ativarDesativarClienteExistente({ commit }, clienteId: number) {
      commit("ativarDesativarCliente", clienteId);
    },

    adicionarNovoProduto({ commit }, novoProduto: Produto) {
      commit("adicionarProduto", novoProduto);
    },
    editarProdutoExistente({ commit }, novoProduto: Produto) {
      commit("editarProduto", novoProduto);
    },
    ativarDesativarProdutoExistente({ commit }, produtoId: number) {
      commit("ativarDesativarProduto", produtoId);
    },
  },
  modules: {},
});
