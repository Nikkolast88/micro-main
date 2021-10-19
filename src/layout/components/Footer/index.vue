<template>
  <footer class="layout-footer">
    <div class="global-footer">
      <div class="global-footer-links">
        <a title="7G" target="_blank">7G</a>
        <a title="github" href="https://github.com/DengRiGuang/micro-main.git"
          >github</a
        >
      </div>
      <div class="global-footer-copyright">
        <span class="anticon anticon-copyright">
          <copyright />
        </span>
        2021 7G智慧技术部出品
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
import copyright from '@/icons/copyright.svg?component';
</script>
<style lang="scss">
.layout-footer {
  flex: 0 0 auto;
  padding: 0;
  color: rgba(0, 0, 0, 0.85);

  .global-footer {
    margin: 48px 0 24px;
    text-align: center;

    &-links {
      margin-bottom: 8px;

      a {
        margin-right: 40px;
      }
    }

    .anticon {
      display: inline-block;
      color: inherit;
      font-style: normal;
      line-height: 0;
      text-align: center;
      text-transform: none;
      vertical-align: -0.125em;
      text-rendering: optimizeLegibility;
    }
  }
}
</style>
