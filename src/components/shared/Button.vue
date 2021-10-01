<template>
  <button
    :class="appearance"
    :type="type"
    @click="emitAction()"
  >
    {{ text }}
  </button>
</template>

<script>
  export default {
    props: {
      text: {
        type:     String,
        required: true
      },
      type: {
        type:    String,
        default: 'button'
      },
      hasConfirmation: {
        type:    Boolean,
        default: false
      },
      appearance: String
    },
    methods: {
      emitAction() {
        if (this.type === 'submit') return;

        if (this.hasConfirmation) {
          if (confirm('Tem certeza?')) this.$emit('executeAction');
          return;
        }

        this.$emit('executeAction');
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../styles/vars.scss";

  button {
    display:       inline-block;
    padding:       10px;
    border-radius: 3px;
    margin:        10px;
    font-size:     1.2em;
    background:    $default-button-color;
    color:         white;

    &.danger {
      background: $danger-color;
      color:      white;
    }
  }
</style>
