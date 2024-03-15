<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="700" persistent>
      <template #activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular"
          text="Cadastro de Produtos"
          color="primary"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-card prepend-icon="mdi-account" title="Cadastro de Produtos">
        <v-card-text>
          <v-form ref="myForm" v-model="valid" class="form-container">
            <v-row>
              <v-col cols="12" sm="9">
                <v-text-field
                  v-model="produto.name"
                  :rules="nameRules"
                  label="Nome do Produto"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="3">
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

          <v-btn
            text="Cancelar"
            variant="plain"
            @click="dialog = false"
          ></v-btn>

          <v-btn
            color="primary"
            text="Cadastrar"
            variant="tonal"
            @click="handleValidation"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";
import { toast } from "vue3-toastify";
import { useStore } from "vuex";

export default {
  setup() {
    const state = reactive({
      mobile: false,
      valid: false,
      dialog: false,
      produto: {
        name: "",
        ativo: "Sim" as "Sim" | "Não",
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

    const errNotify = () => {
      toast.error(
        "Ops! Parece que algo não está certo com o formulário. Por favor, dê uma olhada e corrija se precisar.",
        {
          autoClose: 3000,
        }
      );
    };

    const store = useStore();

    const saveProduto = () => {
      store.dispatch("adicionarNovoProduto", state.produto);

      toast.success("Produto cadastrado com sucesso", {
        autoClose: 3000,
      });
    };

    return {
      ...toRefs(state),
      errNotify,
      saveProduto,
    };
  },

  computed: {
    produtos() {
      const store = useStore();
      return store.getters.getProdutos;
    },
  },

  created() {
    window.addEventListener("resize", this.handleCheckScreen);
    this.handleCheckScreen();
  },

  methods: {
    handleCheckScreen() {
      if (window.innerWidth <= 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      return;
    },

    handleValidation() {
      if (!this.valid) {
        this.errNotify();
        return;
      }

      this.saveProduto();
      if (this.$refs.myForm) {
        (this.$refs.myForm as HTMLFormElement).reset();
      }

      this.dialog = false;
    },
  },
};
</script>
