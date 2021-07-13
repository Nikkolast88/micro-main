<!--
 * @Author: dengriguang@my7g.cn
 * @since: 2021-04-16 15:57:33
 * @lastTime: 2021-07-13 15:25:59
 * @LastAuthor: Do not edit
 * @文件相对于项目的路径: /micro-main/src/components/GlobalHeader/AvatarDropdown.vue
 * @Description: 头部用户组件
-->
<template>
  <el-dropdown>
    <span class="avatar-dropdown el-dropdown-link">
      <span class="account-avatar">
        <span class="avatar-name">userName</span>
        <el-avatar src="userImg"></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="onUser">用户信息</el-dropdown-item>
        <el-dropdown-item divided @click="onLogout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- 用户信息 -->
  <div class="user-dialog">
    <global-dialog v-model:visible="dialogVisible" @confirm="onConfirm">
      <template #body>
        <div class="user-title">
          <info-svg class="icon"></info-svg>
          <span class="fwb">基本信息</span>
        </div>
        <el-row>
          <el-col :span="12">
            <el-form ref="dialogForm" :model="dialogForm" :rules="dialogRules">
              <el-form-item label="姓名" prop="userName">
                <el-input v-model="dialogForm.userName" maxlength="6" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="用户名" prop="loginName">
                <el-input v-model="dialogForm.loginName" disabled placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="电话号码" prop="mobile">
                <el-input v-model="dialogForm.mobile" maxlength="11" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="dialogForm.email" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="所属组织机构" prop="orgName">
                <el-input v-model="dialogForm.orgName" disabled placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="">
                <a class="pointer" @click="onPass">更换密码</a>
              </el-form-item>
              <el-form-item label="用户有效期" prop="expireType">
                <br />
                <span>{{ dialogForm.expireType ? '有期限' : '无期限' }}</span>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12">
            <div class="photo-wall">
              <up-photo
                :props="{
                  name: '上传头像',
                  tipTetx: '仅支持尺寸50*50图片',
                  width: 50,
                  height: 50,
                  message: '仅支持50*50大小图片，请重试'
                }"
                :logo-url="dialogForm.imageUrl"
                @getFile="onFile"
              ></up-photo>
              <div class="photo-name">头像库</div>
              <div class="photo-list">
                <el-row>
                  <el-col v-for="item in requirePhotoList" :key="item" :span="6">
                    <img class="photoItem" :src="item" alt="" @click="onPhoto(item)" />
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
        </el-row>
      </template>
    </global-dialog>
  </div>
  <div class="pass-dialog dialog-container">
    <el-dialog v-model="dialogPassVisible" title="修改密码" width="560px" :before-close="onClose">
      <el-form ref="dialogPassForm" :model="dialogPassForm" :rules="dialogPassRules">
        <el-form-item label="现密码" prop="authPass">
          <el-input v-model="dialogPassForm.authPass" maxlength="20" :type="isAuthPass?'password':'text'" placeholder="请输入当前密码">
            <template #suffix>
              <span @click="isAuthPass=!isAuthPass">
                <template v-if="isAuthPass">
                  <img class="suffix-img pointer" src="../../assets/images/login/preview-close.svg" alt="" srcset="">
                </template>
                <template v-else>
                  <i class="el-icon-view"></i>
                </template>
              </span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newAuthPass">
          <el-input v-model="dialogPassForm.newAuthPass" :type="isNewAuthPass?'password':'text'" placeholder="请使用字母、数字、特殊符号组成密码,最少六位">
            <template #suffix>
              <span @click="isNewAuthPass=!isNewAuthPass">
                <template v-if="isNewAuthPass">
                  <img class="suffix-img pointer" src="../../assets/images/login/preview-close.svg" alt="" srcset="">
                </template>
                <template v-else>
                  <i class="el-icon-view"></i>
                </template>
              </span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmAuthPass">
          <el-input v-model="dialogPassForm.confirmAuthPass" :type="isConfirmAuthPass?'password':'text'" placeholder="请重复输入新密码确认">
            <template #suffix>
              <span @click="isConfirmAuthPass=!isConfirmAuthPass">
                <template v-if="isConfirmAuthPass">
                  <img class="suffix-img pointer" src="../../assets/images/login/preview-close.svg" alt="" srcset="">
                </template>
                <template v-else>
                  <i class="el-icon-view"></i>
                </template>
              </span>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="onPassConfirm">确 认</el-button>
          <el-button type="primary" plain @click="onClose">取 消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue';
