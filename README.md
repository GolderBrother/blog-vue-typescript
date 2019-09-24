
## 前言 

TypeScript 具有类型系统，且是 JavaScript 的超集，TypeScript 在 2018年 势头迅猛，可谓遍地开花。

Vue3.0 将使用 TS 重写，重写后的 Vue3.0 将更好的支持 TS。2019 年 TypeScript 将会更加普及，能够熟练掌握 TS，并使用 TS 开发过项目，将更加成为前端开发者的优势。

此项目是基于 Vue GolderBrother + TypeScript + Element-UI  的技术栈，且已经开源，github 地址 [blog-vue-typescript](https://github.com/GolderBrother/blog-vue-typescript) 。


## 效果

效果图：

- pc 端

[](https://upload-images.jianshu.io/upload_images/12890819-9f5f1b384a27c6ff.gif?imageMogr2/auto-orient/strip)


- 移动端

[](https://upload-images.jianshu.io/upload_images/12890819-5370ed6dfbe61051.gif?imageMogr2/auto-orient/strip)




## 功能

### 已经完成功能

- [x] 登录  
- [x] 注册  
- [x] 文章列表
- [x] 文章归档
- [x] 标签  
- [x] 关于  
- [x] 点赞与评论
- [x] 留言
- [x] 历程
- [x] 文章详情（支持代码语法高亮）
- [x] 文章详情目录
- [x] 移动端适配
- [x] github 授权登录

### 待优化或者实现

- [ ] 使用 vuex-class
- [ ] 更多 TypeScript 的优化技巧
- [ ] 服务端渲染 SSR

## 前端主要技术 

所有技术都是当前最新的。

- vue： ^2.6.6
- typescript : ^3.2.1
- element-ui： 2.6.3
- vue-router : ^3.0.1
- webpack： 4.28.4
- vuex: ^3.0.1
- axios：0.18.0
- highlight.js： 9.15.6
- marked：0.6.1


## Build Setup 

``` 
 # clone
git clone https://github.com/GolderBrother/blog-vue-typescript.git
```

```
# cd
cd  blog-vue-typescript
```

```
# install dependencies
npm install
```

```
# Compiles and hot-reloads for development
npm run serve
```

```
# Compiles and minifies for production
npm run build
```


- Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

如果要看有后台数据完整的效果，是要和后台项目  **[blog-node](https://github.com/GolderBrother/blog-node-eggjs)** 一起运行才行的，不然接口请求会失败。

## 项目地址与文档教程

**项目地址：**

> [vue 前台展示: https://github.com/GolderBrother/blog-vue-typescript](https://github.com/GolderBrother/blog-vue-typescript)

> [react 前台展示: https://github.com/GolderBrother/blog-react](https://github.com/GolderBrother/blog-react)

> [管理后台：https://github.com/GolderBrother/blog-react-admin](https://github.com/GolderBrother/blog-react-admin)

> [后端：https://github.com/GolderBrother/blog-node-eggjs](https://github.com/GolderBrother/blog-node-eggjs)


## 权衡

如何更好的利用 JS 的动态性和 TS 的静态特质，我们需要结合项目的实际情况来进行综合判断。一些建议：

*   如果是中小型项目，且生命周期不是很长，那就直接用 JS 吧，不要被 TS 束缚住了手脚。
*   如果是大型应用，且生命周期比较长，那建议试试 TS。
*   如果是框架、库之类的公共模块，那更建议用 TS 了。

**至于到底用不用TS，还是要看实际项目规模、项目生命周期、团队规模、团队成员情况等实际情况综合考虑。**

其实本项目也是小项目来的，其实并不太适合加入  TypeScript ，不过这个项目是个人的项目，是为了练手用的，所以就无伤大大雅。

目前看来 Vue 对 TyepeScript 的支持并不算完善，因为 2.x 版本的 Vue 即使写了 class-component，最终也会被编译成配置式的组件。许多 Vue 中方便的 API 以及 Vuex 的方法也只能通过装饰器实现，这导致了方法签名的丢失；通过 ref 属性获取到的子组件实例的类型也不正确，只是一个普通的 Vue 实例并不是定义的 class 类型(在组件内部通过 private public 定义的方法，父组件调用时是无法使用的，React 则实现了这个功能)；子组件需要的参数声明也不具有强制性，参考 React 组件参数传递是具有强约束力并且能静态检测，目前 Vue 仍然是在运行时抛出
不过好消息是，Vue 3.0 将采用 TypeScript 重构，全新的 Vue 不仅带来性能上的提升，还会进一步提升对类型的支持。未来，class-compoent 也将成为主流，现在写 TypeScript 以后进行 3.0 的迁移会更加方便。

## 最后
### 參考文章

- [参考链接1](https://segmentfault.com/a/1190000011744210)
- [参考链接2](https://segmentfault.com/a/1190000011878086)
- [demo](https://github.com/ws456999/vue-typescript-starter/tree/master/src)
