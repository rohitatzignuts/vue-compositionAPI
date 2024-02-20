import { defineStore } from 'pinia'
import { Post } from '../posts'
import { NavLink } from '../constants'
import { ITimeLineItem } from '../posts'
import { DateTime } from 'luxon'

interface PostState {
    ids : string[],
    all : Map<string,Post>,
    selectedLink : NavLink
}

function delay() {
    return new Promise<void>(res => setTimeout(res,1000))
}
export const usePosts = defineStore('posts',{
    state : () :PostState => ({
        ids : [],
        all : new Map(),
        selectedLink : 'Today'
    }),
    actions : {
        setSelectedLink(navLinks : NavLink){
            this.selectedLink = navLinks
        },
        async fetchPosts(){
            const res = await window.fetch('http://localhost:8000/posts')
            const posts = (await res.json()) as Post[]
            await delay()
            let ids : string[] = []
            let all = new Map<string,Post>()
            posts.forEach( post => {
                ids.push(post.id)
                all.set(post.id,post)
            })
            this.ids = ids
            this.all = all
        },
        createPost(post: ITimeLineItem){
            const body = JSON.stringify({ ...post,createdAt : post.createdAt.toISO() })
            return window.fetch('http://localhost:8000/posts' , {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error creating post:', error);
                throw error; // Rethrow the error to propagate it to the caller
            });
        }
        
    },
    getters : {
        fiteredPosts : (state) : ITimeLineItem[] => {
            return state.ids 
            .map(id => {
                const post = state.all.get(id)
                if(!post){
                    throw Error(`Post with ${id} not Found!`)
                }
                return {    
                ...post,
                createdAt : DateTime.fromISO(post.createdAt)
            }}).filter(post => {
                if(state.selectedLink === 'Today'){
                    return post.createdAt >= DateTime.now().minus({day:1})
                }
                if(state.selectedLink === 'This Week'){
                    return post.createdAt >= DateTime.now().minus({week:1})
                }
                return post 
            })
        }
    }
})              