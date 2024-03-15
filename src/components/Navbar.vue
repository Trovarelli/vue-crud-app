<template>
  <header :class="{ 'scrolled-nav': scrollNav }">
    <nav>
      <router-link to="/" class="branding">
        <img src="@/assets/img/logo-branco.svg" alt="logo-empresa" />
      </router-link>
      <ul v-show="!mobile" class="navigation">
        <li>
          <router-link to="/" class="link"> Home </router-link>
        </li>
        <li>
          <router-link to="/clientes" class="link"> Clientes </router-link>
        </li>
        <li>
          <router-link to="/produtos" class="link"> produtos </router-link>
        </li>
      </ul>
      <div class="icon">
        <span
          v-show="mobile"
          :class="{ 'icon-active': mobileNav }"
          @click="toggleMobileNav"
        >
          <font-awesome-icon icon="bars" />
        </span>
      </div>
      <transition name="mobile-nav">
        <ul v-show="mobileNav" class="dropdown-nav">
          <li @click="toggleMobileNav">
            <router-link to="/" class="link"> Home </router-link>
          </li>

          <li @click="toggleMobileNav">
            <router-link to="/clientes" class="link"> Clientes </router-link>
          </li>

          <li @click="toggleMobileNav">
            <router-link to="/produtos" class="link"> produtos </router-link>
          </li>
        </ul>
      </transition>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  setup() {
    const scrollNav = ref(false);
    const mobile = ref(false);
    const mobileNav = ref(false);
    const windowWidth = ref(0);

    const toggleMobileNav = () => {
      mobileNav.value = !mobileNav.value;
    };

    const updateScroll = () => {
      const scrollPosition = window.scrollY;
      scrollNav.value = scrollPosition > 50;
    };

    const checkScreen = () => {
      windowWidth.value = window.innerWidth;
      mobile.value = windowWidth.value <= 750;
      if (mobile.value) mobileNav.value = false;
    };

    onMounted(() => {
      window.addEventListener("resize", checkScreen);
      window.addEventListener("scroll", updateScroll);
      checkScreen();
    });

    return {
      scrollNav,
      mobile,
      mobileNav,
      toggleMobileNav,
    };
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/scss/_variables.scss";

header {
  background-color: #0c5693b6;
  z-index: 99;
  width: 100%;
  position: fixed;
  transition: 0.5s ease all;
  color: $text;

  nav {
    position: relative;
    display: flex;
    flex-direction: row;
    padding: 12px;
    transition: 0.5s ease all;
    width: 90%;
    margin: 0 auto;

    @media (min-width: 1440px) {
      max-width: 1440px;
    }

    ul,
    .link {
      font-weight: 500;
      color: $text;
      list-style: none;
      text-decoration: none;
    }

    li {
      text-transform: uppercase;
      padding: 16px;
      margin-left: 16px;
    }

    .link {
      font-size: 14px;
      transition: 0.5s ease all;
      padding-bottom: 4px;
      border-bottom: 1px solid transparent;

      &:hover {
        border-color: $text;
      }
    }

    .branding {
      display: flex;
      align-items: center;

      img {
        width: 60px;
        transition: 0.5s ease all;
      }
    }

    .navigation {
      display: flex;
      align-items: center;
      flex: 1;
      justify-content: flex-end;
    }

    .icon {
      display: flex;
      align-items: center;
      position: absolute;
      top: 0;
      right: 24px;
      height: 100%;
    }

    span {
      cursor: pointer;
      font-size: 24px;
      transition: 0.8s ease all;
    }
  }

  .icon-active {
    transform: rotate(180deg);
  }

  .dropdown-nav {
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 100%;
    max-width: 250px;
    height: 100%;
    background-color: white;
    top: 0;
    left: 0;
    box-shadow:
      0 4px 6px -1px rgb(0, 0, 0, 0.1),
      0 2px 4px -1px rgb(0, 0, 0, 0.06);
    li {
      margin-left: 0;

      .link {
        color: black;
      }
    }
  }

  .mobile-nav-enter-active,
  .mobile-nav-leave-active {
    transition: 0.5s ease all;
  }

  .mobile-nav-enter-from,
  .mobile-nav-leave-to {
    transform: translateX(-250px);
  }

  .mobile-nav-enter-to {
    transform: translateX(0);
  }
}

.scrolled-nav {
  background-color: $primary;
  box-shadow:
    0 4px 6px -1px rgb(0, 0, 0, 0.1),
    0 2px 4px -1px rgb(0, 0, 0, 0.06);

  nav {
    padding: 8px 0;

    .branding {
      img {
        width: 60px;
      }
    }
  }
}
</style>
