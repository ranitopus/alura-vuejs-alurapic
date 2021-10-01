<template>
  <img class="responsive-image" :src="url" :alt="title">
</template>

<script>
  export default {
    props: ['url', 'title']
  };
</script>

<style lang="scss" scoped>
  .responsive-image {
    width: 100%;
  }
</style>
