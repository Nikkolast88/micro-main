<template>
  <div class="logo-container">
    <div class="container">
      <template v-if="type===1">
        <span class="logo">
          <img src="../../assets/logo.png" alt="">
        </span>
        <span class="name">微前端解决方案</span>
      </template>
      <template v-else>
        <span class="work-logo"><img src="../../assets/logo.png" alt=""></span>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Logo',
  props: {
    type: {
      type: Number,
      default: 1,
    },
  },
});
</script>

<style lang="scss">
.logo-container{
  display: inline-block;
  height: 64px;
  .container{
    display: flex;
    align-items: center;
    height: 100%;
  }
  .logo{
    display: inline-block;
    img{
      display: inline-block;
      vertical-align: sub;
      width: 24px;
      height: 24px;
    }
  }
  .name{
    font-size: 22px;
    color: #fff;
    padding-left: 8px;
  }
  .work-logo{
    display: flex;
    align-items: center;
    img{
      height: 51px;
    }
  }
}
</style>