<template>
  <v-container class="container">
    <v-row>
      <v-col cols="12" class="justify-end">
        <CadastroClienteModal />
      </v-col>
      <v-col cols="12">
        <v-data-table :headers="headers" :items="clientes" density="compact" item-key="name">
          <template #[`item.ativo`]="{ value }">
            <v-chip :color="getColor(value)">
              {{ value }}
            </v-chip>
          </template>
          <template #[`item.actions`]="{ item }">
            <div class="actions-container">
              <font-awesome-icon class="pencil" icon="pencil" @click="editItem(item)" />
              <font-awesome-icon class="trash" icon="trash" @click="deleteItem(item)" />
            </div>
          </template></v-data-table></v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import CadastroClienteModal from "@/components/CadastroClienteModal.vue";
  import { defineComponent } from "vue";
  import { useStore } from "vuex";
  import type { VDataTable } from "vuetify/components";

  type ReadonlyHeaders = VDataTable["$props"]["headers"];

  export default defineComponent({
    name: "Clientes",
    components: {
      CadastroClienteModal,
    },
    setup() {
      const headers: ReadonlyHeaders = [
        { title: "Id", align: "center", key: "id" },
        { title: "Nome", align: "center", key: "name" },
        { title: "Ativo", align: "center", key: "ativo" },
        { title: "Documento(CPF)", align: "center", key: "document" },
        { title: "E-mail", align: "center", key: "email" },
        { title: "Telefone", align: "center", key: "phone" },
        { title: "Ações", align: "center", key: "actions", sortable: false },
      ];

      return {
        headers,
      };
    },

    computed: {
      clientes() {
        const store = useStore();
        return store.getters.getClientes;
      },
    },

    methods: {
      editItem(item: any) {
        console.log(item.id);
      },

      deleteItem(item: any) {
        console.log(item.id);
      },

      getColor(ativo: "Sim" | "Não") {
        if (ativo === "Não") return "red";
        else return "green";
      },
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

  .justify-end {
    display: flex;
    align-items: center;
    justify-content: end;
  }

  .actions-container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    .pencil {
      cursor: pointer;
      color: $primary;
    }

    .trash {
      cursor: pointer;
      color: #c94b4b;
    }
  }
</style>
