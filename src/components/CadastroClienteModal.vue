<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="700" persistent>
      <template #activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular"
          text="Cadastro de Clientes"
          color="primary"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-card prepend-icon="mdi-account" title="Cadastro de Clientes">
        <v-card-text>
          <v-form ref="myForm" v-model="valid" class="form-container">
            <v-row>
              <v-col cols="12" class="siwtch-div">
                <h2>Cadastro de Clientes</h2>
                <v-switch
                  v-model="cliente.ativo"
                  :label="`Ativo: ${cliente.ativo}`"
                  false-value="Não"
                  color="primary"
                  true-value="Sim"
                  hide-details
                ></v-switch>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="cliente.name"
                  :rules="nameRules"
                  label="Nome"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="cliente.document"
                  v-mask="'###.###.###-##'"
                  :rules="documentRules"
                  label="Documento(CPF)"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="cliente.phone"
                  v-mask="['(##) ####-####', '(##) #####-####']"
                  :rules="phoneRules"
                  label="Telefone"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="cliente.email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                ></v-text-field>
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
import { reactive, toRefs, Directive } from "vue";
import { toast } from "vue3-toastify";
import { mask as vmask } from "vue-the-mask";
import { useStore } from "vuex";
import { CPFValidator } from "../validators";

export default {
  directives: {
    mask: vmask as Directive,
  },
  setup() {
    const state = reactive({
      mobile: false,
      dialog: false,
      valid: false,
      cliente: {
        name: "",
        document: "",
        phone: "",
        ativo: "Sim" as "Sim" | "Não",
        email: "",
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

    const errNotify = () => {
      toast.error(
        "Ops! Parece que algo não está certo com o formulário. Por favor, dê uma olhada e corrija se precisar.",
        {
          autoClose: 3000,
        }
      );
    };

    const store = useStore();

    const saveCliente = () => {
      store.dispatch("adicionarNovoCliente", state.cliente);

      toast.success("Cliente cadastrado com sucesso", {
        autoClose: 3000,
      });
    };

    return {
      ...toRefs(state),
      errNotify,
      saveCliente,
    };
  },
  computed: {
    produtos() {
      const store = useStore();
      return store.getters.getClientes;
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

      this.saveCliente();
      if (this.$refs.myForm) {
        (this.$refs.myForm as HTMLFormElement).reset();
      }

      this.dialog = false;
    },
  },
};
</script>
