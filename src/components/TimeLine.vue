<script setup lang="ts">

import TimeLineItem from './TimeLineItem.vue';
import {usePosts} from '../stores/posts'
import {navLinks} from '../constants'

const postStore = usePosts()
await postStore.fetchPosts()
</script>

<template>
    <nav class="panel is-primary">
        <span class="panel-tabs">
            <a 
            v-for="navLink in navLinks"
            :key="navLink"
            :class="{'is-active' : navLink == postStore.selectedLink}"
            @click="postStore.setSelectedLink(navLink)"
            >{{ navLink }}</a>
        </span>
        <TimeLineItem 
            v-for="post in postStore.fiteredPosts"
            :key="post.id"
            class="panel-block"
            :post="post"
        />
    </nav>
</template>