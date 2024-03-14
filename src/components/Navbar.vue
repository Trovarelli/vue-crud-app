<template>
  <header :class="{ 'scrolled-nav': scrollNav }">
    <nav>
      <div class="branding">
        <img src="@/assets/logo.png">
      </div>
      <ul v-show="!mobile" class="navigation">
        <li><router-link to="/clientes" class="link">
            Clientes
          </router-link>
        </li>
        <li>
          <router-link to="/produtos" class="link">
            produtos
          </router-link>
        </li>
      </ul>
      <div class="icon">
        <span v-show="mobile" :class="{ 'icon-active': mobileNav }" @click="toggleMobileNav">
          <font-awesome-icon icon="bars" /></span>
      </div>
      <transition name="mobile-nav">
        <ul v-show="mobileNav" class="dropdown-nav">
          <li><router-link to="/clientes" class="link">
              Clientes
            </router-link>

          </li>
          <li>
            <router-link to="/produtos" class="link">
              produtos
            </router-link>
          </li>
        </ul>
      </transition>
    </nav>
  </header>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    data() {
      return {
        scrollNav: false,
        mobile: false,
        mobileNav: false,
        windowWidth: 0
      };
    },
    created() {
      window.addEventListener('resize', this.checkScreen);
      this.checkScreen()
    },
    mounted() {
      window.addEventListener('scroll', this.updateScroll)
    },
    methods: {
      toggleMobileNav() {
        this.mobileNav = !this.mobileNav
      },

      updateScroll() {
        const scrollPosition = window.scrollY
        if (scrollPosition > 50) {
          this.scrollNav = true
          return
        }
        this.scrollNav = false
      },

      checkScreen() {
        this.windowWidth = window.innerWidth
        if (this.windowWidth <= 750) {
          this.mobile = true
          return
        }
        this.mobile = false
        this.mobileNav = false
        return
      }
    }
  });
</script>

<style scoped lang="scss">
  header {
    background-color: rgb(0, 0, 0, 0.8);
    z-index: 99;
    width: 100%;
    position: fixed;
    transition: .5s ease all;
    color: white;

    nav {
      position: relative;
      display: flex;
      flex-direction: row;
      padding: 12px;
      transition: .5s ease all;
      width: 90%;
      margin: 0 auto;

      @media(min-width: 1440px) {
        max-width: 1440px;
      }

      ul,
      .link {
        font-weight: 500;
        color: white;
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
        transition: .5s ease all;
        padding-bottom: 4px;
        border-bottom: 1px solid transparent;

        &:hover {
          color: #00afea;
          border-color: #00afea;
        }
      }

      .branding {
        display: flex;
        align-items: center;

        img {
          width: 50px;
          transition: .5s ease all;
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
        transition: .8s ease all;
      }
    }

    .icon-active {
      transform: rotate(180deg);
    }

    .dropdown-nav {
      display: flex;
      flex-direction: column;
      position: fixed;
      widows: 100%;
      max-width: 250px;
      height: 100%;
      background-color: white;
      top: 0;
      left: 0;

      li {
        margin-left: 0;

        .link {
          color: black;
        }
      }
    }

    .mobile-nav-enter-active,
    .mobile-nav-leave-active {
      transition: .5s ease all;
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
    background-color: black;
    box-shadow: 0 4px 6px -1px rgb(0, 0, 0, 0.1), 0 2px 4px -1px rgb(0, 0, 0, 0.06);

    nav {
      padding: 8px 0;

      .branding {
        img {
          width: 40px;
          box-shadow: 0 4px 6px -1px rgb(0, 0, 0, 0.1), 0 2px 4px -1px rgb(0, 0, 0, 0.06);
        }
      }
    }
  }
</style>