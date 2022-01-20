<template>
  <div class="user-login-container">
    <template v-if="defaultSettings.menu && defaultSettings.menu.locale">
      <div class="user-login-lang">
        <lang></lang>
      </div>
    </template>
    <div class="user-login-content">
      <div class="user-login-top"></div>
      <div class="user-login-main">
        <div class="user-login-title">智能杆平台</div>
        <el-form
          ref="form"
          :model="formState"
          :rules="formRuleState"
          label-position="top"
        >
          <el-form-item label="用户名" prop="loginName">
            <el-input
              class="block-input"
              v-model="formState.loginName"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="authPass">
            <el-input
              class="block-input"
              v-model="formState.authPass"
              :type="state.passwordType"
              placeholder="请输入密码"
            >
              <template #suffix>
                <span
                  class="acticon"
                  @click="
                    state.passwordType =
                      state.passwordType === 'password' ? 'text' : 'password'
                  "
                >
                  <template v-if="state.passwordType === 'password'">
                    <!-- <eyeInvisible /> -->
                  </template>
                  <template v-else>
                    <!-- <eyeAnticon /> -->
                  </template>
                </span>
              </template>
            </el-input>
          </el-form-item>
          <!-- <el-form-item label="">
            <Verify
              ref="slider"
              :l="42"
              :r="10"
              :w="captchaState.w"
              :h="captchaState.h"
              :blocky="captchaState.blocky"
              :imgurl="captchaState.imgurl"
              :miniimgurl="captchaState.miniimgurl"
              :slider-text="captchaState.text"
              @success="onSuccess"
              @refresh="onRefresh"
            />
          </el-form-item> -->
          <el-form-item label="">
            <el-button
              class="block-button"
              type="primary"
              @click="onLogIn"
              style="width: 100%"
              >{{ $t('user.signup') }}</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
    <PageFooter></PageFooter>
  </div>
</template>
<script setup lang="ts">
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { PageFooter } from '@/components/Layout/components/Footer';
import Lang from '@/components/Lang/LangComponent.vue';

import { getUserLogin } from '@/api';

import { getEncodeStr } from '@/utils';
import { useUserStore } from '@/store';

const $router = useRouter();
const userStore = useUserStore();
import { useSettings } from '@/hooks';
const defaultSettings = useSettings();

let form = ref();
const state = reactive({
  passwordType: 'password',
});
const formState = reactive({
  loginName: '',
  authPass: '',
});
const formRuleState = reactive({
  loginName: [{ required: true, message: '请输入用户名' }],
  authPass: [{ required: true, message: '请输入密码' }],
});
const onLogIn = () => {
  form.value.validate((valid: boolean) => {
    if (valid) {
      const temp = {
        authPass: getEncodeStr(formState.authPass),
        loginName: formState.loginName,
        verify: '',
      };
      getUserLoginHandle(temp);
    }
  });
};

/**
 * @description: 登录手柄
 * @param {*}
 * @return {*}
 */
const getUserLoginHandle = (temp: API.User.TLogin) => {
  getUserLogin<DTO.User.TUser>(temp).then(async (resp) => {
    $router.push('/micro-sub');
    await userStore.setToken(resp.token);
    // resp
  });
};
</script>
<style lang="scss">
// @import '@/styles/components/custom-input.scss';
// @import '@/styles/components/custom-button.scss';

.user-login {
  &-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    overflow: auto;
    background-image: url('../../assets/images/login/login_bg.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  &-lang {
    width: 100%;
    height: 40px;
    line-height: 44px;
    text-align: right;
  }

  &-content {
    flex: 1 1;
    padding: 32px 0;
    text-align: right;
  }

  &-title {
    color: #1989fa;
    font-size: 32px;
    text-align: center;
  }

  &-main {
    display: inline-block;
    width: 500px;
    margin-top: 90px;
    margin-right: 200px;
    padding: 40px;
    background-color: #fff;
    border-radius: 2px;
  }
}
</style>
