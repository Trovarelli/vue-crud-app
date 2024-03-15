<template>
  <div class="container">
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">
          Bem-vindo ao sistema de gerenciamento de clientes e produtos
        </h1>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Clientes</v-card-title>
          <v-card-text>
            <p>Aqui você pode gerenciar os clientes do sistema.</p>
            <p>Adicione, edite ou inative clientes conforme necessário.</p>
          </v-card-text>
          <v-card-actions>
            <router-link to="/clientes" class="text-decoration-none">
              <v-btn color="primary">Gerenciar Clientes</v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Produtos</v-card-title>
          <v-card-text>
            <p>Aqui você pode gerenciar os produtos do sistema.</p>
            <p>Adicione, edite ou inative produtos conforme necessário.</p>
          </v-card-text>
          <v-card-actions>
            <router-link to="/produtos" class="text-decoration-none">
              <v-btn color="primary">Gerenciar Produtos</v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
.container {
  width: 100%;
  padding: 1rem;
  border-radius: 14px;
  background-color: white;
}

.text-center {
  text-align: center;
}

.text-decoration-none {
  text-decoration: none;
}
</style>
