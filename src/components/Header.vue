<template>
  <header>
    <div class="generic-container">
      <nav>
        <ul>
          <li v-for="route of routes">
            <router-link :to="route.path">{{ route.name }}</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
  import { routes } from "../routes";

  export default {
    data: () => ({
      routes: routes.filter(item => !item.hidden)
    })
  };
</script>

<style lang="scss" scoped>
  @import "../vars.scss";

  header {
    height:           $layout-navbar-height;
    box-shadow:       $shape-shadow;
    background-color: $main-color;

    nav, ul {
      height: $layout-navbar-height;
    }

    ul {
      list-style:  none;
      display:     flex;
      align-items: center;
      gap:         1rem;

      a {
        text-decoration: none;
        font-weight:     bold;
        font-size:       1.25rem;
      }
    }
  }
</style>
