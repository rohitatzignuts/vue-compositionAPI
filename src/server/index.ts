import express, { Request , Response} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jsonwebtoken  from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import {today,thisWeek,thisMonth, Post} from '../posts.ts'
import { v4 as uuidv4 } from 'uuid';
import { User } from '../user.ts';

const SECRET = 'my-secret'
const COOKIE = 'vue-js-jwt'
const allUsers: User[] = []
const allPosts = [today,thisWeek,thisMonth]
const app = express()
app.use(cookieParser())
app.use(cors())
app.use(bodyParser.json())

app.get('/posts',(_req,res)=>{
    res.json(allPosts)
})
app.get('/users',(_req,res)=>{
    res.json(allUsers)
})
//get all users
app.get('/current-user', (req,res) => {
    try{
        const token = req.cookies[COOKIE]
        const result = jsonwebtoken.verify(token,SECRET) as {id :string}
        console.log(result)
        res.json({id : result.id})
        
    }catch(err){
        res.status(404).end()
    }
})
//create user
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
//logout user
app.post('/logout',(req,res)=>{
    res.cookie(COOKIE,'',{httpOnly:true})
    res.status(200).end()
})
//authenticate user
function authenticate ( id : string , req : Request , res : Response){
    //sign jsonwebtoken
    const token = jsonwebtoken.sign({id},SECRET,{
        issuer : 'vue-zignuts',
        expiresIn : '30 days'    
    })
    res.cookie(COOKIE,token,{httpOnly:true})
}
app.post('/users',(req,res)=>{
    const user : User = {...req.body , id : uuidv4()}
    authenticate(user.id , req,res)
    allUsers.push(user);
    const {password  , ...rest} = user
    res.json(rest);
});
app.listen(3000,()=>{
    console.log('server is live on PORT 3000');
})
