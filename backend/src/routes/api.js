import { Router } from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const router = Router()

const TOKEN_SECRET = 'Token secret szoveg'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    index: true,
    required: true,
    trim: true,
  },
  password: { type: String, select: false, required: true, },
  email: {type: String, required: true, select: false},
  registeredAt: { type: Date, default: Date.now, select: false },
})

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true, },
  content: { type: String },
  topic: {type:String, required: true,},
  read: {type: Number, default :0 },
  createdAt: { type: Date, default: Date.now },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
})

const Post = mongoose.model('Post', postSchema)
const User = mongoose.model('User', userSchema)

const authentication = async (req, res, next) => {
  const token = req.headers?.authorization?.replace('Bearer ', '')
  console.log(token)
  try {
    const { userId } = await jwt.verify(token, TOKEN_SECRET)
    req.user = userId
    next()
  } catch (error) {
    res.json("Log in first")
  }
}

router.get('/Usercheck', authentication,  async (req, res) => {
  const user = await User.findOne({_id : req.user})
  console.log(user)
  res.json("OK")
})

router.post('/registration', async (req, res) => {
  const { username, password, email } = req.body
  if(password.length<8 || password.length>16){
    res.json('Password is not ok')
  }
  if(!email.includes('@') || (!email.endsWith('.com') && !email.endsWith('.hu'))){
    res.json('Email is not ok')
  }
  const user = await User.findOne({ username })
  const emailcheck = await User.findOne({ email })
  if (user ) {
    res.json('Username already used')
  } 
  if (emailcheck)  {
    res.json('Email already used')
  }  else {
    const hashed = await bcrypt.hash(password, 10)
    await User.create({ username, password: hashed, email })
    res.json('Registration completed successfully')
  }
})
router.post('/login', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username }).select('+password')
  if (!user) {
    res.json('Wrong username')
  } else {
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      res.json('Wrong password')
    } else {
      const token = await jwt.sign({ userId: user.id }, TOKEN_SECRET, {
      })
      res.json({ token })
    }
  }
})
router.get('/users/:username', async(req,res)=>{
  const username = req.params.username
  const user = await User.findOne({username : username})
  console.log(user)
  if(user === null){
    console.log("no suer")
    res.send("No user found")
  } else {
    res.send(user)
  }
})

router.get('/posts',  async (req,res) => {
  const posts = await Post.find().sort({_id:-1});
  res.json(posts)
})

router.get('/topicposts/:topic', async(req,res)=>{
  const topic = req.params.topic
  const post = await Post.find({topic : topic}).sort({_id:-1});
  console.log(post)
  res.send(post)
})

router.get('/posts/:id', async(req,res)=>{
  const id = req.params.id
  const post = await Post.findOne({_id : id})
  console.log(post)
  res.send(post)
})


router.get('/checkposts/:title', authentication , async(req,res)=>{
  const title = req.params.title
  const post = await Post.findOne({title : title})
  if(!post){
    res.json("no such post")
  } else{
    if(JSON.stringify(req.user)===JSON.stringify(post.createdBy)){
      console.log("ok")
      res.send("OK")
    } else {
      console.log("not ok")
      res.send("Not your post")
    }
  }
})

router.put('/posts/:id', async (req, res) => {
  const body = req.body
  const id = req.params.id
  await Post.findByIdAndUpdate(id, body)
  res.json("Succes")
})

router.get('/searchposts/:title', async(req,res)=>{
  const title = req.params.title
  const post = await Post.findOne({title : title})
  if(!post){
    res.json("no such post")
  } else{
    console.log(post)
    res.send(post)
  }
})

router.delete('/posts/:id', async (req,res) =>{
  const id = req.params.id
  await Post.findByIdAndDelete(id)
  res.json("delted")
}) 

router.get('/myposts', authentication,  async (req, res) => {
  const posts = await Post.find({ createdBy: req.user })
  res.json(posts)
})

router.get('/userposts/:id', authentication,  async (req, res) => {
  const id = req.params.id
  const posts = await Post.find({ createdBy: id })
  res.json(posts)
})


router.post('/posts', authentication , async (req, res) => {
  const { title, content, topic } = req.body
  await Post.create({ title, content, topic, createdBy: req.user })
  res.json("Succes")
})

router.put('/postsread/:id', async(req,res) =>{
  const id = req.params.id
  const data = await Post.findOne({_id : id})
  console.log( data.readed)
  const updatedread = data.read +1
  const updated = await Post.findByIdAndUpdate(id, {read : updatedread})
  console.log(updated)
  res.json(updated)
})

router.get('/Userid', authentication,  async (req, res) => {
  const user = await User.findOne({_id : req.user})
  console.log(user)
  res.json(user)
}) 


export default router
