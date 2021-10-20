<template>
  <div class="layout-main">
    <PageHeader></PageHeader>
    <main class="layout-content">
      <div class="page-header">
        <div class="page-header-wrap">
          <Breadcrumb></Breadcrumb>
        </div>
      </div>
      <div class="page-content">
        <div class="page-content-children">
          <div class="page-content-wrap">
            <slot></slot>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
import PageHeader from '../Header/index.vue';
import Breadcrumb from '../Breadcrumb/index.vue';
</script>
<style lang="scss">
.layout-main {
  position: relative;
  display: flex;
  flex: auto;
  flex-direction: column;
  width: 0;
  min-height: 100vh;

  .page-content {
    width: 100%;

    &-wrap {
      margin: 24px 24px 0;
    }
  }
}
</style>
