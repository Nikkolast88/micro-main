<template>
  <div class="header-breadcrumb">
    <div class="header-heading">
      <div class="header-heading-left">
        <div class="header-heading-title">测试</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss">
.header-breadcrumb {
  padding: 12px 24px 16px 24px;

  .header-heading {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;

    &-left {
      display: flex;
      align-items: center;
      margin: 4px 0;
      overflow: hidden;
    }

    &-title {
      margin-right: 12px;
      margin-bottom: 0;
      overflow: hidden;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 600;
      font-size: 20px;
      line-height: 32px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
