import Vue from 'vue'
import VueRouter from "vue-router";
// import Discovery from './components/Discovery'
// import Video from './components/Video'
// import Mine from './components/Mine'
// import Friends from './components/Friends'
// import Account from './components/Account'

//实现路由懒加载
const Discovery = () => import('./components/discoveryComponents/Discovery');
const RecommendedDaily = () => import('./components/discoveryComponents/functionBarComponents/RecommendedDaily');
const SongList = () => import('./components/discoveryComponents/functionBarComponents/SongList');
const Recommend = () => import('./components/discoveryComponents/functionBarComponents/songListComponents/Recommend');
const Boutique = () => import('./components/discoveryComponents/functionBarComponents/songListComponents/Boutique');
const AllSongList = () => import('./components/discoveryComponents/functionBarComponents/songListComponents/AllSongList');
const SongListItem = () => import('./components/discoveryComponents/functionBarComponents/songListComponents/SongListItem');
const Leaderboard = () => import('./components/discoveryComponents/functionBarComponents/Leaderboard');
const Radio = () => import('./components/discoveryComponents/functionBarComponents/Radio');
const LiveBroadcast = () => import('./components/discoveryComponents/functionBarComponents/LiveBroadcast');
const Video = () => import('./components/videoComponents/Video');
const Mine = () => import('./components/mineComponents/Mine');
const Friends = () => import('./components/friendsComponents/Friends');
const Account = () => import('./components/accountComponents/Account');
const Login = () => import('./components/accountComponents/Login');
const UserDetails = () => import('./components/accountComponents/UserDetails');
const Music = () => import('./components/accountComponents/userDetailsComponents/Music');
const Active = () => import('./components/accountComponents/userDetailsComponents/Active');
const AboutMe = () => import('./components/accountComponents/userDetailsComponents/AboutMe');
const Song = () => import('./components/Song');

const routes = [
  {path: '/', redirect: '/discovery'}, //重定向到'/discoveryComponents'
  {path: '/discovery', name: "discovery", component: Discovery},
  {path: '/video', name: "video", component: Video},
  {path: '/mine', name: "mine", component: Mine},
  {path: '/friends', name: "friends", component: Friends},
  {path: '/account', name: "account", component: Account},
  {path: '/login', name: "login", component: Login},
  {
    path: '/userDetails/:id',
    name: "userDetails",
    component: UserDetails,
    children: [{
      path: '/',
      redirect: 'music'
    }, {
      path: 'music',
      component: Music
    }, {
      path: 'active',
      component: Active
    }, {
      path: 'aboutme',
      component: AboutMe
    }]
  },
  {path: '/recommendedDaily', name: "recommendedDaily", component: RecommendedDaily},
  {path: '/songList',
    name: "songList",
    component: SongList,
    children: [{
      path: '/',
      redirect: 'recommend'
    }, {
      path: 'recommend',
      component: Recommend
    }, {
      path: 'boutique',
      component: Boutique
    }]},
  {path: '/allSongList', name: "allSongList", component: AllSongList},
  {path: '/songListItem/:type', name: "songListItem", component: SongListItem, props: true},
  {path: '/leaderboard', name: "leaderboard", component: Leaderboard},
  {path: '/radio', name: "radio", component: Radio},
  {path: '/liveBroadcast', name: "liveBroadcast", component: LiveBroadcast},
  {path: '/song', name: "song", component: Song},
  {path: "*", redirect: "/"}
];

Vue.use(VueRouter);

export default new VueRouter({
  routes // (缩写) 相当于 routes: routes
});
