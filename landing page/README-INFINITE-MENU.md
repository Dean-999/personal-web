# 3D Infinite Menu 使用说明

## 🎉 功能简介

您的 Landing Page 现在已经集成了一个超酷的 3D 无限菜单效果！用户可以：
- 🖱️ **拖拽旋转** - 鼠标拖动可以旋转整个3D球体
- 🎯 **自动对齐** - 松开鼠标后会自动对齐到最近的卡片
- 🎨 **精美渐变** - 每个卡片都有独特的渐变背景色
- 🔗 **点击跳转** - 点击底部按钮可以跳转到对应页面

## 📦 已实现的功能

### 4个卡片配置

1. **Personal** - 紫色渐变 (#667eea → #764ba2)
   - 描述：个人兴趣、爱好、音乐、电影等
   - 链接：../personal page/index.html

2. **Academic** - 粉色渐变 (#f093fb → #f5576c)
   - 描述：学术背景、成就、课程等
   - 链接：../academic page/index.html

3. **Sports** - 蓝色渐变 (#4facfe → #00f2fe)
   - 描述：体育经历、游泳比赛、团队领导等
   - 链接：../sport page/index.html

4. **Activities** - 绿色渐变 (#43e97b → #38f9d7)
   - 描述：课外活动、创意项目、机器人设计等
   - 链接：../Extracurricular Activities page/index.html

## 🎮 交互效果

### 鼠标交互
- **拖拽旋转**：按住鼠标左键并移动，可以旋转3D球体
- **自动吸附**：松开鼠标后，会自动旋转到最近的卡片
- **平滑动画**：所有旋转都有流畅的缓动效果

### 视觉反馈
- **标题显示**：当停止移动时，会显示当前卡片的标题
- **描述文字**：显示卡片的详细描述
- **跳转按钮**：显示一个箭头按钮，点击可跳转到对应页面

## 🎨 自定义卡片图片（可选）

如果您想使用自定义图片而不是渐变背景，可以这样做：

1. 将图片放在 `landing page/image/` 目录下
2. 在 `index.html` 中修改 `menuItems` 数组：

```javascript
const menuItems = [
    {
        title: 'Personal',
        description: '...',
        link: '../personal page/index.html',
        image: 'image/personal-card.jpg'  // 添加这一行
    },
    // ... 其他卡片
];
```

### 推荐图片规格
- **尺寸**：512x512 像素或更大（正方形）
- **格式**：JPG、PNG、WebP
- **内容**：清晰、有代表性的图片

## 🔧 技术实现

### 使用的技术
- **WebGL 2.0** - 硬件加速的3D渲染
- **gl-matrix** - 高性能的矩阵运算库
- **Icosahedron Geometry** - 20面体几何形状作为基础
- **Texture Atlas** - 将多个图片合并到一个纹理中

### 文件结构
```
landing page/
├── index.html              # 主HTML文件，包含初始化代码
├── infinite-menu.js        # 3D菜单的核心JavaScript代码
└── image/                  # 图片资源目录（可选）
```

## 🎯 浏览器兼容性

✅ **支持的浏览器**：
- Chrome 56+
- Firefox 51+
- Safari 15+
- Edge 79+

⚠️ **不支持的浏览器**：
- Internet Explorer（不支持WebGL 2.0）
- 旧版本移动浏览器

## 📱 响应式设计

菜单已经针对不同屏幕尺寸进行了优化：

- **大屏幕（>1500px）**：显示标题、描述和按钮
- **中屏幕（768px-1500px）**：只显示按钮
- **小屏幕（<768px）**：只显示按钮，按钮尺寸缩小

## 🚀 性能优化

- ✅ 使用 WebGL 硬件加速
- ✅ 纹理图集减少绘制调用
- ✅ 平滑的60fps动画
- ✅ 自适应像素比（最高2x）
- ✅ 优化的着色器代码

## 🐛 故障排除

### 如果看不到3D菜单
1. 检查浏览器是否支持 WebGL 2.0
   - 访问：https://get.webgl.org/webgl2/
2. 检查浏览器控制台是否有错误信息
3. 确保 `infinite-menu.js` 文件已正确加载

### 如果卡片显示不正确
1. 检查图片路径是否正确
2. 确保图片格式为 JPG、PNG 或 WebP
3. 检查浏览器控制台的网络请求

## 🎓 学习资源

想深入了解这个效果的实现原理？

- [WebGL 2.0 教程](https://webgl2fundamentals.org/)
- [gl-matrix 文档](https://glmatrix.net/)
- [四元数旋转原理](https://en.wikipedia.org/wiki/Quaternion)

## 🙏 致谢

这个效果的灵感来源于 [ReactBits.dev](https://reactbits.dev/components/infinite-menu) 的 Infinite Menu 组件。

---

**享受您的新3D菜单吧！** 🎉

如果有任何问题或需要进一步的自定义，请随时联系我。

