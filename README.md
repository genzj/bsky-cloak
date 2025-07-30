# Bsky Cloak

为了保持点赞中立写了这个油猴脚本，将蓝天的用户名和头像替换为随机生成的，同时隐藏了用户ID，这样就能排除对用户印象或亲疏关系的干扰，仅根据内容进行点赞、转发和评论 😃

## 安装

* 先安装篡改猴插件：<https://www.tampermonkey.net/index.php?locale=zh>
* 再点击bsky-cloak.user.js文件的RAW按钮，或者这个直达链接：<https://gist.github.com/genzj/5ce3d035830591f360446bd3bbd7dc3e/raw/90d2156badfe721e0942f3c9ef746917211f07e5/bsky-cloak.user.js>

## 效果预览

<img src="https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:aecbl5ebnj55x7rmiecfxvh7/bafkreic3llrbf4uhl63ytnsrsyoyn5aupd4o3xggrgulnkx5f7emoeosci@jpeg" alt="preview" style="width:400px;"/>

## 功能

* [x] 随机化头像
* [x] 随机化用户名
* [x] 隐藏时间线和悬浮名片中的用户ID
* [x] bun和TS化 （via <https://github.com/genzj/bun-ts-userscript-starter）>
* [x] 设置头像风格 [可选风格](https://www.dicebear.com/styles/)
* [x] 持续化随机用户名和头像
* [ ] 暂停屏蔽
