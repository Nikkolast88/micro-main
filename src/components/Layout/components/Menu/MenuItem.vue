<template>
  <el-sub-menu :index="menu.path">
    <template #title>
      <span class="aside-anticon icon-anticon">
        <component :is="menu.meta.icon"></component>
      </span>
      <span class="aside-title">{{ menu.meta.title }}</span>
    </template>
    <template v-for="(item, index) in menu.children">
      <el-menu-item
        v-if="!item.children || item.children.length === 0"
        :key="index"
        :index="item.path"
      >
        <template #title>
          <span class="aside-anticon icon-anticon">
            <component :is="item.meta.icon"></component>
          </span>
          <span class="aside-title">{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
      <template v-else>
        <menu-item :key="item.path" :menu="item"></menu-item>
      </template>
    </template>
  </el-sub-menu>
</template>
<script setup lang="ts">
import { ElSubMenu, ElMenuItem } from 'element-plus';
defineProps({
  menu: {
    type: Object,
    default: () => ({}),
  },
});
</script>
