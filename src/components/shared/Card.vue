<template>
  <div class="card-container">
    <h2
      class="card-title"
      @dblclick="visible = !visible"
    >
      {{ title }}
    </h2>

    <transition name="card-fade">
      <div class="card-content" v-show="visible">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    props: ['title'],
    data:  () => ({visible: false})
  };
</script>

<style lang="scss" scoped>
  @import "../../styles/vars.scss";

  .card-container {
    padding:        0 auto;
    border:         2px solid grey;
    display:        inline-block;
    margin:         5px;
    box-shadow:     $shape-shadow;
    width:          200px;
    height:         100%;
    vertical-align: top;
    text-align:     center;

    .card-title {
      text-align:     center;
      background:     $main-color;
      padding:        10px;
      text-transform: uppercase;
    }

    .card-fade-enter, .card-fade-leave-active {
      opacity: 0;
    }

    .card-fade-enter-active, .card-fade-leave-active {
      transition: opacity .375s;
    }
  }
</style>
