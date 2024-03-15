<template>
  <v-container class="container">
    <v-dialog v-model="confirmDialog" max-width="340">
      <v-card text="Deseja Ativar/Desativar o Cliente ?" title="Atenção !">
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
            @click="confirmActiveInactiveDialog(clienteId)"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col cols="12" class="button-title-container">
        <h2>Tabela de Usuários</h2>
        <CadastroClienteModal
          :open-modal="openModal"
          :cliente-id="clienteId"
          @closed="handleModalClose"
        />
      </v-col>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="clientes"
          density="compact"
          item-key="name"
          no-data-text="Nenhum Cliente Encontrado"
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
                  color="primary"
                  dark
                  v-bind="props"
                />
              </template>
              <v-list>
                <v-list-item>
                  <v-list-item-title
                    class="cursor-pointer flex items-center"
                    @click="editItem(item as Cliente)"
                  >
                    Editar
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title
                    class="cursor-pointer flex items-center"
                    @click="activeInactiveItem(item as Cliente)"
                  >
                    {{
                      (item as Cliente).ativo === "Sim" ? "Inativar" : "Ativar"
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
import { Cliente } from "@/types/ClienteModel";
import CadastroClienteModal from "@/components/CadastroClienteModal.vue";

type ReadonlyHeaders = VDataTable["$props"]["headers"];

export default defineComponent({
  name: "Clientes",
  components: {
    CadastroClienteModal,
  },
  setup() {
    const store = useStore();
    const headers: ReadonlyHeaders = [
      { title: "Id", align: "center", key: "id" },
      { title: "Nome", align: "center", key: "name" },
      { title: "Ativo", align: "center", key: "ativo" },
      { title: "Documento(CPF)", align: "center", key: "document" },
      { title: "E-mail", align: "center", key: "email" },
      { title: "Telefone", align: "center", key: "phone" },
      { title: "Ações", align: "center", key: "actions", sortable: false },
    ];

    const state = reactive({
      openModal: false,
      clienteId: 0,
      confirmDialog: false,
    });

    const handleModalClose = () => {
      state.openModal = false;
      state.clienteId = 0;
    };

    const editItem = (item: Cliente) => {
      state.clienteId = item.id;
      state.openModal = true;
    };

    const activeInactiveItem = (item: Cliente) => {
      state.clienteId = item.id;
      state.confirmDialog = true;
    };

    const handleCloseActiveInactiveDialog = () => {
      state.confirmDialog = false;
      state.clienteId = 0;
    };
    const confirmActiveInactiveDialog = (id: number) => {
      store.dispatch("ativarDesativarClienteExistente", id);
      toast.success("Cliente modificado com sucesso", {
        autoClose: 3000,
      });
      handleCloseActiveInactiveDialog();
    };

    const getColor = (ativo: "Sim" | "Não") => {
      if (ativo === "Não") return "red";
      else return "green";
    };

    const clientes = computed(() => store.getters.getClientes);

    return {
      headers,
      clientes,
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

.pencil {
  cursor: pointer;
  color: #2983ce;
  margin-right: 5px;
}
</style>
