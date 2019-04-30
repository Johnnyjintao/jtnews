# jtnews 头条号

![image](https://img.shields.io/badge/vue-2.5.2-blue.svg)
![image](https://img.shields.io/badge/vue--router-3.0.1-blue.svg)
![image](https://img.shields.io/badge/vuex-3.0.1-blue.svg)
![image](https://img.shields.io/badge/element--ui-1.4.7-blue.svg)

#### 正在完善，敬请期待（50%）！
> 你的 "Star" 是我最大的动力！🌹

## 简介

jtnews 是一个仿头条号的后台管理项目，它使用vue-cli快速搭建，涉及登录、管理文章等功能。

## 说明
> 如果此开源系列对你有帮助，你可以点右上角 "star"一下，以表支持，非常感谢！^_^ 🌹

> 或者您可以 "follow（关注）" 一下作者，我正在不断开源更多实用的项目

> 如有问题可以直接在 Issues 中提，或者加入我们下方Vue群更进一步地交流

## 后端node.js
#### [请戳这里](https://github.com/Johnnyjintao/jtnews-server)


## 功能
- [x] 全屏banner以及css3/svg动画
- [x] 登录/注销
- [x] 多级菜单
- [x] 自定义图片上传、草稿等
- [x] 管理文章（预览、编辑、撤回、删除等操作）
- [x] ...

## 部分截图
<img src="https://johnnyjintao.github.io/resume/static/wxjt_20190228123850.png" width="900px" style="max-width: 100%;"/>
<img src="https://johnnyjintao.github.io/resume/static/wxjt_20190228124011.png" width="900px" style="max-width: 100%;"/>

## 目录结构

```html
├── build
├── config
├── docs                                        	// 打包后的目录
├── screenshots                                 	// README.md资源文件夹
├── src
│   ├── assets                                    	// 资源
│   ├── components                                	// 组件
│   ├── layout                                    	// 布局
│   ├── pages
│   │   ├── api                                 	// 请求api
│   │   ├── indexpage                             // 首页
│   │   ├── user                                  // 用户登录，注册相关
│   │   ├── aboutme                               // 关于我
│   │   ├── article                               // 文章列表
│   │   ├── classify                               // 分类列表
│   │   ├── edit                              // 文章编辑
│   │   └── home                             	    // 父路由
│   ├── router                                  	// 路由管理
│   ├── store                                   	// 全局状态
│   └── utils                                  	    // 工具
├── static
└── theme-chalk                         			// 自定义颜色主题
```

## 安装运行

```
# install dependencies
npm install

# serve with hot reload at localhost:8010
npm start

# build for production with minification
npm run build（File in the docs folder）
```

