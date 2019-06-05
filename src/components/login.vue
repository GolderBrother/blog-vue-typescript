<template>
  <Dialog title="登录" width="60%" :visible="dialogVisible" @close="cancel">
    <Form>
      <FormItem label="邮箱" placeholder="邮箱" :label-width="formLabelWidth">
        <Input v-model="params.email" autocomplete="off"></Input>
      </FormItem>
      <FormItem label="密码" :label-width="formLabelWidth">
        <Input type="password" placeholder="密码" v-model="params.password" autocomplete="off"></Input>
      </FormItem>
    </Form>
    <div slot="footer" class="dialog-footer">
      <Button type="success" @click="handleOAuth">github 授权登录</Button>
      <Button type="primary" @click="handleOk">确 定</Button>
    </div>
  </Dialog>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Dialog, Form, FormItem, Input, Button } from "element-ui";
import {MD5_SUFFIX, md5} from '../../utils/utils';

import config from "@/utils/config";
import * as StorageUtils from "@/utils/storage";
const userModule = namespace('user');
@Component({
  components: {
    Dialog,
    Form,
    FormItem,
    Input,
    Button
  }
})
export default class Login extends Vue {
  // vuex-class
  @userModule.State(state => state.userInfo) userInfo;
  @userModule.Action('saveUser') saveUser;

  @Prop({ default: false }) visible!: boolean;

  // initial data
  btnLoading: boolean = false;
  loading: boolean = false;
  formLabelWidth: string = "60px";
  params: any = {
    email: "",
    password: ""
  };

  // lifecycle hook
  mounted() {
    // this.greet();
    console.log("userInfo: %o", this.userInfo);
  }

  // computed
  get dialogVisible(): boolean {
    return this.visible;
  }

  // method
  handleOAuth(): void {
    // 保存授权前的页面链接内容
    let preventHistory = {
      pathname: window.location.pathname,
      search: window.location.search
    };
    StorageUtils.Session.set("preventHistory", preventHistory);
    // window.sessionStorage.preventHistory = JSON.stringify(preventHistory);
    // window.location.href = 'https://github.com/login/oauth/authorize?client_id=6de90ab270aea2bdb01c&redirect_uri=http://biaochenxuying.cn/login'
    window.location.href = `${config.oauth_uri}?client_id=${
      config.client_id
    }&redirect_uri=${config.redirect_uri}`;
  }

  handleOk(): undefined {
    const emailReg: RegExp = new RegExp(
      "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
    );
    if (!this.params.email) {
      // Message.warning("邮箱不能为空！");
      this.$message({
        message: "邮箱不能为空！",
        type: "warning"
      });
      return;
    } else if (!emailReg.test(this.params.email)) {
      // Message.warning("请输入格式正确的邮箱！");
      this.$message({
        message: "请输入格式正确的邮箱！",
        type: "warning"
      });
      return;
    } else if (!this.params.password) {
      // Message.warning("密码不能为空");
      this.$message({
        message: "密码不能为空",
        type: "warning"
      });
      return;
    }
    this.submit();
  }

  // this.$emit
  @Emit()
  cancel() {
    return false;
  }
  @Emit("ok")
  async submit(): Promise<any> {
    this.params.password = md5(MD5_SUFFIX + this.params.password);
    const res: any = await this.$https.post(this.$urls.login, this.params);
    console.log("res :", res);
    if (res.status === 200) {
      if (res.data.code === 0) {
        const data: any = res.data.data;
        const userInfo: object = {
          _id: data._id,
          name: data.name,
          avatar: data.avatar
        };
        StorageUtils.Session.set("userInfo", userInfo);
        // 保存到vuex中
        this.saveUser(userInfo);
        console.log("userInfo: %o", this.userInfo);
        // window.sessionStorage.userInfo = JSON.stringify(userInfo);
        // Message.success(res.data.message);
        this.$message({
          message: "res.data.message",
          type: "success"
        });
        return false;
      } else {
        // Message.error(res.data.message);
        this.$message({
          message: "res.data.message",
          type: "error"
        });
      }
    } else {
      // Message.error("网络错误");
      this.$message({
        message: "网络错误",
        type: "error"
      });
    }
  }
}
</script>