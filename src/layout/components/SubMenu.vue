
<template>
  <el-submenu :index="menu.path">
    <template #title>
      <span class="menu-svg">
        <component :is="menu.meta.icon"></component>
      </span>
      <span>{{ menu.meta.title }}</span>
    </template>
    <template v-for="(item, index) in menu.children">
      <el-menu-item v-if="!item.children || item.children.length ===0" :key="Number(index)" :index="item.path">
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
      <sub-menu v-else :key="item.path" :menu="item"></sub-menu>
    </template>
  </el-submenu>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Schedule from '@/icons/schedule.svg';
export default defineComponent ({
  name: 'SubMenu',
  props: {
    menu: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    return {
      Schedule,
    };
  },
});
</script>

<style lang="scss">

</style>
