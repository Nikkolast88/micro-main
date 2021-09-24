<template>
  <div class="exception">
    <div class="exception-404"></div>
  </div>
</template>
<script setup lang="ts">
</script>
<style lang="scss">
.exception {
  text-align: center;
  &-404 {
    display: inline-block;
    width: 800px;
    height: 800px;
    background: url('~@/assets/404.svg');
  }
}
</style>
