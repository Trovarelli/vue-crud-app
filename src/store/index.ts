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
        name: "Consultoria a dados cadastrais",
        ativo: "Sim",
      },
      {
        id: 2,
        name: "Enriquecimento de dados de pessoas e empresas",
        ativo: "Sim",
      },
      {
        id: 3,
        name: "Prospecção de clientes",
        ativo: "Sim",
      },
      {
        id: 4,
        name: "Contagem de mailing list",
        ativo: "Não",
      },
    ] as Produto[],
    clientes: [
      {
        id: 1,
        ativo: "Sim",
        document: "529.161.520-67",
        email: "joaosilva123@gmail.com",
        name: "João da Silva Oliveira",
        phone: "(42) 99356-7563",
        produtosIds: [1, 4],
      },
      {
        id: 2,
        ativo: "Sim",
        document: "463.425.130-23",
        email: "mariasilva456@gmail.com",
        name: "Maria da Silva Pereira",
        phone: "(33) 98765-4321",
        produtosIds: [2, 3],
      },
      {
        id: 3,
        ativo: "Não",
        document: "530.543.910-86",
        email: "carlossantos789@gmail.com",
        name: "Carlos dos Santos Costa",
        phone: "(11) 99876-5432",
        produtosIds: [],
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
