# vue_netease-cloud-web-app

## 文件目录结构

```
.
├── App.vue 总组件，会挂载到index页面
├── assets 存放静态资源
│   ├── css 
│   │   ├── global.css 为页面设置全局样式
│   │   └── reset.css 重置默认样式
│   ├── data
│   │   └── cityCode.js 城市代码文件
│   ├── fonts
│   │   └── iconfonts.css iconfont字体文件
│   └── img
│       └── loading.jpg 图片进行懒加载时，在未加载到外部资源时的默认图片
├── components 下层文件夹通过 底部导航栏功能 分类
│   ├── Song.vue 歌曲详情
│   ├── accountComponents '账号'部分
│   │   ├── Account.vue '账号'部分总组件
│   │   ├── Login.vue 对应登陆页面
│   │   ├── UserDetails.vue 
│   │   └── userDetailsComponents
│   │       ├── AboutMe.vue
│   │       ├── Active.vue
│   │       └── Music.vue
│   ├── commonComponents 公用组件
│   │   ├── Audio.vue 音频
│   │   ├── BackHead.vue 返回icon
│   │   ├── BottomNavigationBar.vue 底部导航栏
│   │   ├── Head.vue 带标题带头部
│   │   ├── Playing.vue 播放icon
│   │   └── SearchBar.vue 搜索栏
│   ├── discoveryComponents '发现'部分的组件
│   │   ├── Banner.vue 轮播图
│   │   ├── Discovery.vue '发现'部分总组件
│   │   ├── FunctionBar.vue 
│   │   ├── RecommendedSongList.vue 
│   │   └── functionBarComponents 发现页的功能栏部分的组件
│   │       ├── Leaderboard.vue 排行榜
│   │       ├── LiveBroadcast.vue 直播 -- 未开发
│   │       ├── Radio.vue 电台 -- 未开发
│   │       ├── RecommendedDaily.vue 每日推荐
│   │       ├── SongList.vue 歌单
│   │       └── songListComponents
│   │           ├── AllSongList.vue
│   │           ├── Boutique.vue
│   │           ├── Recommend.vue
│   │           └── SongListItem.vue
│   ├── friendsComponents '朋友'部分的组件 -- 未开发
│   │   └── Friends.vue
│   ├── mineComponents '我的'部分的组件 -- 未开发
│   │   └── Mine.vue
│   └── videoComponents '视频'部分的组件 -- 未开发
│       └── Video.vue
├── fetch.js 
├── main.js 
├── router.js 路由
└── store 
    ├── index.js
    ├── playList.js
    └── song.js
```

## 资源

* 使用由[Binaryify](https://github.com/Binaryify)提供的[NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)
* 所有图标皆在[iconfont](https://www.iconfont.cn/?spm=a313x.7781069.1998910419.d4d0a486a)获取
* 在用户账户信息展示页面，城市的获取由`basecss`提供的[citydata](https://github.com/basecss/city/blob/master/lib/citydata.json
)取得
* 在实现音频播放时，参考了[Audio](https://xiaohuazheng.github.io/2017/04/18/audio-player/)
* 使用vuex时，选择了这篇文章[vuex](https://segmentfault.com/a/1190000009404727)



## 补充信息

### 堆叠值：z-index

`Playing` 900

`BottomNavigationBar` 100

`BackHead` 200

`Login` 1000

`SearchBar` 1000

`RecommendedDaily` 200



