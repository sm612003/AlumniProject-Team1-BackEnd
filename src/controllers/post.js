import  express from "express";
import PostMessage from "../models/post.js";

const router=express.Router();

router.post('/', async (req, res)=>{
    const post = new PostMessage(req.body)
    try{
        const newPost =await post.save()
        res.status(201).json(newPost)

    }catch(error){
        res.status(409).json({message:error.message})

    }
})

router.get('/',async (req, res)=>{
    try{
      const posts =await PostMessage.find()
      res.status(200).json(posts)
    }catch(error){
      res.status(404).json({message:error.message})
    }
})

export default router