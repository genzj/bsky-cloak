# Bsky Cloak

为了保持点赞中立写了这个油猴脚本，将蓝天的用户名和头像替换为随机生成的，同时隐藏了用户ID，这样就能排除对用户印象或亲疏关系的干扰，仅根据内容进行点赞、转发和评论 😃

## 安装

* 先安装篡改猴插件：<https://www.tampermonkey.net/index.php?locale=zh>
* 再点击这个直达链接：<https://github.com/genzj/bsky-cloak/releases/latest/download/bsky-cloak.user.js>

## 效果预览

<img src="screenshots/preview-1.png" alt="preview" style="width:400px;"/>

## 功能

* [x] 随机化头像
* [x] 随机化用户名
* [x] 隐藏时间线和悬浮名片中的用户ID
* [x] bun和TS化 （via <https://github.com/genzj/bun-ts-userscript-starter）>
* [x] 设置头像风格 [可选风格](https://www.dicebear.com/styles/)
* [x] 持续化随机用户名和头像
* [ ] 暂停屏蔽

## 常见问题

### 安装启用后用户名和头像依旧

成因尚在研究，似乎是性能因素。目前的解决方案是在蓝天页面任意位置点右键，选择“inspect”/“审查元素”，然后保持审查元素面板打开的情况下刷新页面。之后即便不开审查元素面板也能保持正常（一段时间）。
