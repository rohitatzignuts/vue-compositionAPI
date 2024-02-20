import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {today,thisWeek,thisMonth, Post} from '../posts.ts'
import { v4 as uuidv4 } from 'uuid';
const allPosts = [today,thisWeek,thisMonth]
const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get('/posts',(_req,res)=>{
    res.json(allPosts)
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

app.listen(3000,()=>{
    console.log('server is live on PORT 8000');
})
