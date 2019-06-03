/*
 * @Description: TypeScript 默认并不支持 *.vue 后缀的文件,这个文件就是为了解决这个问题
 * @Author: james.zhang 
 * @Date: 2019-05-29 22:00:17 
 * @Last Modified by: james.zhang
 * @Last Modified time: 2019-05-29 22:21:43
 */


import Vue from "vue";
import VueRouter, { Route } from "vue-router";

// 意思是告诉 TypeScript *.vue 后缀的文件可以交给 vue 模块来处理。
declare module "*.vue" {
  export default Vue;
}

// 声明全局方法,挂载到this对象上
declare module "vue/types/vue" {
  interface Vue {
    $router: VueRouter; // 这表示this下有这个东西
    $route: Route;
    $https: any;
    $urls: any;
    // 之后再使用this.$message()的话就不会报错了
    $Message: any;
    $Modal: any;
  }
}
