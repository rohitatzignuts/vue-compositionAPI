<script setup lang="ts">
import { DateTime } from 'luxon';
import PostWriter from '../components/PostWriter.vue';
import { ITimeLineItem } from '../posts';

const post : ITimeLineItem = {
    id : '-1',
    title : 'max',
    createdAt : DateTime.now(),
    markDown : '## Title',
    htmlValue : '<h2>Title</h2>'
}
</script>
<template>
    <hr>
    <h3 class="title is-3">New Post</h3>
    <PostWriter :post="post"/>
</template>