// import { getUserInfo } from '@/api/login';
interface IForm {
  userName: string;
  loginName: string;
  mobile: string;
  email: string;
  orgName: string;
  expireType: string;
  imageFile: File | string;
  imageUrl: string;
}
export default defineComponent ({
  name: 'AvatarDropdown',
  components: {
  },
  provide: {
    title: '编辑用户',
    width: '900px',
    confirmText: '确认',
  },
  data() {
    const validateNewAuth = (rule: any, value: any, callback: any) => {
      const reg = new RegExp(/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/);
      if (value === '') {
        callback(new Error('密码长度最少六位，且必须使用字母、数字、特殊符号其中两种类型'));
      }
      if (!reg.test(value)) {
        callback(new Error('密码长度最少六位，且必须使用字母、数字、特殊符号其中两种类型'));
      } else {
        callback();
      }
    };
    const validateConfirmAuth = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback('密码长度最少六位，且必须使用字母、数字、特殊符号其中两种类型');
      } else if (value !== this.dialogPassForm) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    const validateName = (rule: any, value: any, callback: any) => {
      const reg = new RegExp(/^[\u4E00-\u9FA50-9a-zA-Z]+$/);
      if (value === '') {
        callback(new Error('仅支持6个字符以内（中文、字母及数字）'));
      } else if (!reg.test(value)) {
        callback(new Error('仅支持6个字符以内（中文、字母及数字）'));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      dialogPassVisible: false,
      isAuthPass: true,
      isNewAuthPass: true,
      isConfirmAuthPass: true,
      dialogForm: {
        userName: '',
        loginName: '',
        mobile: '',
        email: '',
        orgName: '',
        expireType: '',
        imageFile: '',
        imageUrl: '',
      } as IForm,
      dialogRules: {
        userName: [{ required: true, max: 6, message: '仅支持6个字符以内（中文、字母及数字）' }, { validator: validateName }],
        orgName: [{ required: true, message: '' }],
        expireType: [{ required: true, message: '' }],
      },
      dialogPassForm: {
        authPass: '',
        newAuthPass: '',
        confirmAuthPass: '',
      },
      dialogPassRules: {
        authPass: [{required: true, min: 6, message: '请输入现密码,初始密码为123456' }],
        newAuthPass: [{ required: true, min: 6, message: '密码长度最少六位，且必须使用字母、数字、特殊符号其中两种类型' }, {validator: validateNewAuth, trigger: 'change'}],
        confirmAuthPass: [{ required: true, min: 6, message: '密码长度最少六位，且必须使用字母、数字、特殊符号其中两种类型' }, { validator: validateConfirmAuth, trigger: 'change' }],
      },
      requirePhotoList: [] as any,
    };
  },
  methods: {
    onFile(file: File) {
      this.dialogForm.imageFile = file;
      this.dialogForm.imageUrl = '';
    },
    onPhoto(item: any) {
      this.dialogForm.imageFile = '';
      this.dialogForm.imageUrl = item;
    },
    onConfirm() {
      (this.$refs.dialogForm as any).validate((valid: boolean) => {
        if (valid) {
          const regPhone = new RegExp(/^1[3-9]\d{9}$/);
          const regEmail = new RegExp(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/);
          if (this.dialogForm.mobile !== '') {
            if (!regPhone.test(this.dialogForm.mobile)) {
              this.$message.error('仅11位手机号或座机，只限输入数字');
              return;
            }
          }
          if (this.dialogForm.email !== '') {
            if (!regEmail.test(this.dialogForm.email)) {
              this.$message.error('请输入正确格式的邮箱');
              return;
            }
          }
          this.updateUserHandle();
        }
      });
    },
    onPassConfirm() {
      (this.$refs.dialogPassForm as any).validate((valid: boolean) => {
        if (valid) {
          this.updatePassHandle();
        }
      });
    },
    onClose() {
      this.dialogPassVisible = false;
    },
    onPass() {
      this.dialogPassVisible = true;
      nextTick(() => {
        (this.$refs.dialogPassForm as any).resetFields();
      });
    },
    onUser() {
      this.dialogVisible = true;
    },
    onLogout() {
      this.$confirm('此操作将退出该系统, 是否继续?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确认',
      }).then(() => {
      });
    },
    updatePassHandle() {
    },
    updateUserHandle() {
    },
    getUserInfoHandle() {
      // getUserInfo().then((resp) => {
      //   console.log(resp);
      // });
    },
  },
});
</script>

<style lang="scss">
.avatar-dropdown{
  display: inline-block;
  padding: 0 12px;
  cursor: pointer;
  height: 100%;
  .avatar-name{
    margin-right: 11px;
  }
  .account-avatar{
    display: flex;
    align-items: center;
    height: 100%;
    .el-icon-arrow-down{
      font-size: 20px;
      color: #606266;
    }
  }
}
.user-dialog{
  .el-form-item{
    margin-bottom: 10px;
  }
  a{
    color: #1989FA;
  }
  .user-title{
    display: flex;
    align-items: center;
    color: #1989fa;
    .fwb{
      color: #606266;
      padding-left: 9px;
    }
  }
  .photo-wall{
    border: 1px dashed #dcdfe6;
    width: 300px;
    margin-left: 45px;
    margin-top: 40px;
    .photo-name{
      margin-left: 19px;
      border-bottom: 1px dashed #dcdfe6
    }
    .photo-list{
      padding: 0 9px;
      img{
        width: 50px;
        height: 80px;
        line-height: 80px;
        display: inline-block;
        cursor: pointer;
      }
    }
  }
}
</style>