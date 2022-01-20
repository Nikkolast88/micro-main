<template>
  <div class="lang">
    <el-dropdown @command="handleLangCommand">
      <translate theme="outline" size="24" fill="#333" :stroke-width="2" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="zh-CN"
            ><span role="img" aria-label="简体中文" style="margin-right: 8px"
              >🇨🇳</span
            >
            简体中文</el-dropdown-item
          >
          <el-dropdown-item command="en-US"
            ><span role="img" aria-label="English" style="margin-right: 8px"
              >us</span
            >
            English</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup lang="ts">
import { Translate } from '@icon-park/vue-next';
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus';
import { setI18nLanguage } from '@/plugins';
const handleLangCommand = (command: string) => {
  setI18nLanguage(command);
};
</script>
<style lang="scss">
.lang {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  font-size: 18px;
  cursor: pointer;
}
</style>
