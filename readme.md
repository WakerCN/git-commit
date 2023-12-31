[TOC]

# 效果

![效果图](./assets/git-commit.gif)

# 安装

可以使用 node 全局安装

```
npm install -g @star-one/git-commit
```

如果不想全局安装也可以在项目目录下安装

```
npm install -D @star-one/git-commit
```

# 使用

> **前置条件：需要手动暂存想要提交的文件**

如果全局安装使用命令`gec`进入 git commit 流程

如果是项目目录下安装使用命令`npx gec`进入 git commit 流程

# 设计

- 📃 <a href="https://www.yuque.com/star-one/font-end/yynvzwpwtl642i3v?singleDoc" target="_blank">设计文档</a>

# Bug

如果遇到 bug 请在 git 仓库提 issue

仓库 issue 地址：https://github.com/WakerCN/git-commit/issues

# TODO 待开发新功能

- [ ] git 仓库 判断
- [ ] 更详细的 git 信息显示（颜色，文件信息）
- [ ] type 支持模糊搜索
- [ ] 低版本 windows emoji 乱码
- [ ] tag 功能支持
- [ ] push 功能支持
