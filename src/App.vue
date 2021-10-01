<template>
  <div class="app-container">
    <app-header />

    <main class="generic-container">
      <transition name="page">
        <router-view></router-view>
      </transition>
    </main>
  </div>
</template>

<script>
  import Header from "./components/Header";

  export default {
    components: {
      'app-header': Header
    }
  };
</script>

<style lang="scss" scoped>
  @import "./vars.scss";

  .app-container {
    height:             100vh;
    overflow-y:         scroll;
    -ms-overflow-style: none;
    scrollbar-width:    none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .page-enter, .page-leave-active {
    opacity: 0;
  }

  .page-enter-active, .page-leave-active {
    transition: opacity .375s;
    min-height: $layout-content-height;
  }
</style>
