const express = require("express");
const router  = express.Router();
const Comment = require("../schemas/comment");



//comment writing
router.post("/comments/:_postId", async (req,res) =>{
    const {_postId} = req.params;
    const {user, password, content} = req.body;
    try{
        await Comment.create({user, _postId, password, content});
        return res.status(200).json({
            message: "댓글을 생성하였습니다."
        });
    }
    catch (error){
        return res.status(400).json({
            message: '데이터 형식이 올바르지 않습니다.' 
        })
    }
});


//Look up comments list  
router.get("/comments/:_postId", async (req, res)=> {
    const {_postId} = req.params;
    const comments = await Comment.find({_postId:_postId}).select({_id:1, user:1, content:1, createdAt:1});
    return res.status(200).json({data:comments});
 })



//adapt comments
router.put("/comments/:_commentId", async (req,res) =>{
    
    try{
        const {_commentId} = req.params;
        const {password, content} =req.body;
        const checkedId = await Comment.find({_id: _commentId});
        
        if(!checkedId.length){
            return res.status(404).json({
                message: '댓글 조회에 실패 하였습니다.'
            })
        }
        if(!content){
            return res.status(400).json({
                message: "댓글을 입력하여 주세요."
            })
        }
        else {
            await Comment.updateOne(
                {password: password, _id:_commentId},
                {$set: {content: content}}
            )
            return res.status(200).json({
                message: "댓글을 수정하였습니다."
            })
        }
    } 
    catch (error) {
        return res.status(400).json({
            message: '데이터 형식이 올바르지 않습니다.'
        })
    }
});



//delete comments 

router.delete("/comments/:_commentId", async (req,res)=> {
    
    try{
        const { _commentId } = req.params;
        const { password } = req.body;
        const checkedId = await Comment.findOne({ _id : _commentId })
        
        if (!checkedId.password!==password){
            return res.status(404).json({
                Message : "댓글 조회에 실패하였습니다."
            });
        }
        else if(checkedId.password === password){
            await Comment.deleteOne({_id: _commentId})
            return res.status(200).json({
                message: "댓글을 삭제하였습니다."
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










