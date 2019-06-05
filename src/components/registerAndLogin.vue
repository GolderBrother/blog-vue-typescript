<template>
  <el-dialog :title="handleFlag === 'register' ? '注册' : '登录'" :width="isMobile ? '90%' : '50%'" :visible="dialogVisible" @close="cancel">
    <el-form>
      <el-formItem label="邮箱" :label-width="formLabelWidth">
        <el-input
          v-model="params.email"
          placeholder="邮箱"
          @keyup.enter.native="handleOk('login')"
          autocomplete="off"
        ></el-input>
      </el-formItem>
      <el-formItem label="密码" :label-width="formLabelWidth">
        <el-input
          type="password"
          placeholder="密码"
          v-model="params.password"
          @keyup.enter.native="handleOk('login')"
          autocomplete="off"
        ></el-input>
      </el-formItem>
      <el-formItem v-if="handleFlag === 'register'" label="昵称" :label-width="formLabelWidth">
        <el-input v-model="params.name" placeholder="用户名或昵称" autocomplete="off"></el-input>
      </el-formItem>
      <el-formItem v-if="handleFlag === 'register'" label="手机" :label-width="formLabelWidth">
        <el-input v-model="params.phone" placeholder="手机号" autocomplete="off"></el-input>
      </el-formItem>
      <el-formItem v-if="handleFlag === 'register'" label="简介" :label-width="formLabelWidth">
        <el-input v-model="params.introduce" placeholder="个人简介" autocomplete="off"></el-input>
      </el-formItem>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="success" @click="handleOAuth">github 授权登录</el-button>
      <el-button
        v-if="handleFlag === 'login'"
        :loading="btnLoading"
        type="primary"
        @click="handleOk('login')"
      >登 录</el-button>
      <el-button
        v-if="handleFlag === 'register'"
        :loading="btnLoading"
        type="primary"
        @click="handleOk('register')"
      >注 册</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import config from "@/utils/config";
import * as StorageUtils from "@/utils/storage";
import { MD5_SUFFIX, md5 } from "@/utils/utils";

// 需要先定义一个命名空间,这里面的 string 是 你store 统一导出的 store的名称。
const userModule = namespace("user");
@Component({
  // components: {}
})
export default class RegisterAndLogin extends Vue {
  // vuex
  // https://blog.csdn.net/qq_33447462/article/details/85251527
  @userModule.State(state => state.userInfo) userInfo;
  @userModule.Action("saveUser") saveUser;

  @Prop({ default: false }) visible!: boolean;
  @Prop({ default: false }) handleFlag!: string;
  @Prop({ default: false }) isMobile!: string;

  // initial data
  btnLoading: boolean = false;
  loading: boolean = false;
  formLabelWidth: string = this.isMobile ? "40px" : "60px";
  params: any = {
    email: "",
    name: "",
    password: "",
    phone: "",
    introduce: ""
  };

  // lifecycle hook
  mounted() {}

  // computed
  get dialogVisible(): boolean {
    return this.visible;
  }

  // method
  handleOAuth(): void {
    // 保存授权前的页面链接内容
    let preventHistory: object = {
      name: this.$route.name,
      query: this.$route.query
    };
    // console.log('preventHistory :', preventHistory)
    // window.sessionStorage.preventHistory = JSON.stringify(preventHistory);
    StorageUtils.Session.set("preventHistory", preventHistory);
    // window.location.href = 'https://github.com/login/oauth/authorize?client_id=6de90ab270aea2bdb01c&redirect_uri=http://biaochenxuying.cn/login'
    window.location.href = `${config.oauth_uri}?client_id=${
      config.client_id
    }&redirect_uri=${config.redirect_uri}`;
  }

  handleOk(): void {
    const emailReg = new RegExp(
      "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
    ); //正则表达式
    if (!this.params.email) {
      // Message.warning("邮箱不能为空！");
      this.$message({
        message: "邮箱不能为空！",
        type: "warning"
      });
      return;
    } else if (!emailReg.test(this.params.email)) {
      this.$message({
        message: "请输入格式正确的邮箱！",
        type: "warning"
      });
      return;
    }
    if (this.handleFlag === "register") {
      if (!this.params.password) {
        this.$message({
          message: "密码不能为空！",
          type: "warning"
        });
        return;
      } else if (!this.params.name) {
        this.$message({
          message: "用户名不能为空！",
          type: "warning"
        });
        return;
      }
      const re = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
      if (this.params.phone && !re.test(this.params.phone)) {
        this.$message({
          message: "请输入正确的手机号!",
          type: "warning"
        });
        return;
      }
    }
    this.submit();
  }

  // this.$emit
  @Emit()
  cancel(): boolean {
    return false;
  }
  @Emit("ok")
  async submit(): Promise<boolean> {
    let res: any = "";
    this.btnLoading = true;
    this.params.password = md5(MD5_SUFFIX + this.params.password);
    if (this.handleFlag === "register") {
      res = await this.$https.post(this.$urls.register, this.params);
    } else {
      res = await this.$https.post(this.$urls.login, this.params);
    }
    this.btnLoading = false;
    if (res.status === 200) {
      if (res.data.code === 0) {
        const data: any = res.data.data;
        const userInfo: object = {
          _id: data._id,
          name: data.name,
          avatar: data.avatar
        };
        // this.$store.commit("SAVE_USER", {
        //   userInfo
        // });
        // window.sessionStorage.userInfo = JSON.stringify(userInfo);
        StorageUtils.Session.set("userInfo", userInfo);
        // 保存到vuex中
        this.saveUser(userInfo); // -> store.dispatch('saveUser', userInfo)
        console.log("userInfo: %o", this.userInfo, userInfo);
        this.$message({
          message: res.data.message,
          type: "success"
        });
        return false;
      } else {
        this.$message({
          message: res.data.message,
          type: "error"
        });
        return true;
      }
    } else {
      this.$message({
        message: "网络错误!",
        type: "error"
      });
      return true;
    }
  }
}
</script>