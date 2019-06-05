<template>
  <Dialog title="评论" width="60%" :visible="dialogVisible" @close="cancel">
    <Form>
      <FormItem>
        <Input type="textarea" v-model="content" placeholder="文明社会，理性评论" autocomplete="off"/>
      </FormItem>
    </Form>
    <div slot="footer" class="dialog-footer">
      <Button type="default" @click="cancel">取消</Button>
      <Button type="primary" @click="handleOk">确 定</Button>
    </div>
  </Dialog>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { Dialog, Form, FormItem, Input, Button, Message } from "element-ui";
import config from "@/utils/config";
import * as StorageUtils from "@/utils/storage";

// @Component 修饰符注明了此类为一个 Vue 组件
@Component({
  components: {
    Dialog,
    Form,
    FormItem,
    Input,
    Button
  }
})
export default class Comment extends Vue {
  @Prop({ default: false }) visible!: boolean;
  @Prop({ default: "" }) comment_id!: string;
  @Prop({ default: "" }) article_id!: string;
  @Prop({ default: {} }) to_user!: any;

  // initial data
  btnLoading: boolean = false;
  content: any = "";

  // lifecycle hook
  mounted() {
    console.log(StorageUtils.Session);
  }

  // computed
  get dialogVisible(): boolean {
    return this.visible;
  }

  // this.$emit
  @Emit()
  cancel(): void {}

  @Emit("handleOk")
  async handleOk(): Promise<any> {
    if (!this.article_id) {
      this.$message({
        message: "该文章不存在！",
        type: "error"
      });
      return;
    }
    if (!this.content) {
      this.$message({
        message: "评论内容不能为空",
        type: "error"
      });
      return;
    }
    let user_id = "";

    // window.sessionStorage.userInfo
    if (StorageUtils.Session.get("userInfo")) {
      // let userInfo = JSON.parse(StorageUtils.Session.get("userInfo"));
      let userInfo = StorageUtils.Session.get("userInfo");
      user_id = userInfo._id;
    } else {
      this.$message({
        message: "登录才能评论，请先登录！",
        type: "warning"
      });
      return;
    }
    this.btnLoading = true;
    const res: any = await this.$https.post(this.$urls.addThirdComment, {
      article_id: this.article_id,
      user_id,
      comment_id: this.comment_id,
      to_user: JSON.stringify(this.to_user),
      content: this.content
    });
    this.btnLoading = false;
    if (res.status === 200) {
      if (res.data.code === 0) {
        this.content = "";
        this.$message({
          message: res.data.message,
          type: "success"
        });
      } else {
        this.$message({
          message: res.data.message,
          type: "error"
        });
      }
    } else {
      this.$message({
        message: "网络错误!",
        type: "error"
      });
    }
  }
}
</script>