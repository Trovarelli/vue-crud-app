<script lang="ts">
  import Navbar from './components/Navbar.vue';
  import { ref } from 'vue';

  export default {
    name: "App",
    components: { Navbar },
    setup() {
      const foo = ref(145);
      return { foo };
    },
  }
</script>

<template>
  <main>
    <Navbar />
    <div>
      <div class="main-container">
        <router-view />
      </div>
    </div>
  </main>
</template>

<style lang="scss">
  #app {
    min-height: 100vh;
    position: relative;
    background-color: white;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-weight: 400;
  }

  .main-container {
    padding-top: 5rem;
    margin: 0 .8rem;
  }

</style>
