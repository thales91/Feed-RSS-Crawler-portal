import Vue from 'vue'
import VueRouter from 'vue-router'

import Twitter from '@/components/plataformas/Twitter.vue'
import Feeds from '@/components/feeds/ListaFeeds.vue'
import Feed from '@/components/feeds/Feed.vue'
import Posts from '@/components/posts/ListaPosts.vue'
import Post from '@/components/posts/Posts.vue'
import Dashboard from '@/components/dashboard/Index.vue'

Vue.use(VueRouter)

const routes = [{
    name: 'twitter',
    path: '/plataforma/twitter',
    component: Twitter
},
{
    name: 'feeds',
    path: '/feeds',
    component: Feeds
},
{
    name: 'feedById',
    path: '/feed/:id',
    component: Feed
},
{
    name: 'post',
    path: '/post',
    component: Post
},
{
    name: 'posts',
    path: '/posts',
    component: Posts
},
{
    name: 'postById',
    path: '/post/:id',
    component: Post
},
{
    name: 'feed',
    path: '/feed',
    component: Feed
},
{
    name: 'dashboard',
    path:  '/',
    component:Dashboard
}]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router