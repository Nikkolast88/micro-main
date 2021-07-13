<template>
  <div class="global-header-right">
    <avatar-dropdown></avatar-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AvatarDropdown from './AvatarDropdown.vue';
export default defineComponent({
  name: 'HeaderContainer',
  components: {
    AvatarDropdown,
  },
  props: {
    className: {
      type: String,
      default: '',
    },
    isShow: {
      type: Boolean,
      default: true,
    },
  },
});
</script>

<style lang="scss">
.global-header-right {
  display: flex;
  float: right;
  height: 64px;
  margin-left: auto;
  overflow: hidden;
}
</style>