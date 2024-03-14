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
      <router-view />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.main-container {
  padding-top: 6rem;
  margin: 0 0.8rem;
  display: flex;
  justify-content: center;
}
</style>
