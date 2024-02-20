<script setup lang="ts">
import { ITimeLineItem } from '../posts';
import { ref, watch, onMounted } from 'vue';
import {marked} from 'marked';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import {debounce} from 'lodash'
hljs.registerLanguage('javascript', javascript);
import { usePosts } from '../stores/posts';
import { useRouter } from 'vue-router';

const props = defineProps<{
    post: ITimeLineItem
}>()
const router = useRouter()
const posts = usePosts()
const postTitle = ref(props.post.title)
const htmlValue = ref('')
const content = ref(props.post.markDown)

function handleInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    content.value = target.value;
}

function parseHTML(markdown: string){
    htmlValue.value = marked(markdown, {
        gfm: true,
        breaks: true,
        highlight: (code) => {
            return hljs.highlightAuto(code).value
        }
    })
}
watch(content, debounce((newContent) => {
    parseHTML(newContent)
},250), { immediate: true });

    async function handleClick(){
    const newPost : ITimeLineItem = {
        ...props.post,
        title : postTitle.value,
        markDown : content.value,
        htmlValue : htmlValue.value
    }
    await posts.createPost(newPost)
    router.push('/')
}
onMounted(() => {
    content.value = props.post.markDown;
})
</script>

<template>
    <div class="columns">
        <div class="column">
            <div class="field">
                <div class="label">Post Title</div>
                <input type="text" class="input" v-model="postTitle">
            </div>
        </div>
    </div>
    <div class="columns">
        <div class="column">
            <textarea cols="80" rows="10" @input="handleInput" v-model="content"></textarea>
        </div>
        <div class="column" v-html="htmlValue" />
    </div>
    <div class="columns">
        <div class="column">
            <button class="is-primary button is-pulled-right" @click="handleClick">Save Post</button>
        </div>
    </div>  
</template>
