const express = require('express')
const router = express.Router()

const Post = require('../../models/Posts')

//Get all Posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        if (!posts) throw Error(`No Posts`);

        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
})

//get post by id
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) res.status(200).json({ data: null })

        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
})

// create post
router.post('/', async (req, res) => {
    const newPost = new Post(req.body)

    try {
        const post = await newPost.save()
        if (!post) throw Error(`Something went wrong`)

        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
})

//update Post with id
router.patch('/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body)
        if (!post) throw Error(`Update not done. Error`);
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
})

//delete Post with id
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        if (!post) throw Error(`No Post Found`)

        res.status(200).json({ success: true })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
})

module.exports = router