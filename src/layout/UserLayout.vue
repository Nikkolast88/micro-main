
<template>
  <div id="userLayout" class="user-layout-wrapper">
    <div class="container">
      <router-view></router-view>
    </div>
    <footer>
      <div class="footer">
        <p>©2021 深圳奇迹智慧网络有限公司 版权所有</p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent ({
  name: 'UserLayout',
});
</script>

<style lang="scss">
#userLayout.user-layout-wrapper {
  height: 100%;
  .container {
    width: 100%;
    min-height: 100%;
    background: #f0f2f5 url(@/assets/images/login/login_bg.png) no-repeat 50%;
    background-size: cover;
    // padding: 110px 0 144px;
    position: relative;
  }
  footer {
    overflow: hidden;
    .footer {
      position: absolute;
      bottom: 20px;
      left: 60px;
      width: 80%;
    overflow: hidden;
    }
    p {
      text-align: center;
      font-size: 14px;
      font-family: FZY3JW, FZY3JW-Regular;
      font-weight: 400;
      text-align: left;
      color: #ffffff;
      line-height: 15px;
      letter-spacing: 2px;
    }
  }
}
</style>