<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="900" persistent>
      <v-card title="Associar Produtos">
        <v-card-text>
          <v-form ref="formRef" v-model="valid">
            <v-row>
              <v-col
                cols="12"
                sm="4"
                class="d-flex justify-center align-center"
              >
                {{ cliente.name }}
              </v-col>

              <v-col cols="12" sm="8">
                <!-- O multiple esta habilitado condicionalmente devido a um bug do vuetify -->
                <v-combobox
                  v-model="cliente.produtosIds"
                  color="primary"
                  :items="produtos"
                  item-title="name"
                  item-value="id"
                  label="Produtos Associados"
                  chips
                  :multiple="dialog"
                ></v-combobox>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Cancelar" variant="plain" @click="handleClose"></v-btn>

          <v-btn
            color="primary"
            text="Associar"
            variant="tonal"
            @click="handleAssociarProdutos"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Produto } from "@/types/ProdutoModel";
import {
  reactive,
  toRefs,
  defineComponent,
  watchEffect,
  ref,
  onMounted,
  computed,
} from "vue";
import { toast } from "vue3-toastify";
import { useStore } from "vuex";

export default defineComponent({
  name: "CadastroClienteModal",
  props: {
    openModal: {
      type: Boolean,
      default: false,
    },
    clienteId: {
      type: Number,
      default: undefined,
    },
  },

  setup(props, { emit }) {
    const formRef = ref<HTMLFormElement | null>(null);

    const state = reactive({
      mobile: false,
      dialog: false,
      valid: false,
      cliente: {
        id: 1,
        name: "",
        document: "",
        phone: "",
        ativo: "Sim" as "Sim" | "Não",
        email: "",
        produtosIds: [],
      },
    });

    const store = useStore();

    const produtos = computed(() => store.getters.getProdutos);

    const handleAssociarProdutos = () => {
      store.dispatch("editarClienteExistente", {
        ...state.cliente,
        produtosIds: state.cliente.produtosIds.map((el: Produto) => el.id),
      });
      toast.success("Cliente editado com sucesso", {
        autoClose: 3000,
      });
      state.dialog = false;
      emit("closed");
    };

    const handleClose = () => {
      state.dialog = false;
      emit("closed");
    };

    const handleCheckScreen = () => {
      if (window.innerWidth <= 750) {
        state.mobile = true;
      } else {
        state.mobile = false;
      }
    };

    watchEffect(() => {
      if (props.openModal) {
        state.dialog = props.openModal;
      }
      if (props.clienteId !== 0 && state.dialog) {
        state.cliente = { ...store.getters.getClienteById(props.clienteId) };
      }
    });

    onMounted(() => {
      window.addEventListener("resize", handleCheckScreen);
      handleCheckScreen();
    });

    return {
      ...toRefs(state),
      formRef,
      produtos,
      handleAssociarProdutos,
      handleClose,
    };
  },
});
</script>

<style scoped lang="scss">
.siwtch-div {
  display: flex;
  align-items: center;
}
</style>
