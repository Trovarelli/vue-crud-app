<script lang="ts">
import Navbar from "./components/Navbar.vue";
import { ref } from "vue";

export default {
  name: "App",
  components: { Navbar },
  setup() {
    const foo = ref(145);
    return { foo };
  },
};
</script>

<template>
  <main>
    <Navbar />
    <div class="main-container">
      <div class="container">
        <router-view />
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.main-container {
  padding-top: 6rem;
  margin: 0 0.8rem;
  display: flex;
  justify-content: center;

  .container {
    width: 100%;
    max-width: 1400px;
  }
}
</style>
