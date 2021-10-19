<template>
  <div class="logo-container">
    <img src="~@/assets/logo.png" alt="" />
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss">
.logo {
  &-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 64px;
    overflow: hidden;
    line-height: 64px;
    white-space: nowrap;

    img {
      width: auto;
      height: 32px;
    }
  }
}
</style>
