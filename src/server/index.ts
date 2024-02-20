import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {today,thisWeek,thisMonth, Post} from '../posts.ts'
import { v4 as uuidv4 } from 'uuid';
import { User } from '../user.ts';

const allUsers: User[] = []
const allPosts = [today,thisWeek,thisMonth]
const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get('/posts',(_req,res)=>{
    res.json(allPosts)
})
app.get('/users',(_req,res)=>{
    res.json(allUsers)
})

app.post('/posts',(req,res)=>{
    const { title, createdAt, markDown, htmlValue } = req.body;
    if (!title || !createdAt || !markDown ) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const post: Post = {
        id: uuidv4(),
        title,
        createdAt,
        markDown,
        htmlValue 
    };
    
    allPosts.push(post);
    res.json(post);
});

app.post('/users',(req,res)=>{
    const user : User = {...req.body , id : uuidv4()}
    allUsers.push(user);
    const {password  , ...rest} = user
    res.json(rest);
});
app.listen(3000,()=>{
    console.log('server is live on PORT 8000');
})
