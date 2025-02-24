# Digital-Intelligence-Psychological-System

## 数智心理测试平台

本项目是在‘教育数智化’政策背景下产生的对于数智心理测评平台的需求，提供了学生心理测评和教师端查看可视化测评报告的功能。前端基于Vue3 + TS +ECharts + ArcoDesign 实现

### 平台测试地址：http://psychology-test.xdj666.top
因名单数据涉及真实学校隐私，不提供测试账号，仅展示部分页面

### 前端页面展示

* 登录页

  ![image-20250224111619922](https://typora-1321658731.cos.ap-guangzhou.myqcloud.com/images/202502241116782.webp)

* 教师端首页（查看测评列表以及上线测评）

  ![image-20250224112109166](https://typora-1321658731.cos.ap-guangzhou.myqcloud.com/images/202502241121860.webp)
  
* 学生进行心理测评页

  ![image-20250224112322397](https://typora-1321658731.cos.ap-guangzhou.myqcloud.com/images/202502241123386.webp)

* 文字报告页

  ![image-20250224111814182](https://typora-1321658731.cos.ap-guangzhou.myqcloud.com/images/202502241118612.webp)

* 可视化报告页（共计十种可视化报告，此处只展示其中一种）

  ![](https://typora-1321658731.cos.ap-guangzhou.myqcloud.com/images/202502241119306.webp)

### 前端开发技术亮点

1. 可视化图表部分：
   * 动态屏幕适配：通过useDraw自定义Hook实现，动态计算窗口宽高比+防抖监听，实现了可视化图表的自适应缩放，确保在不同分辨率设备上都能保持良好的显示效果
   * 合理拆分10+个可视化图表组件，通过props传递尺寸、图表数据、标题等数据，通过dataset实现数据与图表解耦，支持数据动态更新，实现高度复用性和可维护性
2. 权限控制：
   * 支持学生/教师/心理老师三段权限动态渲染
   * 通过ACCESS_ENUM角色枚举来管理用户角色，封装全局路由守卫，结合meta路由元信息&Pinia中存储的用户权限，统一处理权限校验，并使用 pnia-plugin-persistedstate 工具实现持久化状态管理
3. 性能优化
   * 代码分割+路由懒加载，实现首屏加载速度提升40%，总阻塞时间及首屏展现平均值分别提升60%
   * 使用 splitChunks 将 node_modules 和公共模块拆分为独立文件，减少首屏加载体积。
   * 使用image-webpack-loader压缩图片
   * 通过contenthash生成文件名，利用浏览器缓存实现长效缓存，页面加载速度提升
4. 导出测评报告PDF
   * 基于html2canvas和jsPDF的前端工具，实现将可滚动的网页报告内容完整导出为PDF的功能，导出流程：HTML页面->转成图片->转换PDF
   * 支持自定义文件名并自动触发文件下载，提升用户操作体验
   * 通过分页渲染逻辑及配置scale参数，确保内容清晰度及布局准确度，优化渲染逻辑
   * 处理了跨域图片和复杂CSS样式的兼容性问题

## Project setup

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
