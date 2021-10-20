<template>
  <div class="user-login-container">
    <div class="user-login-lang"></div>
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
                    <eyeInvisible />
                  </template>
                  <template v-else>
                    <eyeAnticon />
                  </template>
                </span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="">
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
          </el-form-item>
          <el-form-item label="">
            <el-button class="block-button" type="primary" @click="onLogIn"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
    <PageFooter />
  </div>
</template>
<script setup lang="ts">
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';
import { reactive, ref, nextTick, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { PageFooter } from '@/components/Layout';
import Verify from './components/Verify.vue';
import { getCaptchaImg, getUserLogin, postCaptchaVerify } from '@/api';
import eyeInvisible from '@/icons/eye-invisible.svg?component';
import eyeAnticon from '@/icons/eye-anticon.svg?component';
import { getEncodeStr } from '@/utils';
import { useStore } from 'vuex';
// import { UserLogin } from '@/api';
const $router = useRouter();
const $store = useStore();
// UserLogin<DTO.User.TUser>({ loginName: '', password: '' }).then((resp) => {
//   console.log(resp.name);
// });
let slider = ref();
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
const captchaState = reactive({
  imgurl: '',
  miniimgurl: '',
  verify: '',
  rand: '',
  blocky: 0,
  w: 400,
  h: 135,
  text: '向右滑动完成拼图',
});
const local = {
  timer: 0,
};
onMounted(() => {
  getImageVerifyCode();
});
/**
 * @description: 验证成功
 * @param {*}
 * @return {*}
 */
const onSuccess = (left: number) => {
  postCaptchaVerifyHandle(left);
};
/**
 * @description: 图形验证码刷新
 * @param {*}
 * @return {*}
 */
const onRefresh = () => {
  captchaState.imgurl = '';
  captchaState.miniimgurl = '';
  captchaState.verify = '';
  captchaState.rand = '';
  getImageVerifyCode();
};
/**
 * @description: 获取图形验证码
 * @param {*}
 * @return {*}
 */
const getImageVerifyCode = () => {
  local.timer && clearTimeout(local.timer);
  local.timer = 0;
  getCaptchaImg<DTO.User.TCaptcha>({}).then((resp) => {
    if (resp) {
      const imgObj = resp;
      captchaState.blocky = imgObj.yPosition; // 滑块距离背景图的垂直高度
      captchaState.imgurl = 'data:image/png;base64,' + imgObj.srcImage;
      captchaState.miniimgurl = 'data:image/png;base64,' + imgObj.cutImage;
      captchaState.rand = imgObj.rand;
      nextTick(() => {
        if (slider.value) {
          slider.value.reset(0);
        }
      });
      // 设置1分钟后若未进行验证操作，则刷新图片
      local.timer = window.setTimeout(() => {
        getImageVerifyCode();
      }, 60 * 1000);
    }
  });
};
const onLogIn = () => {
  form.value.validate((valid: boolean) => {
    if (valid) {
      const temp = {
        authPass: getEncodeStr(formState.authPass),
        loginName: formState.loginName,
        verify: captchaState.verify,
      };
      getUserLoginHandle(temp);
    }
  });
};
const postCaptchaVerifyHandle = (left: number) => {
  postCaptchaVerify<{ verify: string }>({
    movedX: left,
    rand: captchaState.rand,
  }).then((resp) => {
    local.timer && clearTimeout(local.timer);
    if (resp) {
      slider.value.handleSuccess();
      captchaState.verify = resp.verify;
      local.timer = window.setTimeout(() => {
        captchaState.verify = '';
        getImageVerifyCode();
      }, 60 * 1000);
    } else {
      slider.value.handleFail();
      window.setTimeout(() => {
        onRefresh();
      }, 500);
    }
  });
};
const getUserLoginHandle = (temp: API.User.TLogin) => {
  getUserLogin<DTO.User.TUser>(temp).then((resp) => {
    $router.push('/micro-sub');
    $store.dispatch('user/setToken', resp.token);
    // resp
  });
};
</script>
<style lang="scss">
@import '@/styles/components/custom-input.scss';
@import '@/styles/components/custom-button.scss';

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
    display: none;
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
    border-radius: var(--border-radius);
  }
}
</style>
