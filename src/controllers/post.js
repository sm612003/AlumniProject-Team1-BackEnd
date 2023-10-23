
import PostMessage from "../models/post.js";
import multer from "multer";
import  path  from "path";
import fs from "fs"

// const uploadDirectory = 'images'; // The directory specified in multer configuration

// // Check if the directory exists
// if (!fs.existsSync(uploadDirectory)) {
//   // If it doesn't exist, create it
//   fs.mkdirSync(uploadDirectory);
// }

const storage = multer.diskStorage({
  destination:(req, file, cb)=>{
    cb(null, 'images');
  },
  filename:(req, file, cb)=>{
    cb(null, 'image-' + Date.now() +path.extname( file.originalname))
  }
});

const upload= multer({storage:storage})

export const addPost= async (req, res)=>{
  upload.single('image')(req, res, async function(err){
    if(err){
      return res.status(400).json({error:err.message})
    }
  
  const {full_name, title, content,categoryID}= req.body;
  const image =req.file.path;

  
    try{
      const post = new PostMessage({full_name, title, content,image, categoryID})
        const newPost =await post.save()
        res.status(200).json(newPost)

    }catch(error){
        res.status(409).json({message:error.message})

    }
  })
}

export const deletePost= async (req, res) => {
  const { id } = req.params;

  try {
    await PostMessage.findByIdAndRemove(id);
    res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: 'Blog post not found or could not be deleted' });
  }

};


export const getAllPosts =async (req, res)=>{
    try{
      const posts =await PostMessage.find().sort({createdAt:-1})
      res.status(200).json(posts)
    }catch(error){
      res.status(404).json({message:error.message})
    }
};


export const getPostById= async (req, res)=>{
  const {id}= req.params;
  try {
    const post = await PostMessage.findById(id);
    if (post){
      res.status(200).json(post);
      
      } else {
        res.status(404).json({message:'Blog not found'});
      }
    }
   catch(error){
    res.status(500).json({ message: 'Internal server error' });
  }
};

// export const findByCategory= async (req, res) => {
//   const { ID } = req.params;

//   try {
//     const posts = await PostMessage.find({ categoryID: ID });
//     if (posts.length > 0) {
//       res.status(200).json(posts);
//     } else {
//       res.status(404).json({ message: 'No blog posts found in the specified category' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };



