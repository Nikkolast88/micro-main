
<template>
  <div class="page-container">
    <el-container>
      <el-header>
        <page-header></page-header>
      </el-header>
      <el-main style="background: #F2F6FC;">
        <div class="page-main">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PageHeader from '@/components/GlobalHeader/PageHeader.vue';
export default defineComponent({
  name: 'PageLayout',
  components: {
    PageHeader,
  },
});
</script>

<style lang="scss">
</style>