const express = require("express");
const router = express.Router();
const Post = require("../schemas/post");



//post to write
router.post("/posts", async (req,res) =>{
    const {user, password, title, content} = req.body;
    let createdAt = new Date();
    try{
        await Post.create({user, password, title, content, createdAt});
        return res.status(200).json({
            message: "게시글을 생성하였습니다."
        });
    }
    catch (error){
        return res.status(400).json({
            message: '데이터 형식이 올바르지 않습니다.' 
        })
    }
});



//Look up posts
router.get("/posts", async (req, res) =>{
    const posts = await Post.find({}).select({postId:1, user:1, title:1, createdAt:1});
    return res.status(200).json({data:posts});
});

//Look up posts details
router.get("/posts/:_postId", async (req,res) =>{
    try{
        const {_postId} = req.params;
        const post = await Post.find({_id:_postId});

        return res.status(200).json({data:post});
    }
    catch (error){
        return res.status(400).json({
            message: '데이터 형식이 올바르지 않습니다.'
        })
    }
});




//adapt posts
router.put("/posts/:_postId", async (req,res) =>{
    
    try{
        const {_postId} = req.params;
        const {password, title, content} =req.body;
        const checkedId = await Post.find({_id: _postId});
        
        if(!checkedId.length){
            return res.status(404).json({
                message: '게시글 조회에 실패 하였습니다.'
            })
        }else {
            await Post.updateOne(
                {password: password, _id:_postId},
                {$set: {title: title, content: content}}
            )
            return res.status(200).json({
                message: "게시글을 수정하였습니다."
            })
        }
    } 
    catch (error) {
        return res.status(400).json({
            message: '데이터 형식이 올바르지 않습니다.'
        })
    }
});



//delete posts

router.delete("/posts/:_postId", async (req,res)=> {
    
    try{
        const { _postId } = req.params;
        const { password } = req.body;
        const checkedId = await Post.findOne({ _id : _postId })
        
        if (checkedId.password!==password){
            return res.status(404).json({
                Message : "게시글 조회에 실패하였습니다."
            });
        }
        else if(checkedId.password === password){
            await Post.deleteOne({_id: _postId})
            return res.status(200).json({
                message: "게시글을 삭제하였습니다."
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: '데이터 형식이 올바르지 않습니다.'
        })
    }
});

module.exports = router;