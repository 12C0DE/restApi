const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');


//Get ALL posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find(); //empty params will return all results
        res.json(posts);
    } catch(err) {
        res.json({message: err})
    }
});

// router.get('/specific', (req, res) => {
//     res.send('specific POST');
// });

//Get SPECIFIC post
router.get('/:postID', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postID);
        res.json(post);
    } catch (err) {
        res.json(err);
    }
})


//SUBMITS a post
router.post('/', async (req, res) => {
    //create a post
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try {
        const savedPost = await post.save();
        res.json(savedPost);
    }catch(err){res.json(err)};
    
    //send post without ASYNC & AWAIT
    // post.save().then(data => {
    //     res.json(data);
    // }).catch(err => {res.json(err)}); //this will post 
})

//UPDATE a post
router.patch('/:postID', async (req, res) => {
    try {
        const updatePost = await Post.updateOne({_id: req.params.postID}, { $set: {title: req.body.title}});
        res.json(updatePost);
    } catch(err) {
        res.json(err);
    }
})

//DELETE a post
router.delete('/:postID', async (req, res) => {
    try {
        const removedPost = await Post.remove({_id: req.params.postID});
        res.json(removedPost);
    } catch(err) {
        res.json(err);
    }
})

module.exports = router;