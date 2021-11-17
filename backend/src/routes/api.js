import { Router } from 'express'
import mongoose from 'mongoose'
import { upload } from '../utils/storage.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import multer from 'multer'
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
  profilePics:{ type:String, default:" "},
  following: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    }
})
const commentSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  username: {type: String},
  text: {type: String},
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
  comments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'comment',
  },
  pics:{ type:String, default:" "},

  
})

const Post = mongoose.model('Post', postSchema)
const User = mongoose.model('User', userSchema)
const Comment = mongoose.model('Comment', commentSchema)

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

router.get('/Mydata', authentication,  async (req, res) => {
  const user = await User.findOne({_id : req.user})
  console.log("a")
  console.log(user)
  res.json(user)
})

router.get('/Myname', authentication,  async (req, res) => {
  const user = await User.findOne({_id : req.user})
  const username = user.username
  res.json(username)
})

router.get('/Mypics', authentication,  async (req, res) => {
  const user = await User.findOne({_id : req.user})
  console.log("a")
  console.log(user)
  res.json(user.profilePics)
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

router.post('/ChangePW', authentication, async (req, res) => {
  console.log(req.body)
  const oldpassword = req.body.oldpassword
  const newpasswordone = req.body.newpasswordone
  console.log(oldpassword)
  console.log(newpasswordone)
  const id = req.user
  const user = await User.findOne({ id }).select('+password')
  console.log("a")
    const match = await bcrypt.compare( oldpassword, user.password)
    if(!match){
      console.log("b")
      res.json("Wrong password")
    } else {
      const hashed = await bcrypt.hash(newpasswordone, 10)
      await User.findByIdAndUpdate(id, {password : hashed })
      console.log("c")
      res.json("Changed")
    }
})

router.post('/uploadpic/:id', upload.single('pic'), async(req, res) => {
  console.log("eljut ide")  
  console.log(req.file.filename)
  const filepath = "/api/files/"+req.file.filename
  console.log(filepath)
  const id = req.params.id
  const user = await Post.findByIdAndUpdate(id, {pics:filepath})
  res.json("Succes")
})

router.post('/uploadprofilepic', authentication, upload.single('pic'), async(req, res) => {
  console.log("eljut ide")  
  console.log(req.file.filename)
  const filepath = "/api/files/"+req.file.filename
  console.log(filepath)
  const id = req.user
  const user = await User.findByIdAndUpdate(id, {profilePics:filepath})
  res.json(filepath)
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

router.get('/comments/:id', async(req,res)=>{
  const id = req.params.id
  const comm = await Comment.findOne({_id : id})
  console.log(comm)
  res.send(comm)
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
  console.log(req.user)
  const posts = await Post.find({ createdBy: req.user })
  res.json(posts)
})


router.get('/userposts/:id', authentication,  async (req, res) => {
  const id = req.params.id
  const posts = await Post.find({ createdBy: id })
  res.json(posts)
})


router.post('/posts', authentication, upload.single('pic') , async (req, res) => {
  const { title, content, topic } = req.body
  const post = await Post.create({ title, content, topic, createdBy: req.user})
  res.json(post)
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

router.post('/postcomment/:id', authentication , async(req,res) =>{
  const user = await User.findOne({_id: req.user })
  const id = req.params.id
  const comment = req.body.comment
  console.log(comment)
  console.log(user)
  const postedcomment = await Comment.create({createdBy: req.user, username: user.username, text: comment})
  console.log(postedcomment)
  const updated = await Post.findByIdAndUpdate(id, { $push:{ comments:postedcomment}})
  console.log(updated)
  res.json("Success")
})


router.get('/username/:id', authentication , async(req,res) =>{
  const id = req.params.id
  const user = await User.findOne({_id : id})
  console.log("aysdasdsad")
  console.log(user.username)
  res.json(user.username)
})

router.put('/follow/:id',authentication , async(req,res) =>{
  const id = req.params.id
  console.log("user:")
  console.log(req.user)
  const user = await User.findByIdAndUpdate(req.user, { $push:{ following: id}})
  res.json("Followed")
})

router.put('/unfollow/:id',authentication , async(req,res) =>{
  const id = req.params.id
  console.log("user:")
  console.log(req.user)
  const user = await User.findByIdAndUpdate(req.user, { $pull:{ following: id}})
  res.json("Followed")
})

router.get('/Myfeed', authentication, async(req,res)=>{
  const user = await User.findOne({_id : req.user})
  console.log(user)
  console.log(user.following)
  const posts = await Post.find({createdBy : user.following}).sort({_id:-1});
  console.log(posts)
  res.send(posts)
})



export default router
