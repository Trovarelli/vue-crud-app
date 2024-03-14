<template>
  <v-form v-model="valid" class="container">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="name"
            :counter="100"
            :rules="nameRules"
            label="Nome"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    name: "",
    nameRules: [
      (value) => {
        if (value) return true;

        return "Campo Obrigatório.";
      },
      (value) => {
        if (value?.length <= 100) return true;

        return "Limite de 100 caracteres";
      },
    ],
    email: "",
    emailRules: [
      (value) => {
        if (value) return true;

        return "Campo Obrigatório";
      },
      (value) => {
        if (/.+@.+\..+/.test(value)) return true;

        return "O E-mail precisa ser válido.";
      },
    ],
  }),
};
</script>

<style lang="scss">
.container {
  width: 100%;
  padding: 10px;
  border-radius: 14px;
  background-color: white;
}
</style>
