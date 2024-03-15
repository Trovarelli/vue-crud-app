<template>
  <v-container class="container">
    <v-dialog v-model="confirmDialog" max-width="340">
      <v-card text="Deseja Ativar/Desativar o Produto ?" title="Atenção !">
        <template #actions>
          <v-btn
            class="ml-auto"
            text="Cancelar"
            @click="handleCloseActiveInactiveDialog"
          ></v-btn>
          <v-btn
            class="ml-auto"
            text="Confirmar"
            color="error"
            @click="confirmActiveInactiveDialog(produtoId)"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col cols="12" class="button-title-container">
        <v-row>
          <v-col cols="12" sm="6" class="d-flex align-center">
            <h2>Tabela de Produtos</h2>
          </v-col>
          <v-col cols="12" sm="6" class="button-col">
            <CadastroProdutoModal
              :open-modal="openModal"
              :produto-id="produtoId"
              @closed="handleModalClose"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="produtos"
          density="compact"
          item-key="name"
          no-data-text="Nenhum Produto Encontrado"
          items-per-page-text="Itens por página"
        >
          <template #[`item.ativo`]="{ value }">
            <v-chip :color="getColor(value)">
              {{ value }}
            </v-chip>
          </template>
          <template #[`item.actions`]="{ item }">
            <v-menu>
              <template #activator="{ props }">
                <font-awesome-icon
                  icon="list-dots"
                  class="cursor-pointer"
                  color="#0c5693"
                  dark
                  v-bind="props"
                />
              </template>
              <v-list>
                <v-list-item>
                  <v-list-item-title
                    class="cursor-pointer flex items-center"
                    @click="editItem(item as Produto)"
                  >
                    Editar
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title
                    class="cursor-pointer flex items-center"
                    @click="activeInactiveItem(item as Produto)"
                  >
                    {{
                      (item as Produto).ativo === "Sim" ? "Inativar" : "Ativar"
                    }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";
import type { VDataTable } from "vuetify/components";
import { toast } from "vue3-toastify";
import { Produto } from "@/types/ProdutoModel";
import CadastroProdutoModal from "@/components/CadastroProdutoModal.vue";

type ReadonlyHeaders = VDataTable["$props"]["headers"];

export default defineComponent({
  name: "Produtos",
  components: {
    CadastroProdutoModal,
  },
  setup() {
    const store = useStore();
    const headers: ReadonlyHeaders = [
      { title: "Id", align: "center", key: "id" },
      { title: "Nome", align: "center", key: "name" },
      { title: "Ativo", align: "center", key: "ativo" },
      { title: "Ações", align: "center", key: "actions", sortable: false },
    ];

    const state = reactive({
      openModal: false,
      produtoId: 0,
      confirmDialog: false,
    });

    const handleModalClose = () => {
      state.openModal = false;
      state.produtoId = 0;
    };

    const editItem = (item: Produto) => {
      state.produtoId = item.id;
      state.openModal = true;
    };

    const activeInactiveItem = (item: Produto) => {
      state.produtoId = item.id;
      state.confirmDialog = true;
    };

    const handleCloseActiveInactiveDialog = () => {
      state.confirmDialog = false;
      state.produtoId = 0;
    };
    const confirmActiveInactiveDialog = (id: number) => {
      store.dispatch("ativarDesativarProdutoExistente", id);
      toast.success("Produto modificado com sucesso", {
        autoClose: 3000,
      });
      handleCloseActiveInactiveDialog();
    };

    const getColor = (ativo: "Sim" | "Não") => {
      if (ativo === "Não") return "red";
      else return "green";
    };

    const produtos = computed(() => store.getters.getProdutos);

    return {
      headers,
      produtos,
      confirmActiveInactiveDialog,
      handleCloseActiveInactiveDialog,
      ...toRefs(state),
      handleModalClose,
      editItem,
      activeInactiveItem,
      getColor,
    };
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/scss/_variables.scss";

.container {
  width: 100%;
  padding: 1rem;
  border-radius: 14px;
  background-color: white;
}

.button-title-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.button-col {
  display: flex;
  justify-content: end;

  @media only screen and (max-width: 600px) {
    justify-content: center;
  }
}
</style>
