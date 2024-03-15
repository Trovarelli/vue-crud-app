<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="900" persistent>
      <template #activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular"
          text="Cadastro de Produtos"
          color="primary"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-card title="Cadastro de Produtos">
        <v-card-text>
          <v-form ref="formRef" v-model="valid">
            <v-row>
              <v-col cols="12" sm="10">
                <v-text-field
                  v-model="produto.name"
                  :rules="nameRules"
                  label="Nome"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2" class="siwtch-div">
                <v-switch
                  v-model="produto.ativo"
                  :label="`Ativo: ${produto.ativo}`"
                  false-value="Não"
                  color="primary"
                  true-value="Sim"
                  hide-details
                ></v-switch>
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
            :text="produtoId ? 'Atualizar' : 'Cadastrar'"
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
} from "vue";
import { toast } from "vue3-toastify";
import { mask as vmask } from "vue-the-mask";
import { useStore } from "vuex";

export default defineComponent({
  name: "CadastroProdutoModal",
  directives: {
    mask: vmask as Directive,
  },
  props: {
    openModal: {
      type: Boolean,
      default: false,
    },
    produtoId: {
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
      produto: {
        id: 1,
        name: "",
        ativo: "Sim",
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
    });

    const store = useStore();

    const saveProduto = () => {
      store.dispatch("adicionarNovoProduto", state.produto);
      toast.success("Produto cadastrado com sucesso", {
        autoClose: 3000,
      });
    };

    const updateProduto = () => {
      store.dispatch("editarProdutoExistente", state.produto);
      toast.success("Produto editado com sucesso", {
        autoClose: 3000,
      });
    };

    const handleResetForm = () => {
      if (formRef.value) {
        formRef.value.reset();
        state.produto.ativo = "Sim";
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
      if (props.produtoId) updateProduto();
      else saveProduto();
      handleResetForm();
      handleClose();
    };

    watchEffect(() => {
      if (props.openModal) {
        state.dialog = props.openModal;
      }
      if (props.produtoId !== 0 && state.dialog) {
        state.produto = { ...store.getters.getProdutoById(props.produtoId) };
      } else if (!state.dialog) handleResetForm();
    });

    onMounted(() => {
      window.addEventListener("resize", handleCheckScreen);
      handleCheckScreen();
    });

    return {
      ...toRefs(state),
      formRef,
      handleValidation,
      handleClose,
    };
  },
});
</script>

<style scoped lang="scss">
.siwtch-div {
  display: flex;
  justify-content: end;
  align-items: center;
}
</style>
