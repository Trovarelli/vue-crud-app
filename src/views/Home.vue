<template>
  <v-form v-model="valid" class="form-container">
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
      <v-col cols="12" class="button-div">
        <v-btn :block="mobile" color="primary" @click="handleValidation">
          Cadastrar
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, Directive } from "vue";
import { toast } from "vue3-toastify";
import { mask as vmask } from "vue-the-mask";
import { useStore } from "vuex";
import { CPFValidator } from "../validators";

export default defineComponent({
  name: "Home",
  directives: {
    mask: vmask as Directive,
  },
  setup() {
    const state = reactive({
      mobile: false,
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

    const notify = () => {
      toast.error(
        "Ops! Parece que algo não está certo com o formulário. Por favor, dê uma olhada e corrija se precisar."
      );
    };

    const store = useStore();

    const test = () => {
      store.dispatch("adicionarNovoCliente", state.cliente);
    };

    return { ...toRefs(state), notify, test };
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
        this.notify();
        return;
      }

      this.test();
    },
  },
});
</script>

<style lang="scss">
.form-container {
  width: 100%;
  padding: 1rem;
  border-radius: 14px;
  background-color: white;
}
.siwtch-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.button-div {
  display: flex;
  justify-content: end;
}

.radio-group {
  display: flex;
  align-items: center;

  .radio {
    display: flex;
    align-items: center;
    margin-right: 5px;

    input {
      margin-right: 5px;
      cursor: pointer;
    }

    label {
      cursor: pointer;
    }
  }
}
</style>
