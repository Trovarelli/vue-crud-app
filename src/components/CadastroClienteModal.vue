<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="900" persistent>
      <template #activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular"
          text="Cadastro de Clientes"
          color="success"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-card title="Cadastro de Clientes">
        <v-card-text>
          <v-form ref="formRef" v-model="valid">
            <v-row>
              <v-col cols="12" sm="4" md="2" class="siwtch-div">
                <v-switch
                  v-model="cliente.ativo"
                  :label="`Ativo: ${cliente.ativo}`"
                  false-value="Não"
                  color="#0c5693"
                  true-value="Sim"
                  hide-details
                ></v-switch>
              </v-col>
              <v-col cols="12" sm="8" md="10">
                <v-text-field
                  v-model="cliente.name"
                  color="#0c5693"
                  :rules="nameRules"
                  label="Nome"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="cliente.document"
                  v-mask="'###.###.###-##'"
                  color="#0c5693"
                  :rules="documentRules"
                  label="Documento(CPF)"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="cliente.phone"
                  v-mask="['(##) ####-####', '(##) #####-####']"
                  color="#0c5693"
                  :rules="phoneRules"
                  label="Telefone"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="cliente.email"
                  color="#0c5693"
                  :rules="emailRules"
                  label="E-mail"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <!-- O multiple esta habilitado condicionalmente devido a um bug do vuetify -->
                <v-combobox
                  v-model="cliente.produtosIds"
                  color="#0c5693"
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
            color="#0c5693"
            :text="clienteId ? 'Atualizar' : 'Cadastrar'"
            variant="tonal"
            @click="handleValidation"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import {
  reactive,
  toRefs,
  Directive,
  defineComponent,
  watchEffect,
  ref,
  onMounted,
  computed,
} from "vue";
import { toast } from "vue3-toastify";
import { mask as vmask } from "vue-the-mask";
import { useStore } from "vuex";
import { CPFValidator } from "../validators";
import { Produto } from "@/types/ProdutoModel";

export default defineComponent({
  name: "CadastroClienteModal",
  directives: {
    mask: vmask as Directive,
  },
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
      nameRules: [
        (value: string) => {
          if (value) return true;
          return "Campo Obrigatório.";
        },
        (value: string) => {
          if (value?.length <= 100) return true;
          return "Limite de 100 caracteres";
        },
      ],
      documentRules: [
        (value: string) => {
          if (value) return true;
          return "Campo Obrigatório.";
        },
        (value: string) => {
          if (!CPFValidator(value)) return "CPF Inválido";
          return true;
        },
      ],
      phoneRules: [
        (value: string) => {
          if (value) return true;
          return "Campo Obrigatório.";
        },
        (value: string) => {
          if (value?.length <= 15 && value?.length >= 14) return true;
          return "Número de Telefone inválido";
        },
      ],
      emailRules: [
        (value: string) => {
          if (value) return true;
          return "Campo Obrigatório";
        },
        (value: string) => {
          if (/.+@.+\..+/.test(value)) return true;
          return "O E-mail precisa ser válido.";
        },
      ],
    });

    const store = useStore();

    const produtos = computed(() => store.getters.getProdutos);

    const saveCliente = () => {
      store.dispatch("adicionarNovoCliente", {
        ...state.cliente,
        produtosIds: state.cliente.produtosIds.map((el: Produto) => el.id),
      });
      toast.success("Cliente cadastrado com sucesso", {
        autoClose: 3000,
      });
    };

    const updateCliente = () => {
      store.dispatch("editarClienteExistente", {
        ...state.cliente,
        produtosIds: state.cliente.produtosIds.map((el: Produto) => el.id),
      });
      toast.success("Cliente editado com sucesso", {
        autoClose: 3000,
      });
    };

    const handleResetForm = () => {
      if (formRef.value) {
        formRef.value.reset();
        state.cliente.ativo = "Sim";
      }
    };

    const handleClose = () => {
      state.dialog = false;
      emit("closed");
      handleResetForm();
    };

    const handleCheckScreen = () => {
      if (window.innerWidth <= 750) {
        state.mobile = true;
      } else {
        state.mobile = false;
      }
    };

    const handleValidation = () => {
      if (!state.valid) {
        toast.error(
          "Ops! Parece que algo não está certo com o formulário. Por favor, dê uma olhada e corrija se precisar.",
          {
            autoClose: 3000,
          }
        );
        return;
      }
      if (props.clienteId) updateCliente();
      else saveCliente();
      handleResetForm();
      handleClose();
    };

    watchEffect(() => {
      if (props.openModal) {
        state.dialog = props.openModal;
      }
      if (props.clienteId !== 0 && state.dialog) {
        state.cliente = { ...store.getters.getClienteById(props.clienteId) };
      } else if (!state.dialog) handleResetForm();
    });

    onMounted(() => {
      window.addEventListener("resize", handleCheckScreen);
      handleCheckScreen();
    });

    return {
      ...toRefs(state),
      formRef,
      produtos,
      handleValidation,
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
