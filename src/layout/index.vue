<template>
  <div class="layout-container">
    <section class="layout-has-sider">
      <div :style="sideStyle"></div>
      <AsideMenu></AsideMenu>
      <MainView>
        <slot></slot>
      </MainView>
    </section>
  </div>
</template>
<script setup lang="ts">
import AsideMenu from './components/Menu/index.vue';
import MainView from './components/Main/index.vue';
const sideStyle = {
  width: '208px',
  overflow: 'hidden',
  flex: '0 0 208px',
  maxWidth: '208px',
  minWidth: '208px',
  transition:
    'background-color 0.3s ease 0s, min-width 0.3s ease 0s, max-width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) 0s',
};
</script>
<style lang="scss">
.layout {
  &-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100%;
  }
  &-has-sider {
    display: flex;
    flex: auto;
    flex-direction: row;
    min-height: 100%;
  }
}
</style>
